import jwt from "jsonwebtoken";



import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    // console.log(token)
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded)


    // req.user = await User.findById(decoded._id).select("-password");
     let user =
      (await User.findById(decoded._id).select("-password"))
      ;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user


    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
