import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);
    const song = new Song({
      title,
      artist,
      albumId: albumId || null,
      duration,
      audioUrl,
      imageUrl,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: {
          songs: song._id,
        },
      });
    }

    return res.status(201).json(song);
  } catch (error) {
    console.log("i am from here getting some error from here and stuff")
    console.error("Error:", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    console.log("Trying to delete a song from here: ");
    const { id } = req.params;
    const song = await Song.findById(id);
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: {
          songs: song._id,
        },
      });
    }

    await Song.findByIdAndDelete(id);
    console.log("Song is deleted Succesfully");
    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {

    console.error("Error on deleting the song: ", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);
    if(!imageUrl){
      imageUrl = "https://placehold.co/600x400";
    }
    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });

    await album.save();

    return res.status(201).json(album);
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    return res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error("Error on deleting the album: ", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  console.log("checking whether it is reaching here or not");
  return res.status(200).json({ message: "Admin Checked", admin: true });
};
