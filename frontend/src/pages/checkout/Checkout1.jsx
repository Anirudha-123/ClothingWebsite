// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Checkout1 = () => {
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   const placeOrder = async () => {
//     const token = localStorage.getItem("token");
//     const guestId = localStorage.getItem("guestId");

//     if (!token) {
//       navigate("/login?redirect=checkout");
//       return;
//     }

//     // await axios.post(
//     //   "http://localhost:8080/api/order/place",
//     //   {
//     //     guestId,
//     //     shippingAddress: address,
//     //     paymentMethod: "COD",
//     //   },
//     //   {
//     //     headers: {
//     //       Authorization: "Bearer " + token,
//     //     },
//     //   },
//     // );

//     // localStorage.removeItem("guestId");
//     // navigate("/order-success");
//   await axios.post(
//   "http://localhost:8080/api/order/place",
//   {
//     guestId,
//     shippingAddress: address,
//     paymentMethod: "COD",
//   },
//   {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   }
// );

// // 🔥 FULL RESET (important)
// localStorage.removeItem("guestId");
// localStorage.removeItem("cart");

// navigate("/orderSuccess", { replace: true });

//   };

//   return (
//     <div className="container mx-auto pt-20 max-w-xl">
//       <h2 className="text-xl font-bold mb-4">Checkout</h2>

//       {Object.keys(address).map((field) => (
//         <input
//           key={field}
//           name={field}
//           placeholder={field}
//           onChange={handleChange}
//           className="w-full border p-2 mb-2"
//         />
//       ))}

//       <button
//         onClick={placeOrder}
//         className="w-full bg-black text-white py-2 mt-3"
//       >
//         PLACE ORDER
//       </button>
//     </div>
//   );
// };

// export default Checkout1;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Checkout1 = () => {
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//   });

//   const [subTotal, setSubTotal] = useState(0);

//   const deliveryCharge = 100;
//   const totalAmount = subTotal + deliveryCharge;

//   /* ---------------- FETCH CART (USER CART) ---------------- */
//   useEffect(() => {
//     const fetchCart = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         navigate("/login?redirect=checkout");
//         return;
//       }

//       const res = await axios.get(
//         "http://localhost:8080/api/cart/get",
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );

//       const items = res.data.cart?.items || [];

//       const total = items.reduce(
//         (sum, item) =>
//           sum + item.cartProduct.price * item.quantity,
//         0
//       );

//       setSubTotal(total);
//     };

//     fetchCart();
//   }, [navigate]);

//   /* ---------------- ADDRESS ---------------- */
//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   /* ---------------- PLACE ORDER ---------------- */
//   const placeOrder = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login?redirect=checkout");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:8080/api/order/place",
//         {
//           shippingAddress: address,
//           paymentMethod: "COD",
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );

//       // optional cleanup
//       localStorage.removeItem("cart");

//       navigate("/orderSuccess", { replace: true });
//     } catch (error) {
//       alert(
//         error.response?.data?.message || "Order placement failed"
//       );
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* LEFT - ADDRESS FORM */}
//       <div className="md:col-span-2">
//         <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

//         {Object.keys(address).map((field) => (
//           <input
//             key={field}
//             name={field}
//             placeholder={field}
//             value={address[field]}
//             onChange={handleChange}
//             className="w-full border p-2 mb-2"
//           />
//         ))}
//       </div>

//       {/* RIGHT - ORDER SUMMARY */}
//       <div className="border p-4 h-fit">
//         <h2 className="text-lg font-bold mb-3">Order Summary</h2>

//         <div className="flex justify-between mb-2">
//           <span>Subtotal</span>
//           <span>₹{subTotal}</span>
//         </div>

//         <div className="flex justify-between mb-2">
//           <span>Delivery</span>
//           <span>₹{deliveryCharge}</span>
//         </div>

//         <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
//           <span>Total</span>
//           <span>₹{totalAmount}</span>
//         </div>

//         <button
//           onClick={placeOrder}
//           className="w-full bg-black text-white py-2 mt-4"
//           disabled={subTotal === 0}
//         >
//           PLACE ORDER (COD)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout1;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Checkout1 = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const [newAddress, setNewAddress] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//   });

//   const [subTotal, setSubTotal] = useState(0);

//   const deliveryCharge = 100;
//   const totalAmount = subTotal + deliveryCharge;

//   /* ---------------- AUTH CHECK ---------------- */
//   useEffect(() => {
//     if (!token) {
//       navigate("/login?redirect=checkout");
//     }
//   }, [token, navigate]);

//   /* ---------------- FETCH CART ---------------- */
//   useEffect(() => {
//     const fetchCart = async () => {
//       const guestId = localStorage.getItem("guestId");

//       const res = await axios.get(
//         "http://localhost:8080/api/cart/get",
//         {
//           headers: {
//             Authorization: token ? "Bearer " + token : "",
//           },
//           params: { guestId },
//         }
//       );

//       const items = res.data.cart?.items || [];

//       const total = items.reduce(
//         (sum, item) =>
//           sum + item.cartProduct.price * item.quantity,
//         0
//       );

//       setSubTotal(total);
//     };

//     fetchCart();
//   }, [token]);

//   /* ---------------- FETCH ADDRESSES ---------------- */
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       const res = await axios.get(
//         "http://localhost:8080/api/address",
//         {
//           headers: { Authorization: "Bearer " + token },
//         }
//       );

//       // ✅ backend returns array directly
//       const list = res.data;

//       setAddresses(list);

//       if (list.length > 0) {
//         setSelectedAddress(list[0]); // frontend default
//       }
//     };

//     fetchAddresses();
//   }, [token]);

//   /* ---------------- ADDRESS FORM ---------------- */
//   const handleChange = (e) => {
//     setNewAddress({
//       ...newAddress,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const saveNewAddress = async () => {
//     const res = await axios.post(
//       "http://localhost:8080/api/address",
//       newAddress,
//       {
//         headers: { Authorization: "Bearer " + token },
//       }
//     );

//     // ✅ backend returns address object directly
//     const saved = res.data;

//     setAddresses([saved, ...addresses]);
//     setSelectedAddress(saved);
//     setShowForm(false);
//   };

//   /* ---------------- PLACE ORDER ---------------- */
//   const placeOrder = async () => {
//     if (!selectedAddress) {
//       alert("Please select an address");
//       return;
//     }

//     await axios.post(
//       "http://localhost:8080/api/order/place",
//       {
//         shippingAddress: selectedAddress,
//         paymentMethod: "COD",
//       },
//       {
//         headers: { Authorization: "Bearer " + token },
//       }
//     );

//     navigate("/orderSuccess", { replace: true });
//   };

//   return (
//     <div className="max-w-5xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* LEFT */}
//       <div className="md:col-span-2">
//         <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

//         {/* SELECTED ADDRESS */}
//         {selectedAddress && !showForm && (
//           <div className="border p-4 mb-4">
//             <p className="font-semibold">{selectedAddress.fullName}</p>
//             <p>{selectedAddress.address}</p>
//             <p>
//               {selectedAddress.city}, {selectedAddress.state} -{" "}
//               {selectedAddress.pincode}
//             </p>
//             <p>Phone: {selectedAddress.phone}</p>
//           </div>
//         )}

//         {/* ADDRESS LIST */}
//         {!showForm &&
//           addresses
//             .filter((a) => a._id !== selectedAddress?._id)
//             .map((addr) => (
//               <div
//                 key={addr._id}
//                 onClick={() => setSelectedAddress(addr)}
//                 className="border p-3 mb-2 cursor-pointer hover:border-black"
//               >
//                 <p className="font-medium">{addr.fullName}</p>
//                 <p className="text-sm">{addr.address}</p>
//               </div>
//             ))}

//         {/* ADD NEW */}
//         {!showForm && (
//           <button
//             onClick={() => setShowForm(true)}
//             className="mt-3 text-blue-600"
//           >
//             + Add New Address
//           </button>
//         )}

//         {/* NEW ADDRESS FORM */}
//         {showForm && (
//           <div className="border p-4">
//             {Object.keys(newAddress).map((field) => (
//               <input
//                 key={field}
//                 name={field}
//                 placeholder={field}
//                 onChange={handleChange}
//                 className="w-full border p-2 mb-2"
//               />
//             ))}

//             <div className="flex gap-3">
//               <button
//                 onClick={saveNewAddress}
//                 className="bg-black text-white px-4 py-2"
//               >
//                 Save Address
//               </button>

//               <button
//                 onClick={() => setShowForm(false)}
//                 className="border px-4 py-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* RIGHT */}
//       <div className="border p-4 h-fit">
//         <h2 className="text-lg font-bold mb-3">Order Summary</h2>

//         <div className="flex justify-between mb-2">
//           <span>Subtotal</span>
//           <span>₹{subTotal}</span>
//         </div>

//         <div className="flex justify-between mb-2">
//           <span>Delivery</span>
//           <span>₹{deliveryCharge}</span>
//         </div>

//         <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
//           <span>Total</span>
//           <span>₹{totalAmount}</span>
//         </div>

//         <button
//           onClick={placeOrder}
//           className="w-full bg-black text-white py-2 mt-4"
//           disabled={subTotal === 0}
//         >
//           PLACE ORDER (COD)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout1;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout1 = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const guestId = localStorage.getItem("guestId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [subTotal, setSubTotal] = useState(0);
  const deliveryCharge = 100;
  const totalAmount = subTotal + deliveryCharge;

  /* ---------------- FETCH CART ---------------- */
  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get("http://localhost:8080/api/cart/get", {
        headers: { Authorization: token ? "Bearer " + token : "" },
        params: { guestId },
      });

      const items = res.data.cart?.items || [];
      const total = items.reduce(
        (sum, item) => sum + item.cartProduct.price * item.quantity,
        0,
      );

      setSubTotal(total);
    };

    fetchCart();
  }, []);

  /* ---------------- FETCH ADDRESSES ---------------- */
  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await axios.get("http://localhost:8080/api/address", {
        headers: { Authorization: "Bearer " + token },
      });

      setAddresses(res.data || []);
      if (res.data?.length) setSelectedAddressId(res.data[0]._id);
    };

    fetchAddresses();
  }, [token]);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const saveNewAddress = async () => {
    const res = await axios.post(
      "http://localhost:8080/api/address",
      newAddress,
      { headers: { Authorization: "Bearer " + token } },
    );

    setAddresses([res.data, ...addresses]);
    setSelectedAddressId(res.data._id);
    setShowForm(false);
  };

  const placeOrder = async () => {
    const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

    if (!selectedAddress) return alert("Select address");

    await axios.post(
      "http://localhost:8080/api/order/place",
      {
        shippingAddress: selectedAddress,
        paymentMethod: "COD",
        guestId
      },
      { headers: { Authorization: "Bearer " + token } },
    );

    navigate("/orderSuccess");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-12 pt-25">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Shipping Address
          </h2>

          {/* ADDRESS LIST */}
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label
                key={addr._id}
                className={`flex gap-3 p-4 border rounded-lg cursor-pointer transition ${
                  selectedAddressId === addr._id
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  className="mt-1 accent-black"
                  checked={selectedAddressId === addr._id}
                  onChange={() => setSelectedAddressId(addr._id)}
                />

                <div className="text-sm sm:text-base">
                  <p className="font-medium">{addr.fullName}</p>
                  <p className="text-gray-600">{addr.address}</p>
                  <p className="text-gray-600">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-gray-600">📞 {addr.phone}</p>
                </div>
              </label>
            ))}
          </div>

          {/* ADD NEW ADDRESS */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              + Add New Address
            </button>
          )}

          {/* NEW ADDRESS FORM */}
          {showForm && (
            <div className="mt-4 border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(newAddress).map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
                />
              ))}

              <div className="sm:col-span-2 flex gap-3 mt-2">
                <button
                  onClick={saveNewAddress}
                  className="bg-black text-white px-5 py-2 rounded hover:opacity-90"
                >
                  Save Address
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="border px-5 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 h-fit sticky top-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{subTotal}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Delivery</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={subTotal === 0}
            className="w-full mt-5 bg-black text-white py-3 rounded text-sm sm:text-base hover:opacity-90 disabled:opacity-40"
          >
            PLACE ORDER (COD)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout1;
