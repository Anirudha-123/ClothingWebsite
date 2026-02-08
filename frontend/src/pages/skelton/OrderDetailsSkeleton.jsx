// src/components/skeleton/OrderDetailsSkeleton.jsx
import React from "react";

const OrderDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 animate-pulse">
      {/* HEADER */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="h-6 w-6 bg-gray-200 rounded" />
        <div className="h-5 w-32 bg-gray-200 rounded" />
      </div>

      {/* PRODUCTS */}
      <div className="max-w-3xl mx-auto mt-3 space-y-3 p-3">
        {[1].map((i) => (
          <div
            key={i}
            className="bg-white p-4 flex items-center gap-4 rounded-lg shadow-sm"
          >
            {/* IMAGE */}
            <div className="w-24 h-28 bg-gray-200 rounded" />

            {/* DETAILS */}
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* ORDER STATUS */}
      <div className="bg-white mt-3 p-4 rounded-lg shadow-sm mx-3 max-w-3xl md:mx-auto">
        <div className="h-10 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />
      </div>

      {/* DELIVERY ADDRESS */}
      <div className="bg-white mt-3 p-5 rounded-lg shadow-sm mx-3 max-w-3xl md:mx-auto space-y-2">
        <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white mt-3 p-5 rounded-lg shadow-sm mx-3 max-w-3xl md:mx-auto">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="border-t mt-3 pt-3 flex justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-white mt-3 p-5 rounded-lg shadow-sm mx-3 max-w-3xl md:mx-auto">
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
