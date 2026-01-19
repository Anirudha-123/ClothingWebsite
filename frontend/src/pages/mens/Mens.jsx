import React from "react";
import UseProducts from "../hooks/UseProducts.jsx";
import { IoFilterSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/ProductSlice.jsx";
import { useNavigate } from "react-router-dom";

const Mens = () => {
  const products = UseProducts("mens");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("Mens reloaded", products);

  


  return (
    <div>
      {/* Banner */}
      <div className="relative pb-4">
        <img
          src="/bo3.jpeg"
          alt="mensImg"
          className="w-full h-[50vh] md:h-[70vh] lg:h-[70vh] object-cover"
        />
        <h4 className="absolute top-1/2 left-12 transform -translate-y-1/2 lg:text-4xl text-2xl text-white font-bold z-50">
          Mens
        </h4>
      </div>

      {/* Filter & Total Products */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h5 className="flex items-center text-2xl text-gray-700">
            Filter <IoFilterSharp className="ml-2" />
          </h5>
          <p className="font-semibold text-gray-500">
            Total Productss {products.length}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <div key={index} className=" shadow-sm "  onClick={() => navigate(`/product/${item._id}`)}>
              {" "}
              <img
                src={item?.img}
                alt="img"
               
                className="h-30 md:h-60 lg:h-130 w-full object-cover"
              />
              <div className="flex flex-col gap-2">
                <p className="font-semibold  text-sm md:text-xl">{item.name}</p>

                <div className="flex flex-row space-x-3">
                  <p className="text-gray-600 text-sm md:font-bold ">₹ {item.price}</p>
                  <p className="text-gray-400 text-sm mb-1 line-through font-semibold">
                    ₹ {item?.originalPrice}
                  </p>

                  <p className="text-green-600 hidden md:flex md:font-semibold">
                    {item.originalPrice && item.originalPrice > item.price
                      ? `${Math.round(
                          ((item.originalPrice - item.price) /
                            item.originalPrice) *
                            100,
                        )}% OFF`
                      : ""}
                  </p>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mens;
