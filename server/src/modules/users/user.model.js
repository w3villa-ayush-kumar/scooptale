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

    emailVerificationToken: String,

    emailVerificationTokenExpiry: Date,

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
      type: {
        lat: Number,
        lng: Number,
      },
      default: null,
    },

    currentPlan: {
      type: String,
      enum: ["free", "silver", "gold"],
      default: "free",
    },

    planActivatedAt: Date,

    planExpiresAt: Date,

    isPlanActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
