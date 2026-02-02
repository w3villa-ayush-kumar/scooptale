import mongoose from "mongoose";

const userMovieSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    tmdbId: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["saved", "watched"],
      default: "saved",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      maxlength: 500,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userMovieSchema.index({ userId: 1, tmdbId: 1 }, { unique: true });
userMovieSchema.index({ tmdbId: 1, isPublic: 1 });

export default mongoose.model("UserMovie", userMovieSchema);
