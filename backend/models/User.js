import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    passwordHash: String,
    isVerified: { type: Boolean, default: false },
    otp: String,
    otpExpiresAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
