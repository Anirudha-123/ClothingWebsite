import React, { useEffect, useState } from "react";
import { FaTruck, FaBoxOpen, FaFlag, FaTshirt } from "react-icons/fa";

const newArrivals = [
  {
    img: "bo4.jpeg",
    name: "Stylern House Polo",
    price: 1299,
    originalPrice: 1799,
  },
  {
    img: "bo5.jpeg",
    name: "Gryffindor Polo",
    price: 999,
    originalPrice: 1499,
  },
  {
    img: "bo6.jpeg",
    name: "Triwizard T-shirt",
    price: 2199,
    originalPrice: 2999,
  },
  {
    img: "bo7.jpeg",
    name: "Hufflepuff  Knit Polo",
    price: 1399,
    originalPrice: 1999,
  },
  {
    img: "bo8.jpeg",
    name: "Horcruxes  T-shirt",
    price: 699,
    originalPrice: 999,
  },
  {
    img: "bo9.jpeg",
    name: "Premium Hoodie",
    price: 1899,
    originalPrice: 2499,
  },
];

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Home = () => {
  const categories = [
    { img: "img1.jpg", title: "Mens" },
    { img: "img2.jpg", title: "Womens" },
    { img: "img3.jpg", title: "Kids" },
  ];

  const getDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < newArrivals.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div>
      <img
        src="bo2.jpeg"
        alt="hero"
        className="w-full h-64 sm:h-80 md:h-96 lg:h-160 object-cover "
      />

      <div className="categories grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-1 px-1 py-1 ">
        {categories.map((i, index) => (
          <div
            key={index}
            className="relative w-full aspect-3/4 overflow-hidden rounded-md"
          >
            <img
              src={i.img}
              alt="catImg"
              className="w-full h-full  object-cover transition-all duration-300 hover:-translate-y-2"
            />

            <h3
              className="absolute bottom-3 sm:bottom-3 md:bottom-17  lg:bottom-20 left-0 right-0 text-center text-sm lg:text-2xl text-white lg:font-bold drop-shadow-lg"
              style={{ fontFamily: "math" }}
            >
              {i.title}
            </h3>
          </div>
        ))}
      </div>

      <img
        src="bo3.jpeg"
        alt="hero"
        className="w-full h-64 sm:h-80 md:h-96 lg:h-170 object-cover "
      />

      <div className="text-center py-8">
        <span className="text-xs uppercase tracking-[4px] text-gray-400">
          Fresh Collection
        </span>

        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
          New Arrivals
        </h2>

        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Discover what’s new — your wardrobe upgrade starts here.
        </p>
      </div>

      <div className="relative px-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-40"
        >
          <FaChevronLeft />
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals
            .slice(startIndex, startIndex + itemsPerPage)
            .map((item, index) => (
              <div
                key={index}
                className="shadow-sm rounded-md overflow-hidden "
              >
                <img
                  src={item.img}
                  className="w-full h-60 sm:h-72 md:h-80 lg:h-112.5 object-cover"
                  alt="product"
                />

                <div className="p-2">
                  <h3 className="text-sm font-medium">{item.name}</h3>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold">₹{item.price}</span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{item.originalPrice}
                    </span>
                    <span className="text-xs text-green-600 font-semibold">
                      {getDiscount(item.price, item.originalPrice)}% OFF
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= newArrivals.length}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-40"
        >
          <FaChevronRight />
        </button>
      </div>

      <hr
        className="text-gray-300 px-2 py-2   pt-10 mx-3"
        style={{ marginTop: "40px" }}
      />

      <img
        src="bo10.jpeg"
        alt="hero"
        className="w-full h-64 sm:h-80 md:h-96 lg:h-170 object-cover "
      />

      <div className="mens md:px-7">
        <div className="text-left py-8 px-4  ">
          <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-gray-800 tracking-tight">
            Shop Men
          </h2>

          <div className="flex justify-between items-center">
            <p className="mt-2 text-gray-500 text-sm sm:text-base md:text-base font-light">
              Uncover the latest in men's fashion
            </p>

            <p className="text-gray-500 md:font-medium  text-sm w-max  border-b-2 border-gray-300 pb-1">
              Shop Men
            </p>
          </div>
        </div>

        <div className="relative px-4 mt-1 mb-5">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-40"
          >
            <FaChevronLeft />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals
              .slice(startIndex, startIndex + itemsPerPage)
              .map((item, index) => (
                <div
                  key={index}
                  className="shadow-sm rounded-md overflow-hidden "
                >
                  <img
                    src={item.img}
                    className="w-full h-60 sm:h-72 md:h-80 lg:h-112.5 object-cover"
                    alt="product"
                  />

                  <div className="p-2">
                    <h3 className="text-sm font-medium">{item.name}</h3>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold">₹{item.price}</span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-xs text-green-600 font-semibold">
                        {getDiscount(item.price, item.originalPrice)}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= newArrivals.length}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-40"
          >
            <FaChevronRight />
          </button>
        </div>

        <hr
          className="text-gray-300 px-2 py-2   pt-3 mx-3"
          style={{ marginTop: "40px" }}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-6 pb-12 text-center">
  <h2 className="text-3xl sm:text-4xl md:text-3xl font-extrabold text-gray-900">
    Clothing Store
  </h2>

  

  {/* Subheading / description */}
  <p className="mt-4 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
    Uncover the latest trends and premium styles curated just for you.
  </p>

  
  <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
    Clothing Store brings you high-quality fashion that blends comfort, style, and affordability. 
    Explore casual wear, formal attire, and everything in between for your perfect wardrobe upgrade.
  </p>
</div>


      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-11 md:w-20 md:h-20 rounded-full border border-gray-300 flex items-center justify-center mb-3">
              <FaTruck size={28} />
            </div>
            <h6 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              SHIPPING WITHIN 48 HOURS
            </h6>
            <p className="text-gray-500 text-xs md:text-sm">
              Your order will be shipped within 48 hours
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-11 md:w-20 md:h-20 rounded-full border border-gray-300 flex items-center justify-center mb-3">
              <FaBoxOpen size={28} />
            </div>
            <h6 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              FREE DELIVERY
            </h6>
            <p className="text-gray-500 text-xs md:text-sm">
              On prepaid orders
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-11 md:w-20 md:h-20 rounded-full border border-gray-300 flex items-center justify-center mb-3">
              <FaFlag size={28} />
            </div>
            <h6 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              MADE IN INDIA
            </h6>
            <p className="text-gray-500 text-xs md:text-sm">
              100% Indian production
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-11 md:w-20 md:h-20 rounded-full border border-gray-300 flex items-center justify-center mb-3">
              <FaTshirt size={28} />
            </div>
            <h6 className="font-semibold text-sm md:text-base text-gray-800 mb-1">
              LUXURY FASHION
            </h6>
            <p className="text-gray-500 text-xs md:text-sm">
              High-quality & affordable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
