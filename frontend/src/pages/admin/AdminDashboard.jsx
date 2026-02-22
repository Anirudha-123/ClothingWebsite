// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalOrders: 0,
//     totalUsers: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const { data } = await axios.get(
//           "http://localhost:8080/api/admin/stats",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setStats(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <>
//       <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <p className="text-gray-500">Total Products</p>
//           <h2 className="text-2xl font-bold">
//             {stats.totalProducts}
//           </h2>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <p className="text-gray-500">Total Orders</p>
//           <h2 className="text-2xl font-bold">
//             {stats.totalOrders}
//           </h2>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <p className="text-gray-500">Total Users</p>
//           <h2 className="text-2xl font-bold">
//             {stats.totalUsers}
//           </h2>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//         <div className="flex gap-4">
//           <button
//             onClick={() => navigate("/admin/addProduct")}
//             className="px-5 py-2 bg-black text-white rounded"
//           >
//             Add New Product
//           </button>

//           <button
//             onClick={() => navigate("/admin/products")}
//             className="px-5 py-2 border border-black rounded"
//           >
//             Manage Products
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:8080/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStats(data);

        // Example Chart Data
        setChartData([
          { month: "Jan", revenue: 4000 },
          { month: "Feb", revenue: 3000 },
          { month: "Mar", revenue: 5000 },
          { month: "Apr", revenue: 4500 },
          { month: "May", revenue: 6000 },
          { month: "Jun", revenue: 7500 },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Header + Actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/admin/addProduct")}
            className="px-6 py-2 bg-black text-white rounded-xl shadow hover:opacity-90 transition"
          >
            + Add Product
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2 border border-black rounded-xl hover:bg-black hover:text-white transition"
          >
            Manage Products
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Revenue Overview</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#000"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side Info Boxes */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-gray-500">Total Products</p>
            <h2 className="text-3xl font-bold mt-2">{stats.totalProducts}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold mt-2">{stats.totalOrders}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold mt-2">{stats.totalUsers}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
