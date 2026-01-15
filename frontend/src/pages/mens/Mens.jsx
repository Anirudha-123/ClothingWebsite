




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

  return (
    <div>
      {/* Banner Section */}
      <div className="pb-4 relative">
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
            Total Products {products.length}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              <img
                src={item?.img}
                alt={item.name}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
              />

              {/* Product Info */}
              {/* <div className="flex flex-col gap-2 p-4 flex-1">
                <p className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                  {item.name}
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg">
                    ₹ {item.price}
                  </p>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <>
                      <p className="text-gray-400 line-through text-sm sm:text-base md:text-lg">
                        ₹ {item.originalPrice}
                      </p>
                      <p className="text-green-600 font-semibold text-sm sm:text-base md:text-lg">
                        {Math.round(
                          ((item.originalPrice - item.price) / item.originalPrice) *
                            100
                        )}
                        % OFF
                      </p>
                    </>
                  )}
                </div> */}
        <div className="flex items-center justify-between p-4 flex-1">
  {/* Product Name */}
  <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl truncate">
    {item.name}
  </p>

  {/* Price + Original Price + Discount */}
  <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
    <p className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg">
      ₹ {item.price}
    </p>

    {item.originalPrice && item.originalPrice > item.price && (
      <>
        <p className="text-gray-400 line-through text-sm sm:text-base md:text-lg">
          ₹ {item.originalPrice}
        </p>
        <p className="text-green-600 font-semibold text-sm sm:text-base md:text-lg">
          {Math.round(
            ((item.originalPrice - item.price) / item.originalPrice) * 100
          )}
          % OFF
        </p>
      </>
    )}
  </div>
</div>




                <button
                  className="mt-auto px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition-all font-semibold text-sm sm:text-base"
                  onClick={() => {
                    dispatch(addToCart(item));
                    navigate(`/product/${item._id}`);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mens;

