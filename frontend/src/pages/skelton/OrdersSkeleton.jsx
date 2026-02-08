// src/components/skeleton/OrdersSkeleton.jsx
import React from "react";

const OrdersSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 animate-pulse">
      {/* HEADER */}
      <div className="bg-white p-4 flex items-center gap-3 shadow-sm">
        <div className="h-6 w-6 bg-gray-200 rounded" />
        <div className="h-5 w-32 bg-gray-200 rounded" />
      </div>

      {/* ORDER LIST */}
      <div className="max-w-3xl mx-auto p-3 space-y-3">
        {[1].map((order) => (
          <div
            key={order}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* STATUS BAR */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50">
              <div className="h-6 w-6 rounded-full bg-gray-200" />
              <div className="space-y-1">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            </div>

            {/* PRODUCT ROWS */}
            {[1,2].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 p-4"
              >
                {/* IMAGE */}
                <div className="w-16 h-20 bg-gray-200 rounded" />

                {/* DETAILS */}
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>

                {/* ARROW */}
                <div className="h-5 w-3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSkeleton;
