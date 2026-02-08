// src/components/skeleton/CheckoutSkeleton.jsx
import React from "react";

const CheckoutSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-12 pt-25 animate-pulse">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 sm:p-6 space-y-4">
          {/* Title */}
          <div className="h-6 w-48 bg-gray-200 rounded" />

          {/* Address Cards */}
          {[1].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 flex gap-4"
            >
              <div className="h-5 w-5 bg-gray-200 rounded-full mt-1" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            </div>
          ))}

          {/* Add new address button */}
          <div className="h-4 w-36 bg-gray-200 rounded mt-4" />
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 h-fit sticky top-6 space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded" />

          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          <div className="border-t pt-3 flex justify-between">
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>

          <div className="h-12 w-full bg-gray-300 rounded mt-4" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
