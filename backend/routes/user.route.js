import {Router} from "express"
import { addUser, deleteuser, getAllUsers, singleUser, updateUser, userlogin } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";


const route = Router();

route.post("/", addUser)
route.post("/login", userlogin)
route.get("/singleuser", protect, singleUser)
route.get("/allUsers", getAllUsers)
route.put("/update", protect, updateUser)
route.delete("/delete", protect, deleteuser)


export default route

