// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../../redux/ProductSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { useLoginModal } from "../../context/LoginModal";
// import axios from "axios";

// const Cart = () => {
//   // const cart = useSelector((state) => state.cart.items);
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const { setLoginModalOpen } = useLoginModal();

//   useEffect(() => {
//     console.log("hii");
//   }, []);

//   // useEffect(() => {
//   //   const getCart = async () => {
//   //     const token = localStorage.getItem("token");

//   //     if (!token) {
//   //       setLoginModalOpen(true);
//   //       return;
//   //     }

//   //     try {
//   //       const response = await axios.get("http://localhost:8080/api/cart/get", {
//   //         headers: {
//   //           Authorization: "Bearer " + token,
//   //         },
//   //       });

//   //       console.log("CART FROM BACKEND", response.data);
//   //       setCart(response.data.cart.items);

//   //       // optional (for later UI)
//   //     } catch (error) {
//   //       console.error(error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   getCart();
//   // }, []);

// //   useEffect(() => {
// //   const getCart = async () => {
// //     const token = localStorage.getItem("token");
// //     const guestId = localStorage.getItem("guestId");

// //     const res = await axios.get("http://localhost:8080/api/cart/get", {
// //       params: { guestId },
// //       headers: token
// //         ? { Authorization: "Bearer " + token }
// //         : {},
// //     });

// //     setCart(res.data.cart.items);
// //     setLoading(false);
// //   };

// //   getCart();
// // }, []);

// useEffect(() => {
//   const getCart = async () => {
//     const token = localStorage.getItem("token");
//     const guestId = localStorage.getItem("guestId");

//     const res = await axios.get("http://localhost:8080/api/cart/get", {
//       params: { guestId },
//       headers: token
//         ? { Authorization: "Bearer " + token }
//         : {},
//     });

//     setCart(res.data?.cart?.items || []);
//     setLoading(false);
//   };

//   getCart();
// }, [navigate]);



//   if (loading) {
//     return <h3>Loading...</h3>;
//   }

//   const handleCheckout = () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     // user not logged in → open login modal
//     setLoginModalOpen(true);
//     return;
//   }

//   // user logged in → go to checkout
//   navigate("/checkout1");
// };


//   return (
//     <div className="container mx-auto lg:px-10  bg-gray-50 pt-20">
//       {cart.length > 0 ? (
//         <h3 className="font-bold p-2 text-sm lg:text-xl">CART</h3>
//       ) : (
//         <h3 className="font-bold p-2 text-sm lg:text-xl">
//           CART IS EPMTY
//           <Link to={"/"} className="nav-link ms-2 text-blue-400">
//             Shop Now
//           </Link>
//         </h3>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  pb-20 ">
//         <div className="left mb-3 ">
//           {cart.map((i) => (
//             <>
//               <div className="border mb-3 border-gray-200 rounded-lg p-3 md:p-4 bg-white ">
//                 <div className="flex gap-3 md:gap-4 mb-3 ">
//                   <img
//                     src={i?.cartProduct?.img}
//                     alt={i.name}
//                     className="w-28 h-36 md:w-40 md:h-44 object-cover rounded-md"
//                   />

//                   <div className="flex flex-col w-full">
//                     <p className="text-sm md:text-base font-semibold text-gray-900 leading-snug">
//                       {i?.cartProduct?.name}
//                     </p>

//                     <p className="text-sm md:text-base font-bold text-gray-800 mt-1">
//                       ₹ {i?.cartProduct?.price}
//                     </p>

//                     <div className="flex justify-between items-center mt-auto pt-4">
//                       <p className="text-xs md:text-sm text-gray-600 font-medium">
//                         Size: <span className="text-gray-900">M</span>
//                       </p>

//                       <div className="flex items-center gap-2">
//                         <span className="text-xs md:text-sm text-gray-600 font-medium">
//                           Qty
//                         </span>

//                         <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
//                           −
//                         </button>

//                         <span className="text-sm font-semibold">4</span>

//                         <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ))}
//         </div>

//         <div className="right">
//           {cart.length > 0 && (
//             <div className="order-summary bg-gray-100 p-3 ">
//               <div className="space-y-2 bg-white p-4">
//                 <h3 className="font-bold pb-4">Order Summary</h3>

//                 <div className="flex justify-between items-center w-full">
//                   <p className="font-semibold text-black">sub total</p>
//                   <p> ₹ {cart.reduce((sum, item) => sum + item.price, 0)}</p>
//                 </div>

//                 <div className="flex justify-between items-center w-full">
//                   <p className="font-semibold">Discount</p>
//                   <p>10 %</p>
//                 </div>
//                 <hr />
//                 <div className="flex justify-between items-center w-full">
//                   <p className="font-bold text-black">Total</p>
//                   <p>
//                     {" "}
//                     ₹ {cart.reduce((sum, item) => sum + item.price, 0) * 0.9}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <button
//   onClick={handleCheckout}
//   className="w-full bg-black text-white py-2 mt-4"
// >
//   Proceed to Checkout
// </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;






import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginModal } from "../../context/LoginModal";

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
        const res = await axios.get("https://clothingwebsitebackend.onrender.com/api/cart/get", {
          params: { guestId },
          headers: token
            ? { Authorization: "Bearer " + token }
            : {},
        });

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
    return <h3 className="p-6 text-center">Loading...</h3>;
  }

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginModalOpen(true);
      return;
    }
    navigate("/checkout1");
  };

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) return;

    const token = localStorage.getItem("token");
    const guestId = localStorage.getItem("guestId");

    try {
      // Update quantity in backend
      await axios.put(
        "https://clothingwebsitebackend.onrender.com/api/cart/update",
        { itemId, quantity: newQty, guestId },
        { headers: token ? { Authorization: "Bearer " + token } : {} }
      );

      // Update state locally
      setCart((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate subtotal
  const subTotal = cart.reduce(
    (sum, item) => sum + item.cartProduct.price * item.quantity,
    0
  );

  const discountPercent = 10; // Example
  const total = subTotal - (subTotal * discountPercent) / 100;

  return (
    <div className="container mx-auto lg:px-10 bg-gray-50 pt-20 pb-20">
      {cart.length > 0 ? (
        <h3 className="font-bold p-2 text-sm lg:text-xl">CART</h3>
      ) : (
        <h3 className="font-bold p-2 text-sm lg:text-xl">
          CART IS EMPTY
          <Link to={"/"} className="ml-2 text-blue-400">
            Shop Now
          </Link>
        </h3>
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

                  {/* Quantity */}
                  <div className="flex justify-between items-center mt-auto pt-4">
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                      Size: <span className="text-gray-900">{i.size || "M"}</span>
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm text-gray-600 font-medium">
                        Qty
                      </span>

                      <button
                        onClick={() =>
                          handleQuantityChange(i._id, i.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                      >
                        −
                      </button>

                      <span className="text-sm font-semibold">{i.quantity}</span>

                      <button
                        onClick={() =>
                          handleQuantityChange(i._id, i.quantity + 1)
                        }
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
                  <span>Discount ({discountPercent}%)</span>
                  <span>₹{((subTotal * discountPercent) / 100).toFixed(2)}</span>
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


