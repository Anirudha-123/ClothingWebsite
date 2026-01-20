import React, { useState } from "react";
import UseProducts from "../hooks/UseProducts.jsx";
import { IoFilterSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SkeletonGrid from "../../components/SkeletonGrid.jsx";

const Mens = () => {
  const { products, loading, hasFeched } = UseProducts("mens");
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative pb-4">
        <img
          src="/bo3.jpeg"
          alt="mensImg"
          className="w-full h-[30vh] md:h-[70vh] lg:h-[70vh] object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-10">
        {loading && <SkeletonGrid count={8} />}

        {!loading && hasFeched && products.length === 0 && (
          <p className="text-center text-lg font-semibold text-red-500">
            Product not found
          </p>
        )}

        {!loading && hasFeched && products.length > 0 && (
          <>
            <div className="flex flex-row  gap-3 sm:flex-row justify-between  items-center mb-6 md:px-3">
              <button className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-700 hover:text-gray-900 transition">
                <IoFilterSharp className="text-xl sm:text-2xl" />
                <span>Filter</span>
              </button>

              <p className="text-sm sm:text-base font-medium text-gray-500">
                Total Products:{" "}
                <span className="font-semibold text-gray-700">
                  {products.length}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              {products.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full  aspect-3/4 object-cover "
                  />

                  <div className="flex flex-col gap-2 py-2 ms-1">
                    <p className="font-semibold    text-sm md:text-xl">
                      {item.name}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base font-semibold text-gray-900">
                        ₹ {item.price}
                      </span>

                      {item.originalPrice > item.price && (
                        <>
                          <span className="text-xs md:text-sm text-gray-400 line-through">
                            ₹ {item.originalPrice}
                          </span>

                          <span className="text-xs md:text-sm font-semibold text-green-600">
                            {Math.round(
                              ((item.originalPrice - item.price) /
                                item.originalPrice) *
                                100,
                            )}
                            % OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mens;
