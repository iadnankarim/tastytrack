import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// -------- LOGIN --------
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    // user ka password hata ke bhejna
    const { password: _, ...userData } = user.toObject();

    res.json({ success: true, token, user: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in login" });
  }
};

// -------- REGISTER --------
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      // cartData: {}, // default empty
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    // // password exclude karke bhejna
    // const { password: _, ...userData } = user.toObject();

    // // cartData ensure karo response me
    // if (!userData.cartData) {
    //   userData.cartData = {};
    // }

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in registration" });
  }
};

export { loginUser, registerUser };
