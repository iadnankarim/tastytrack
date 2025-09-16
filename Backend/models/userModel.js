import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },

  email: {
    type: String,
    required: true,
    unique: true,

  },

  password: {
    type: String,
    required: true
  },

  cartData: {
    type: Object,
    default: {} // yaha key-value pairs store honge, e.g. { "foodId1": 2, "foodId2": 1 }
  }
}, { timestamps: true, minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
