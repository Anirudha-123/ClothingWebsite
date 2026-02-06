// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Orders = () => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8080/api/order/my-orders",
//           {
//             headers: { Authorization: "Bearer " + token },
//           },
//         );
//         setOrders(res.data.orders || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-center">Loading orders...</div>;
//   }

//   if (!orders.length) {
//     return <div className="p-6 text-center">No orders found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* HEADER */}
//       <div className="bg-white p-4 flex items-center gap-3 shadow-sm">
//         <button onClick={() => navigate(-1)} className="text-xl">
//           ←
//         </button>
//         <h1 className="text-lg font-semibold">My Orders</h1>
//       </div>

//       {/* ORDER LIST */}
//       <div className="max-w-3xl mx-auto p-3 space-y-3">
//         {orders.map((order) =>
//           order.items.map((item, idx) => (
//             <div
//               key={idx}
//               onClick={() => navigate(`/orders/${order._id}`)}
//               className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer active:scale-[0.99] transition"
//             >
//               {/* STATUS BAR */}
//               <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 text-sm">
//                 <div className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
//                   ✕
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-700">
//                     {order.orderStatus || "Placed"}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     on {new Date(order.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>

//               {/* PRODUCT ROW */}
//               <div className="flex items-center gap-4 p-4">
//                 {/* IMAGE */}
//                 <img
//                   src={item.product?.img}
//                   alt={item.product?.name}
//                   className="w-16 h-20 object-cover rounded"
//                 />

//                 {/* DETAILS */}
//                 <div className="flex-1">
//                   <p className="font-medium text-sm text-gray-800 line-clamp-2">
//                     {item.product?.name}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Qty: {item.quantity}
//                   </p>
//                   <p className="text-xs text-gray-500">₹{item.price}</p>
//                 </div>

//                 {/* ARROW */}
//                 <span className="text-xl text-gray-400">›</span>
//               </div>
//             </div>
//           )),
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://clothingwebsitebackend.onrender.com/api/order/my-orders",
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
    return <div className="p-6 text-center">Loading orders...</div>;
  }

  if (!orders.length) {
    return <div className="p-6 text-center">No orders found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white p-4 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-xl">
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

