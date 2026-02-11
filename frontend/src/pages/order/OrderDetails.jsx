import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetailsSkeleton from "../skelton/OrderDetailsSkeleton";


const OrderDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/order/${id}`,
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

  const deliveryCharge = order.deliveryCharge || 100; 
  const totalAmount = subTotal + deliveryCharge;

  
  return (
  <div className="min-h-screen bg-gray-100">
    
    <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm pt-20" onClick={() => navigate(-1)}>
      <button  className="text-xl">
        ←
      </button>
      <h1 className="text-lg md:text-xl font-semibold">Order Details</h1>
    </div>

    {/* MAIN CONTAINER */}
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT SIDE (Products + Address) */}
      <div className="lg:col-span-2 space-y-6">

        {/* PRODUCTS */}
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 flex flex-col sm:flex-row items-center gap-4 rounded-lg shadow-sm"
            >
              <img
                src={item.product?.img}
                alt={item.product?.name}
                className="w-28 h-32 object-cover rounded"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-semibold text-lg">
                  {item.product?.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Qty: {item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DELIVERY ADDRESS */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3 text-lg">
            Delivery Address
          </h3>

          <p className="text-sm font-medium">
            {order.shippingAddress.fullName}
          </p>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.address}
          </p>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.city},{" "}
            {order.shippingAddress.state} -{" "}
            {order.shippingAddress.pincode}
          </p>
          <p className="text-sm text-gray-600">
            📞 {order.shippingAddress.phone}
          </p>
        </div>

        {/* ORDER STATUS */}
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <div className="bg-green-600 text-white py-3 rounded-lg">
            <p className="font-semibold text-lg">
              {order.orderStatus || "Delivered"}
            </p>
            <p className="text-sm">
              On {new Date(order.createdAt).toDateString()}
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE (Summary + Payment) */}
      <div className="space-y-6">

        {/* ORDER SUMMARY */}
        <div className="bg-white p-5 rounded-lg shadow-sm sticky top-6">
          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

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

        <div className="bg-white p-5 text-sm text-gray-600 rounded-lg shadow-sm">
          <p className="font-medium mb-1">Payment Method</p>
          <p>Cash on Delivery</p>
        </div>

      </div>

    </div>
  </div>
);

};

export default OrderDetails;
