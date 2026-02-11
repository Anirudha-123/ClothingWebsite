import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiHeadphones,
  FiTag,
  FiHeart,
  FiSettings,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleProtectedRoute = (path) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* HEADER */}
      <div
        className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm"
        onClick={() => navigate(-1)}
      >
        <button className="text-xl">←</button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>

      {/* TOP CARD */}
      <div className="bg-white p-6 mt-2 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-2xl">
            <FiUser />
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-lg">
              {token ? "Welcome Back!" : "Hello, Guest"}
            </h2>
            <p className="text-sm text-gray-500">
              {token
                ? "Manage your account & orders"
                : "Login to access your account"}
            </p>
          </div>

          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="bg-pink-600 text-white px-5 py-2 rounded-md text-sm hover:bg-pink-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* MENU SECTION */}
      <div className="bg-white mt-3 shadow-sm divide-y">
        {/* Orders */}
        <div
          onClick={() => handleProtectedRoute("/orders")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <FiShoppingBag size={20} />
            <div>
              <p className="font-medium">Orders</p>
              <p className="text-xs text-gray-500">Check your order history</p>
            </div>
          </div>
          <FiChevronRight />
        </div>

        {/* Help Center */}
        <div
          onClick={() => navigate("/help")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <FiHeadphones size={20} />
            <div>
              <p className="font-medium">Help Center</p>
              <p className="text-xs text-gray-500">
                Get help regarding your orders
              </p>
            </div>
          </div>
          <FiChevronRight />
        </div>

        {/* Coupons */}
        <div
          onClick={() => handleProtectedRoute("/coupons")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <FiTag size={20} />
            <div>
              <p className="font-medium">Coupons</p>
              <p className="text-xs text-gray-500">View available coupons</p>
            </div>
          </div>
          <FiChevronRight />
        </div>

        {/* Wishlist */}
        <div
          onClick={() => handleProtectedRoute("/wishlist")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <FiHeart size={20} />
            <div>
              <p className="font-medium">Wishlist</p>
              <p className="text-xs text-gray-500">Your saved items</p>
            </div>
          </div>
          <FiChevronRight />
        </div>

        {/* Settings */}
        <div
          onClick={() => handleProtectedRoute("/settings")}
          className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <FiSettings size={20} />
            <div>
              <p className="font-medium">Settings</p>
              <p className="text-xs text-gray-500">Manage your preferences</p>
            </div>
          </div>
          <FiChevronRight />
        </div>
      </div>

      {/* LOGOUT */}
      {token && (
        <div className="bg-white mt-3 p-4 shadow-sm">
          <button
            onClick={handleLogout}
            className="w-full border border-red-500 text-red-500 py-3 rounded-md font-medium hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-400 mt-6 mb-10">
        App Version 1.0.0
      </div>
    </div>
  );
};

export default Profile;
