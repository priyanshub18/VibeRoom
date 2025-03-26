import { create } from "domain";
import Song from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error on getting all songs: ", error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    //find 6 random items using mongoDB aggregate pipelines
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 6,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          audioUrl: 1,
          imageUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error on getting featured songs: ", error);
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    //find 4 random items using mongoDB aggregate pipelines
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 4,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          audioUrl: 1,
          imageUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error on getting featured songs: ", error);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    //find 6 random items using mongoDB aggregate pipelines
    const songs = await Song.aggregate([
      {
        $sample: {
          size: 8,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          audioUrl: 1,
          imageUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error on getting featured songs: ", error);
    next(error);
  }
};
