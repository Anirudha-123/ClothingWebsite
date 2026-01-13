import User from "../models/user.js";
// import cookie from "cookie-parser";
import {
  generateAccesToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "all fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "user already registered" });
    }

    const newUser = new User({
      username,
      email,
      password,
      role: role || "user",
    });

    await newUser.save();

    res.json({ message: "register  successfully", user: newUser });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user not found " });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.json({ message: "invalid login details" });
    }

    const accessToken = await generateAccesToken(user);
    const refreshToken = await generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    const loggedInuser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      // .cookie("accessToken", accessToken, options)
      // .cookie("refreshToken", refreshToken, options)
      .json({
        message: "login sucessfully",
        user: loggedInuser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);

    res.json({ message: "user delete successfully", user: data });
  } catch (error) {
    console.error(error);
  }
};

const logout = async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    // .clearCookie("accessToken", options)
    // .clearCookie("refreshToken", options)
    .json({ message: "Logout successful" });
};

export { register, login, getAllUsers, deleteUser, logout };
