import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetailsSkeleton from "../skelton/OrderDetailsSkeleton";


const OrderDetails = () => {
  const { id } = useParams(); // order id from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `https://clothingwebsitebackend.onrender.com/api/order/${id}`,
          {
            headers: { Authorization: "Bearer " + token },
          },
        );
        setOrder(res.data.order);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
  return <OrderDetailsSkeleton />;
}


  if (!order) {
    return <div className="p-6 text-center">Order not found</div>;
  }

  // Calculate subtotal
  const subTotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Delivery charge (you can also take it from order if stored in backend)
  const deliveryCharge = order.deliveryCharge || 50; // fixed ₹50 for example
  const totalAmount = subTotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Order Details</h1>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-3xl mx-auto mt-3 space-y-3 p-3">
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 flex items-center gap-4 rounded-lg shadow-sm"
          >
            <img
              src={item.product?.img}
              alt={item.product?.name}
              className="w-24 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.product?.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
              <p className="text-sm text-gray-500">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER STATUS */}
      <div className="bg-white mt-3 p-4 text-center rounded-lg shadow-sm">
        <div className="bg-green-600 text-white py-2 rounded-lg">
          <p className="font-semibold">{order.orderStatus || "Delivered"}</p>
          <p className="text-sm">
            On {new Date(order.createdAt).toDateString()}
          </p>
        </div>
      </div>

      {/* DELIVERY ADDRESS */}
      <div className="bg-white mt-3 p-5 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-2">Delivery Address</h3>
        <p className="text-sm font-medium">{order.shippingAddress.fullName}</p>
        <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
        <p className="text-sm text-gray-600">
          {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
          {order.shippingAddress.pincode}
        </p>
        <p className="text-sm text-gray-600">
          📞 {order.shippingAddress.phone}
        </p>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white mt-3 p-5 rounded-lg shadow-sm max-w-3xl mx-auto">
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
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-white mt-3 p-5 text-sm text-gray-600 rounded-lg shadow-sm max-w-3xl mx-auto">
        Pay on delivery
      </div>
    </div>
  );
};

export default OrderDetails;
