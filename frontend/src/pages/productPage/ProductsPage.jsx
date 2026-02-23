// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import SkeletonGrid from "../../components/SkeletonGrid.jsx";

// export default function ProductsPage() {
//   const { category, subCategory } = useParams();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(
//           `http://localhost:8080/api/products/get?category=${category}`
//         );

//         const data = await response.json();
//         setProducts(data.products || data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (category) {
//       fetchProducts();
//     }
//   }, [category]);

//   // 🔥 Filter by subCategory
//   const filteredProducts = subCategory
//     ? products.filter(
//         (item) =>
//           item.subCategory?.toLowerCase() === subCategory.toLowerCase()
//       )
//     : products;

//   return (
//     <div>
//       {/* HERO IMAGE */}
//       <div className="relative pb-2">
//         <img
//           src="/bo3.jpeg"
//           alt="category-banner"
//           className="w-full h-[30vh] md:h-[60vh] object-cover"
//         />
//       </div>

//       <div className="container mx-auto px-4 py-10">
//         {loading && <SkeletonGrid count={8} />}

//         {!loading && (
//           <>
//             {/* TITLE + COUNT */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl md:text-3xl font-bold capitalize">
//                 {category} {subCategory && `- ${subCategory}`}
//               </h2>

//               <p className="text-gray-500">
//                 Total Products:{" "}
//                 <span className="font-semibold">
//                   {filteredProducts.length}
//                 </span>
//               </p>
//             </div>

//             {filteredProducts.length === 0 ? (
//               <p className="text-center text-lg font-semibold text-red-500">
//                 No products found
//               </p>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {filteredProducts.map((item) => (
//                   <div
//                     key={item._id}
//                     onClick={() => navigate(`/product/${item._id}`)}
//                     className="cursor-pointer"
//                   >
//                     <img
//                       src={item.img}
//                       alt={item.name}
//                       loading="lazy"
//                       className="w-full aspect-3/4 object-cover"
//                     />

//                     <div className="flex flex-col gap-2 py-2">
//                       <p className="font-semibold text-sm md:text-lg">
//                         {item.name}
//                       </p>

//                       <div className="flex items-center gap-2">
//                         <span className="font-semibold">
//                           ₹ {item.price}
//                         </span>

//                         {item.originalPrice > item.price && (
//                           <>
//                             <span className="text-sm text-gray-400 line-through">
//                               ₹ {item.originalPrice}
//                             </span>

//                             <span className="text-sm text-green-600 font-semibold">
//                               {Math.round(
//                                 ((item.originalPrice - item.price) /
//                                   item.originalPrice) *
//                                   100
//                               )}
//                               % OFF
//                             </span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SkeletonGrid from "../../components/SkeletonGrid.jsx";

export default function ProductsPage() {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     🔥 CATEGORY HERO IMAGE LOGIC
  ================================ */

  const heroImages = {
    mens: {
      default: "/bo3.jpeg",
      tshirt: "/bo3.jpeg",
      shirt: "/bo3.jpeg",
      shoes: "/bo3.jpeg",
    },
    womens: {
      default: "/women_hero.jpeg",
      tshirt: "/women_hero.jpeg",
      dress: "/women_hero.jpeg",
      shoes: "/women_hero.jpeg",
    },
    kids: {
      default: "/kids-banner.jpg",
      tshirt: "/kids-tshirt.jpg",
      shirt: "/kids-shirt.jpg",
    },
  };

  const heroImage =
    heroImages[category]?.[subCategory] ||
    heroImages[category]?.default ||
    "/default-banner.jpg";

  /* ===============================
     🔥 FETCH PRODUCTS
  ================================ */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://clothingwebsitebackend.onrender.com/api/products/get?category=${category}`
        );

        const data = await response.json();
        setProducts(data.products || data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  /* ===============================
     🔥 FILTER SUBCATEGORY
  ================================ */

  const filteredProducts = subCategory
    ? products.filter(
        (item) =>
          item.subCategory?.toLowerCase() === subCategory.toLowerCase()
      )
    : products;

  /* ===============================
     🔥 UI
  ================================ */

  return (
    <div>
      {/* HERO IMAGE */}
      <div className="relative pb-2">
        <img
          src={heroImage}
          alt="category-banner"
          className="w-full h-[30vh] md:h-[60vh] object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-10">
        {loading && <SkeletonGrid count={8} />}

        {!loading && (
          <>
            {/* TITLE + COUNT */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-3xl font-bold capitalize">
                {category} {subCategory && `- ${subCategory}`}
              </h2>

              <p className="text-gray-500">
                Total Products:{" "}
                <span className="font-semibold">
                  {filteredProducts.length}
                </span>
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-lg font-semibold text-red-500">
                No products found
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="cursor-pointer"
                  >
                    <img
                      src={item.img}
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
                              )}%
                              OFF
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
