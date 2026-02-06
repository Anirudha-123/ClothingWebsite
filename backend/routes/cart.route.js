// import express from 'express'
// import { addToCart, decrementQty, getCart, incrementQty } from '../controllers/cart.controller.js'
// import { protect } from '../middleware/authMiddleware.js'
// import { authorize } from '../middleware/roleMiddleware.js'


// const route = express.Router()



// route.post("/", protect, authorize("user"),addToCart)
// route.get("/get", protect, authorize("user"),getCart)
// route.post("/increment/:id", protect, authorize("user"),incrementQty)
// route.post("/decrement/:id", protect, authorize("user"),decrementQty)


// export default route


import express from "express";
import {
  addToCart,
  getCart,
  incrementQty,
  decrementQty,
} from "../controllers/cart.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/",  addToCart);
route.get("/get", getCart);
route.post("/increment/:id",  incrementQty);
route.post("/decrement/:id", decrementQty);

export default route;
