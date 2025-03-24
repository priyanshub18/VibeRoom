import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import User from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    // const totalSongs = await Song.countDocuments();
    // const totalUsers = await User.countDocuments();
    // const totalAlbums = await Album.countDocuments();

    // NOTE:: Better way to do this can be using the promise all thingy

    // BUG: IF this thing doenst work replace it with the otherwise
    // const [totalSongs, totalUsers, totalAlbums, totalArtists] = await Promise.all([
    //   Song.countDocuments(),
    //   User.countDocuments(),
    //   Album.countDocuments(),
    //   Song.aggregate([
    //     {
    //       $unionWith: {
    //         coll: "artists",
    //         pipeline: [],
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: "$artist",
    //       },
    //     },
    //     {
    //       $count: "count",
    //     },
    //   ]),
    // ]);

    // res.status(200).json({ totalSongs, totalUsers, totalAlbums });

    const [totalSongs, totalUsers, totalAlbums, totalArtistsData] = await Promise.all([
      Song.countDocuments(),
      User.countDocuments(),
      Album.countDocuments(),
      Song.aggregate([
        {
          $group: {
            _id: "$artist", // Group by artist name
          },
        },
        {
          $count: "count", // Count unique artists
        },
      ]),
    ]);

    // Extract count from aggregation result
    const totalArtists = totalArtistsData.length > 0 ? totalArtistsData[0].count : 0;

    res.status(200).json({ totalSongs, totalUsers, totalAlbums, totalArtists });
  } catch (err) {
    next(err);
  }
};
