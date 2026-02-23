// import { Cart } from "../models/cart.model.js";

// const addToCart = async (req, res) => {
//   try {
//     const { cartProduct, quantity } = req.body;

//     const qty = Number(quantity);
//     const userId = req.user._id;

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = await Cart.create({
//         userId,
//         items: [
//           {
//             cartProduct,
//             quantity,
//           },
//         ],
//       });
//     } else {
//       // let itemIdex = cart.items.findIndex(
//       //   (i) => i.cartProduct.toString() === cartProduct.toString(),
//       // );
//       let itemIdex = cart.items.findIndex(
//   (i) =>
//     i.cartProduct &&
//     i.cartProduct.toString() === cartProduct.toString()
// );


//       if (itemIdex > -1) {
//         cart.items[itemIdex].quantity += qty;
//       } else {
//         cart.items.push({ cartProduct, quantity: qty });
//       }
//     }

//     await cart.save();

//     // const updatedCart = await Cart.findById(cart._id).populate({path:"items.cartProduct" , model:"Product"})

//     const updatedCart = await Cart.findById(cart._id).populate(
//       "items.cartProduct",
//       "name  price",
//     );

//     res.json({
//       message: "product added to cart successfully",
//       cart: updatedCart,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };



import { Cart } from "../models/cart.model.js";

const addToCart = async (req, res) => {
  try {
    const { cartProduct, quantity = 1, guestId } = req.body;

    const userId = req.user?._id || null;

    const query = userId ? { userId } : { guestId };

    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = await Cart.create({
        userId,
        guestId,
        items: [{ cartProduct, quantity }],
      });
    } else {
      const index = cart.items.findIndex(
        (i) => i.cartProduct.toString() === cartProduct
      );

      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ cartProduct, quantity });
      }
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate(
      "items.cartProduct",
      "name price img"
    );

    res.json({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const incrementQty = async (req, res) => {
  try {
    const { id } = req.params;
    const guestId = req.query.guestId;
    const userId = req.user?._id || null;

    const query = userId ? { userId } : { guestId };

    const cart = await Cart.findOne(query);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i._id.toString() === id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity += 1;

    await cart.save();

    res.json({
      message: "Quantity increased",
      qty: item.quantity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// const incrementQty = async (req, res) => {
//   try {
//     const { id } = req.params;


//     const userId = req.user._id;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     let item = cart.items.find((i) => i._id.toString() === id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     if (item) {
//       item.quantity += 1;
//     }

//     await cart.save();

//     res.json({
//       message: "Quantity increased",
//       qty: item.quantity,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };


// const decrementQty = async (req, res) => {
//   try {
//     const { id } = req.params;


//     const userId = req.user._id;

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     let item = cart.items.find((i) => i._id.toString() === id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     if (item.quantity <= 1) {
//       cart.items = cart.items.filter((i) => i._id.toString() !== id);
//     }else{
//             item.quantity -= 1;

//     }

//     await cart.save();

//     res.json({
//       message: "Quantity decreased",
//       qty: item.quantity,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };


// const decrementQty = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const guestId = req.query.guestId;
//     const userId = req.user?._id || null;

//     const query = userId ? { userId } : { guestId };

//     const cart = await Cart.findOne(query);

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const item = cart.items.find((i) => i._id.toString() === id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     if (item.quantity <= 1) {
//       cart.items = cart.items.filter(
//         (i) => i._id.toString() !== id
//       );
//     } else {
//       item.quantity -= 1;
//     }

//     await cart.save();

//     res.json({
//       message: "Quantity decreased",
//       qty: item.quantity > 0 ? item.quantity : 0,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

const decrementQty = async (req, res) => {
  try {
    const { id } = req.params;
    const guestId = req.query.guestId;
    const userId = req.user?._id || null;

    const query = userId ? { userId } : { guestId };

    const cart = await Cart.findOne(query);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.items.findIndex(
      (i) => i._id.toString() === id
    );

    if (index === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (cart.items[index].quantity <= 1) {
      cart.items.splice(index, 1); // remove item properly
    } else {
      cart.items[index].quantity -= 1;
    }

    await cart.save();

    const updatedCart = await Cart.findOne(query).populate(
      "items.cartProduct",
      "name price img"
    );

    res.json({
      message: "Cart updated",
      cart: updatedCart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// const getCart = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const cart = await Cart.findOne({ userId }).populate(
//       "items.cartProduct",
//       "name price img",
//     );

//     res.json({ message: "cart fetch successfully", cart });
//   } catch (error) {
//     console.error(error);
//   }
// };

const getCart = async (req, res) => {
  try {
    const guestId = req.query.guestId;
    const userId = req.user?._id || null;

    const query = userId ? { userId } : { guestId };

    const cart = await Cart.findOne(query).populate(
      "items.cartProduct",
      "name price img"
    );

    res.json({ cart: cart || { items: [] } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addToCart, getCart, incrementQty, decrementQty };
