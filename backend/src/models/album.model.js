import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      enum: ["Rock", "Pop", "Jazz", "Hip-Hop", "Classical", "Electronic", "Other"],
      default: "Other",
    },
    imageUrl: {
      type: String, // URL of the album cover image
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song", // Referencing the Song model
      },
    ],
    releaseYear: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
