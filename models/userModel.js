import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
