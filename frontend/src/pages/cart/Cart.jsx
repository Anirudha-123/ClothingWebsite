import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginModal } from "../../context/LoginModal";
import CartSkeleton from "../skelton/CartSkeleton";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setLoginModalOpen } = useLoginModal();

  // Fetch cart from backend
  useEffect(() => {
    const getCart = async () => {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      try {
        const res = await axios.get(
          "http://localhost:8080/api/cart/get",
          {
            params: { guestId },
            headers: token ? { Authorization: "Bearer " + token } : {},
          },
        );

        setCart(res.data?.cart?.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, []);

  if (loading) {
    return <CartSkeleton />;
  }

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginModalOpen(true);
      return;
    }
    navigate("/checkout1");
  };

  const token = localStorage.getItem("token");
  const guestId = localStorage.getItem("guestId");

  const authHeader = token ? { Authorization: "Bearer " + token } : {};

  const incrementItem = async (itemId) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/cart/increment/${itemId}`,
        {},
        {
          params: { guestId },
          headers: authHeader,
        },
      );

      setCart((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: res.data.qty } : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const decrementItem = async (itemId, currentQuantity) => {
    if (currentQuantity === 1) {
      try {
        await axios.delete(`http://localhost:8080/api/cart/remove/${itemId}`, {
          params: { guestId },
          headers: authHeader,
        });

        
        setCart((prev) => prev.filter((item) => item._id !== itemId));
      } catch (error) {
        console.error("Error removing item:", error);
      }
      return; 
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/cart/decrement/${itemId}`,
        {},
        {
          params: { guestId },
          headers: authHeader,
        },
      );

      setCart((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: res.data.qty } : item,
        ),
      );
    } catch (error) {
      console.error("Error decrementing item:", error);
    }
  };

  const subTotal = cart.reduce(
    (sum, item) => sum + item.cartProduct.price * item.quantity,
    0,
  );

  const delivery = 100; 
  const total = subTotal + delivery;

  return (
    <div className="container mx-auto lg:px-10 bg-gray-50 pt-20 pb-20">
      {cart.length > 0 ? (
        <h3 className="font-bold p-2 text-sm lg:text-xl">CART</h3>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    
    <div className="bg-gray-100 p-6 rounded-full mb-6 shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h12m-10 0a1 1 0 102 0 1 1 0 00-2 0zm8 0a1 1 0 102 0 1 1 0 00-2 0z"
        />
      </svg>
    </div>

    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Your Cart is Empty
    </h2>

    <p className="text-gray-500 mb-6 max-w-md">
      Looks like you haven't added anything to your cart yet.
      Start shopping to find amazing products!
    </p>

    <button
      onClick={() => navigate("/")}
      className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300"
    >
      Continue Shopping
    </button>

  </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cart Items */}
        <div className="left mb-3">
          {cart.map((i) => (
            <div
              key={i._id}
              className="border mb-3 border-gray-200 rounded-lg p-3 md:p-4 bg-white"
            >
              <div className="flex gap-3 md:gap-4 mb-3">
                <img
                  src={i?.cartProduct?.img}
                  alt={i.cartProduct?.name}
                  className="w-28 h-36 md:w-40 md:h-44 object-cover rounded-md"
                />
                <div className="flex flex-col w-full">
                  <p className="text-sm md:text-base font-semibold text-gray-900 leading-snug">
                    {i?.cartProduct?.name}
                  </p>
                  <p className="text-sm md:text-base font-bold text-gray-800 mt-1">
                    ₹ {i?.cartProduct?.price}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-4">
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                      Size:{" "}
                      <span className="text-gray-900">{i.size || "M"}</span>
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm text-gray-600 font-medium">
                        Qty
                      </span>

                      <button
                        onClick={() => decrementItem(i._id, i.quantity)} // Pass both ID and Quantity here
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                      >
                        −
                      </button>

                      <span className="text-sm font-semibold">
                        {i.quantity}
                      </span>

                      <button
                        onClick={() => incrementItem(i._id)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="right space-y-4">
            <div className="order-summary bg-gray-100 p-3 rounded-lg">
              <div className="space-y-2 bg-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>

                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span>₹{subTotal}</span>
                </div>

                <div className="flex justify-between text-sm mb-2">
                  <span>Delivery </span>
                  <span>
                   {delivery}
                  </span>
                </div>

                <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-2 mt-4 rounded-lg hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
