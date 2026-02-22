

// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/authSlice";

// const AdminLayout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const linkBaseStyle =
//     "px-4 py-2 rounded transition-all duration-200";

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-60 bg-black text-white p-6">
//         <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

//         <nav className="flex flex-col gap-3">

//           <NavLink
//             to="/admin/dashboard"
//             className={({ isActive }) =>
//               `${linkBaseStyle} ${
//                 isActive
//                   ? "bg-white text-black font-semibold"
//                   : "hover:bg-gray-800"
//               }`
//             }
//           >
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/admin/products"
//             className={({ isActive }) =>
//               `${linkBaseStyle} ${
//                 isActive
//                   ? "bg-white text-black font-semibold"
//                   : "hover:bg-gray-800"
//               }`
//             }
//           >
//             Products
//           </NavLink>

//           <NavLink
//             to="/admin/addProduct"
//             className={({ isActive }) =>
//               `${linkBaseStyle} ${
//                 isActive
//                   ? "bg-white text-black font-semibold"
//                   : "hover:bg-gray-800"
//               }`
//             }
//           >
//             Add Product
//           </NavLink>

//           <button
//             onClick={handleLogout}
//             className="text-red-500 text-left mt-6 hover:text-red-400"
//           >
//             Logout
//           </button>

//         </nav>
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-10 bg-gray-100">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const linkBaseStyle =
    "px-4 py-2 rounded transition-all duration-200";

  return (
    <div className="flex">
      
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-60 bg-black text-white p-6 flex flex-col justify-between">
        
        {/* Top */}
        <div>
          <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

          <nav className="flex flex-col gap-3">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${linkBaseStyle} ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-800"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `${linkBaseStyle} ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-800"
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/admin/addProduct"
              className={({ isActive }) =>
                `${linkBaseStyle} ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-800"
                }`
              }
            >
              Add Product
            </NavLink>
          </nav>
        </div>

        {/* Bottom Logout */}
        <button
          onClick={handleLogout}
          className="border border-red-500 text-red-500 font-semibold py-2 rounded hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="ml-60 flex-1 min-h-screen p-10 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;