import { Cart } from "../models/cart.model.js";

const addToCart = async (req, res) => {
  try {
    const { cartProduct, quantity } = req.body;

    const qty = Number(quantity);
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            cartProduct,
            quantity,
          },
        ],
      });
    } else {
      let itemIdex = cart.items.findIndex(
        (i) => i.cartProduct.toString() === cartProduct,
      );

      if (itemIdex > -1) {
        cart.items[itemIdex].quantity += qty;
      } else {
        cart.items.push({ cartProduct, quantity: qty });
      }
    }

    await cart.save();

    // const updatedCart = await Cart.findById(cart._id).populate({path:"items.cartProduct" , model:"Product"})

    const updatedCart = await Cart.findById(cart._id).populate(
      "items.cartProduct",
      "name  price",
    );

    res.json({
      message: "product added to cart successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error(error);
  }
};

const incrementQty = async (req, res) => {
  try {
    const { id } = req.params;


    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let item = cart.items.find((i) => i._id.toString() === id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (item) {
      item.quantity += 1;
    }

    await cart.save();

    res.json({
      message: "Quantity increased",
      qty: item.quantity,
    });
  } catch (error) {
    console.error(error);
  }
};


const decrementQty = async (req, res) => {
  try {
    const { id } = req.params;


    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let item = cart.items.find((i) => i._id.toString() === id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (item.quantity <= 1) {
      cart.items = cart.items.filter((i) => i._id.toString() !== id);
    }else{
            item.quantity -= 1;

    }

    await cart.save();

    res.json({
      message: "Quantity decreased",
      qty: item.quantity,
    });
  } catch (error) {
    console.error(error);
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate(
      "items.cartProduct",
      "name price img",
    );

    res.json({ message: "cart fetch successfully", cart });
  } catch (error) {
    console.error(error);
  }
};
export { addToCart, getCart, incrementQty, decrementQty };
