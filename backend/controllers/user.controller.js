import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const addUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      res.status(401).json({
        message: " all fileds are require",
      });
    }

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      res.status(404).json({
        message: " user already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      role,
    });

    const user = await User.findById(newUser._id).select("-password ");
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    res.status(201).json({
      token,
      data: user,
      message: "  User Added sucessfully",
    });
  } catch (error) {
    console.error(error);
  }
};

const userlogin = async (req, res) => {
  const { email, password } = req.body;

   console.log("REQ BODY:", req.body);
console.log("PASSWORD TYPE:", typeof password);

  if (!email || !password) {
   return res.status(401).json({
      message: "all fileds are required",
    });
  }

  // const user = await User.findOne({email: email});

  //patient (user)

  let user = await User.findOne({ email });


 


 

  if (!user) {
   return res.status(404).json({
      message: " this email  is not ragister",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(404).json({
      message: "password is not vailed",
    });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

 return res.status(201).json({
    token: token,
    user,
    message: " User login sucessfull",
  });
};

const singleUser = async (req, res) => {
  const user = req.user;
  console.log(req.user);
  res.status(200).json({
    sengleUser: user,
    message: " Get single user sucessfull",
  });
};

const updateUser = async (req, res) => {
  try {
    // const user =  req.body

    const update = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );

    if (!update) {
      res.status(404).json({
        message: " user not update ",
      });
    }

    res.status(200).json({
      message: "  user update  sucessfull",
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteuser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      message: "  user delete  successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();

    res.status(201).json({ message: "all users fetched", users: data });
  } catch (error) {
    console.error(error);
  }
};

export { addUser, userlogin, singleUser, updateUser, deleteuser, getAllUsers };
