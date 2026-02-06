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
      google: {
        id: String,
      },
      facebook: {
        id: String,
      },
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

userSchema.index({ "providers.google.id": 1 }, { sparse: true });
userSchema.index({ "providers.facebook.id": 1 }, { sparse: true });

export default mongoose.model("User", userSchema);
