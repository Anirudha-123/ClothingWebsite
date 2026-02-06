import express from "express";
import { addAddress, getAddresses } from "../controllers/address.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
// import { authMiddleware } from "../middleware/auth.middleware.js";



const router = express.Router();

// Add new address
router.post("/", protect, authorize("user"),addAddress);

// Get all saved addresses of logged-in user
router.get("/",  protect, authorize("user"), getAddresses);

export default router;
