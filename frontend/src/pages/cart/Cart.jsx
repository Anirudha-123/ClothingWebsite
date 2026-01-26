import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/ProductSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto lg:px-10  bg-gray-50 pt-20">
      {cart.length > 0 ? (
        <h3 className="font-bold p-2 text-sm lg:text-xl">CART</h3>
      ) : (
        <h3 className="font-bold p-2 text-sm lg:text-xl">
          CART IS EPMTY
          <Link to={"/"} className="nav-link ms-2 text-blue-400">
            Shop Now
          </Link>
        </h3>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  pb-20 ">
        <div className="left mb-3 ">
          {cart.map((i) => (
            <>
              <div className="border mb-3 border-gray-200 rounded-lg p-3 md:p-4 bg-white ">
                <div className="flex gap-3 md:gap-4 mb-3 ">
                  <img
                    src={i.img}
                    alt={i.name}
                    className="w-28 h-36 md:w-40 md:h-44 object-cover rounded-md"
                  />

                  <div className="flex flex-col w-full">
                    <p className="text-sm md:text-base font-semibold text-gray-900 leading-snug">
                      {i.name}
                    </p>

                    <p className="text-sm md:text-base font-bold text-gray-800 mt-1">
                      ₹ {i.price}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-4">
                      <p className="text-xs md:text-sm text-gray-600 font-medium">
                        Size: <span className="text-gray-900">M</span>
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm text-gray-600 font-medium">
                          Qty
                        </span>

                        <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                          −
                        </button>

                        <span className="text-sm font-semibold">4</span>

                        <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className="right">
          {cart.length > 0 && (
            <div className="order-summary bg-gray-100 p-3 ">
              <div className="space-y-2 bg-white p-4">
                <h3 className="font-bold pb-4">Order Summary</h3>

                <div className="flex justify-between items-center w-full">
                  <p className="font-semibold text-black">sub total</p>
                  <p> ₹ {cart.reduce((sum, item) => sum + item.price, 0)}</p>
                </div>

                <div className="flex justify-between items-center w-full">
                  <p className="font-semibold">Discount</p>
                  <p>10 %</p>
                </div>
                <hr />
                <div className="flex justify-between items-center w-full">
                  <p className="font-bold text-black">Total</p>
                  <p>
                    {" "}
                    ₹ {cart.reduce((sum, item) => sum + item.price, 0) * 0.9}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
