import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckoutSkeleton from "../skelton/CheckoutSkeleton";



const Checkout1 = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const guestId = localStorage.getItem("guestId");
  const [loading, setLoading] = useState(true);


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
    try {
      const res = await axios.get("https://clothingwebsitebackend.onrender.com/api/cart/get", {
        headers: { Authorization: token ? "Bearer " + token : "" },
        params: { guestId },
      });

      const items = res.data.cart?.items || [];
      const total = items.reduce(
        (sum, item) => sum + item.cartProduct.price * item.quantity,
        0
      );

      setSubTotal(total);
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []);


  /* ---------------- FETCH ADDRESSES ---------------- */
  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await axios.get("https://clothingwebsitebackend.onrender.com/api/address", {
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
      "https://clothingwebsitebackend.onrender.com/api/address",
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
      "https://clothingwebsitebackend.onrender.com/api/order/place",
      {
        shippingAddress: selectedAddress,
        paymentMethod: "COD",
        guestId,
      },
      { headers: { Authorization: "Bearer " + token } },
    );

    localStorage.removeItem("guestId");

    navigate("/orderSuccess");
  };


  if (loading) {
  return <CheckoutSkeleton />;
}


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
