// import React, { useEffect, useState } from "react";
// import UseProducts from "../hooks/UseProducts.jsx";
// import { IoFilterSharp } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import SkeletonGrid from "../../components/SkeletonGrid.jsx";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Womens = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);
//   const { products, loading, hasFeched } = UseProducts("womens");
//   const navigate = useNavigate();

//   return (
//     <div>
//       <div className="relative pb-2">
//         <img
//           src="/women_hero.jpeg"
//           alt="mensImg"
//           className="w-full h-[30vh] md:h-[60vh] lg:h-[60vh] object-cover object-top"
//         />
//       </div>

//       <div className="container mx-auto px-4 py-10">
//         {loading && <SkeletonGrid count={8} />}

//         {!loading && hasFeched && products.length === 0 && (
//           <p className="text-center text-lg font-semibold text-red-500">
//             Product not found
//           </p>
//         )}

//         {!loading && hasFeched && products.length > 0 && (
//           <>
//             <div className="flex flex-row  gap-3 sm:flex-row justify-between  items-center mb-6 md:px-3">
//               <button className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-700 hover:text-gray-900 transition">
//                 <IoFilterSharp className="text-xl sm:text-2xl" />
//                 <span>Filter</span>
//               </button>

//               <p className="text-sm sm:text-base font-medium text-gray-500">
//                 Total Products:{" "}
//                 <span className="font-semibold text-gray-700">
//                   {products.length}
//                 </span>
//               </p>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
//               {products.map((item, index) => (
//                 <div
//                   key={index}
//                   onClick={() => navigate(`/product/${item._id}`)}
//                 >
//                   <img
//                     src={item.img}
//                     alt={item.name}
//                     loading="lazy"
//                     className="w-full  aspect-3/4 object-cover "
//                   />

//                   <div className="flex flex-col gap-2 py-2 ms-1">
//                     <p className="font-semibold    text-sm md:text-xl">
//                       {item.name}
//                     </p>

//                     <div className="flex items-center gap-2">
//                       <span className="text-sm md:text-base font-semibold text-gray-900">
//                         ₹ {item.price}
//                       </span>

//                       {item.originalPrice > item.price && (
//                         <>
//                           <span className="text-xs md:text-sm text-gray-400 line-through">
//                             ₹ {item.originalPrice}
//                           </span>

//                           <span className="text-xs md:text-sm font-semibold text-green-600">
//                             {Math.round(
//                               ((item.originalPrice - item.price) /
//                                 item.originalPrice) *
//                                 100,
//                             )}
//                             % OFF
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Womens;
import React, { useEffect, useState } from "react";
import UseProducts from "../hooks/UseProducts.jsx";
import { IoFilterSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SkeletonGrid from "../../components/SkeletonGrid.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import FilterDrawer from "../../components/FilterDrawer.jsx";

const Womens = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const { products, loading, hasFeched } = UseProducts("womens");
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // ✅ Fixed Categories
  const categoryOptions = ["shirt", "t-shirt", "jeans"];

  // ✅ Filter Logic
  const filteredProducts = products.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.subCategory?.toLowerCase());

    const min = priceRange.min ? Number(priceRange.min) : 0;
    const max = priceRange.max ? Number(priceRange.max) : Infinity;

    const priceMatch = item.price >= min && item.price <= max;

    return categoryMatch && priceMatch;
  });

  return (
    <div>
      {/* HERO IMAGE */}
      <div className="relative pb-2">
        <img
          src="/women_hero.jpeg"
          alt="womenImg"
          className="w-full h-[30vh] md:h-[60vh] object-cover object-top"
        />
      </div>

      <div className="container mx-auto px-4 py-10">
        {loading && <SkeletonGrid count={8} />}

        {!loading && hasFeched && (
          <>
            {/* FILTER BUTTON */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setShowFilter(true)}
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <IoFilterSharp />
                <span>Filter</span>
              </button>

              <p className="text-gray-500">
                Total Products:{" "}
                <span className="font-semibold">
                  {filteredProducts.length}
                </span>
              </p>
            </div>

            {/* ✅ Reusable Filter Drawer */}
            <FilterDrawer
              show={showFilter}
              setShow={setShowFilter}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              categoryOptions={categoryOptions}
            />

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="cursor-pointer"
                >
                  <img
                    src={item.img || null}
                    alt={item.name}
                    loading="lazy"
                    className="w-full aspect-3/4 object-cover"
                  />

                  <div className="flex flex-col gap-2 py-2">
                    <p className="font-semibold text-sm md:text-lg">
                      {item.name}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        ₹ {item.price}
                      </span>

                      {item.originalPrice > item.price && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ₹ {item.originalPrice}
                          </span>

                          <span className="text-sm text-green-600 font-semibold">
                            {Math.round(
                              ((item.originalPrice - item.price) /
                                item.originalPrice) *
                                100
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

export default Womens;