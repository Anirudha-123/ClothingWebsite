// import express from "express";
// import { placeOrder } from "../controllers/order.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// router.post("/place", protect, authorize("user"), placeOrder);

// export default router;


import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  deleteOrder,
} from "../controllers/order.controller.js";
// import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/place", protect, authorize("user"), placeOrder);
router.get("/my-orders", protect, authorize("user"), getMyOrders);
router.get("/:id",  protect, authorize("user"), getOrderById);
router.delete("/:id", protect, authorize("user"), deleteOrder);

export default router;

