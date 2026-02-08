import React from "react";

const CartSkeleton = () => {
  return (
    <div className="container mx-auto lg:px-10 bg-gray-50 pt-20 pb-20 animate-pulse">
      <h3 className="font-bold p-2 text-sm lg:text-xl bg-gray-300 w-32 h-6 rounded mb-4"></h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT: Cart Items */}
        <div className="space-y-3">
          {[1].map((_, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-3 md:p-4 bg-white"
            >
              <div className="flex gap-3 md:gap-4">
                {/* Image */}
                <div className="w-28 h-36 md:w-40 md:h-44 bg-gray-300 rounded-md"></div>

                {/* Content */}
                <div className="flex flex-col w-full space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>

                  <div className="flex justify-between items-center mt-auto pt-6">
                    <div className="h-3 bg-gray-300 rounded w-20"></div>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                      <div className="w-5 h-4 bg-gray-300 rounded"></div>
                      <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="bg-white p-4 rounded-lg space-y-3">
              <div className="h-5 bg-gray-300 rounded w-40 mb-4"></div>

              <div className="flex justify-between">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>

              <div className="flex justify-between">
                <div className="h-4 bg-gray-300 rounded w-28"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>

              <div className="border-t pt-3 flex justify-between">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            </div>

            <div className="h-10 bg-gray-300 rounded-lg mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
