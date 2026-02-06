import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

// export const placeOrder = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { guestId, shippingAddress, paymentMethod } = req.body;

//     const cart = await Cart.findOne({ guestId }).populate(
//       "items.cartProduct",
//       "price"
//     );

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // 🔥 Assign cart to user (NO MERGE)
//     cart.userId = userId;
//     cart.guestId = null;
//     await cart.save();

//     const orderItems = cart.items.map((item) => ({
//       product: item.cartProduct._id,
//       quantity: item.quantity,
//       price: item.cartProduct.price,
//     }));

//     const totalAmount = orderItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const order = await Order.create({
//       userId,
//       items: orderItems,
//       shippingAddress,
//       paymentMethod,
//       totalAmount,
//     });

//     // Clear cart after order
//     await Cart.deleteOne({ _id: cart._id });

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress, paymentMethod, guestId } = req.body;

    // 1️⃣ find cart by userId OR guestId
    let cart = await Cart.findOne({
      $or: [{ userId }, { guestId }],
    }).populate("items.cartProduct", "price");

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ attach cart to logged-in user
    cart.userId = userId;
    cart.guestId = null;
    await cart.save();

    // 3️⃣ prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.cartProduct._id,
      quantity: item.quantity,
      price: item.cartProduct.price,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 4️⃣ create order
    const order = await Order.create({
      userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    // 5️⃣ clear cart
    await Cart.deleteOne({ _id: cart._id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// export const placeOrder = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { shippingAddress, paymentMethod } = req.body;

//     const cart = await Cart.findOne({ userId }).populate(
//       "items.cartProduct",
//       "price"
//     );

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const orderItems = cart.items.map((item) => ({
//       product: item.cartProduct._id,
//       quantity: item.quantity,
//       price: item.cartProduct.price,
//     }));

//     const totalAmount = orderItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const order = await Order.create({
//       userId,
//       items: orderItems,
//       shippingAddress,
//       paymentMethod,
//       totalAmount,
//     });

//     // Clear cart
//     await Cart.deleteOne({ _id: cart._id });

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

/**
 * GET USER ORDERS
 * /api/order/my-orders
 */
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("items.product", "name price img")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET SINGLE ORDER
 * /api/order/:id
 */
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const order = await Order.findOne({ _id: id, userId })
      .populate("items.product", "name price img");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * DELETE ORDER
 * /api/order/:id
 */
export const deleteOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const order = await Order.findOne({ _id: id, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus !== "Placed") {
      return res
        .status(400)
        .json({ message: "Order cannot be cancelled" });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

