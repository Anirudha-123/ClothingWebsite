import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrdersSkeleton from "../skelton/OrdersSkeleton";



const Orders = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/order/my-orders",
          {
            headers: { Authorization: "Bearer " + token },
          },
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

if (loading) {
  return <OrdersSkeleton />;
}


  if (!orders || orders.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100 text-center px-4">
      
      <div className="bg-white p-6 rounded-full shadow-md mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17v-6h13M9 7h13M5 7h.01M5 17h.01M9 12h13"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Orders Yet
      </h2>

      <p className="text-gray-500 max-w-md mb-6">
        You haven’t placed any orders yet. Start shopping and your orders
        will appear here.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300"
      >
        Continue Shopping
      </button>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-4 flex items-center gap-3 shadow-sm pt-20" onClick={() => navigate("/")}>
        <button  className="text-xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">My Orders</h1>
      </div>

      {/* ORDER LIST */}
      <div className="max-w-3xl mx-auto p-3 space-y-3">
        {orders.map((order) => (
          <div
            key={order._id}
            onClick={() => navigate(`/orders/${order._id}`)}
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer active:scale-[0.99] transition"
          >
            {/* STATUS BAR */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 text-sm">
              <div className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                ✕
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  {order.orderStatus || "Placed"}
                </p>
                <p className="text-xs text-gray-500">
                  on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* PRODUCT ROWS */}
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition"
              >
                {/* IMAGE */}
                <img
                  src={item.product?.img}
                  alt={item.product?.name}
                  className="w-16 h-20 object-cover rounded"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800 line-clamp-2">
                    {item.product?.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-xs text-gray-500">₹{item.price}</p>
                </div>

                {/* ARROW */}
                <span className="text-xl text-gray-400">›</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
