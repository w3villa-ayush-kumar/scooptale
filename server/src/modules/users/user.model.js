import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationTokenExpiry: {
      type: Date,
    },

    passwordHash: {
      type: String,
      select: false,
    },

    providers: {
      type: [String],
      default: [],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profileImageUrl: String,

    address: String,

    location: {
      lat: Number,
      lng: Number,
    },

    currentPlam: {
      type: String,
      default: "Free",
    },

    planStartTime: Date,

    planEndTime: Date,

    isPlanActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
