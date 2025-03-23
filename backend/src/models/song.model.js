import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
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
    duration: {
      type: Number, // Duration in seconds
      required: true,
    },
    genre: {
      type: String,
      enum: ["Rock", "Pop", "Jazz", "Hip-Hop", "Classical", "Electronic", "Other"],
      default: "Other",
    },
    audioUrl: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      // required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);

export default Song;
