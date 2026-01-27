import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: function () {
      return this.authProvider === "local";
    }
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },
  googleId: {
    type: String
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },
  refreshToken: {
  type: String
},
isPro: {
  type: Boolean,
  default: false,
},

stripeCustomerId: {
  type: String,
},

stripeSubscriptionId: {
  type: String,
},

subscriptionStatus: {
  type: String,
  enum: ["active", "inactive", "cancelled"],
  default: "inactive",
}



}, {timestamps: true});


export const User = mongoose.model("User", userSchema);