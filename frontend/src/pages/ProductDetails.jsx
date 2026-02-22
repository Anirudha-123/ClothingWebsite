import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [bgimg, setBgImg] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);

  const images = [product?.img, product?.img2, product?.img3].filter(Boolean);

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`https://clothingwebsitebackend.onrender.com/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  // set main image when product loads
  useEffect(() => {
    if (images.length > 0) {
      setBgImg(images[0]);
      setActiveIndex(0);
    }
  }, [product]);

  // ================= CART =================
  const getGuestId = () => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  };

  const addToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const guestId = getGuestId();

      await axios.post(
        "https://clothingwebsitebackend.onrender.com/api/cart",
        {
          cartProduct: product._id,
          quantity: 1,
          size: selectedSize,
          guestId,
        },
        {
          headers: token ? { Authorization: "Bearer " + token } : {},
        },
      );

      toast.success("Added to cart");
      navigate("/cart");
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  if (loading) return <ProductDetailsSkeleton />;

  return (
    <div className="container mx-auto px-4 lg:px-8 pt-20 pb-10">
      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ================= IMAGE SECTION ================= */}
        {/* ================= IMAGE SECTION ================= */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* ===== LEFT THUMBNAILS (Desktop Only) ===== */}
          <div className="hidden md:flex flex-col gap-3 w-20 lg:w-24">
            {(images.length === 1 ? [images[0]] : images).map((img, index) => (
              <div
                key={index}
                onClick={() => {
                  setBgImg(img);
                  setActiveIndex(index);
                }}
                className="h-28 lg:h-32 cursor-pointer overflow-hidden"
              >
                <img
                  src={img}
                  alt="thumb"
                  className={`w-full h-full object-cover border-2 transition ${
                    activeIndex === index
                      ? "border-black"
                      : "border-transparent"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* ===== MAIN IMAGE (Desktop Only) ===== */}
          <div className="hidden md:block flex-1">
            <div className="h-112.5 lg:h-150 w-full overflow-hidden">
              <img
                src={bgimg}
                alt="product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ===== MOBILE SLIDER ===== */}
          <div className="md:hidden w-full overflow-hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="mobile"
                  className="w-full h-105 object-cover shrink-0 snap-center"
                />
              ))}
            </div>

            {/* Progress Line */}
            <div className="relative mt-3 h-1 bg-gray-200 w-full">
              <div
                className="absolute h-1 bg-black transition-all duration-300"
                style={{
                  width: `${100 / images.length}%`,
                  left: `${activeIndex * (100 / images.length)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <div className="flex flex-col justify-between space-y-4">
          <h5
            className="md:text-2xl text-xl font-semibold text-black pt-2 mb-1"
            style={{ fontFamily: "math" }}
          >
            {product?.name?.toUpperCase()}
          </h5>

          {/* Rating */}
          <div className="flex items-center">
            <div style={{ color: "#ff9800", fontSize: "18px" }}>★★★★★</div>
            <span className="ml-2 text-gray-500">(110)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-lg">
              ₹ {product.price}
            </span>

            {product.originalPrice > product.price && (
              <>
                <span className="text-gray-400 line-through">
                  ₹ {product.originalPrice}
                </span>

                <span className="font-semibold text-green-600">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          {/* Size Selection */}
          <div className="py-2">
            <h6 className="font-bold text-gray-500 mb-2">Select Size</h6>

            <div className="flex gap-2 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize((prev) => (prev === size ? "" : size))
                  }
                  className="border border-gray-400 py-2 px-4 rounded transition"
                  style={{
                    backgroundColor: selectedSize === size ? "green" : "white",
                    color: selectedSize === size ? "white" : "black",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="px-4 py-3 bg-black text-gray-200 font-semibold w-full sm:w-40"
              onClick={() =>
                addToCart({
                  cartProduct: product._id,
                  quantity: 1,
                })
              }
            >
              ADD TO CART
            </button>

            <button className="px-4 py-3 border border-black text-black font-semibold w-full sm:w-40">
              BUY NOW
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base mt-3">
            {product?.description}
          </p>

          {/* Extra Points */}
          <div className="space-y-2 text-gray-600 text-sm md:text-base">
            <p>
              Lightweight and easy to layer, pairs effortlessly with jeans,
              chinos, or shorts.
            </p>
            <p>Easy-care fabric allows quick washing and minimal ironing.</p>
            <p>Thoughtfully crafted for daily wear.</p>
          </div>

          {/* Info Box */}
          <div
            className="p-4 mt-4"
            style={{
              background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
              borderRadius: "12px",
              border: "1px solid #dee2e6",
            }}
          >
            <div className="flex items-start mb-2">
              <span style={{ color: "#11998e", marginRight: "8px" }}>✓</span>
              <small className="text-gray-600">100% Original product</small>
            </div>

            <div className="flex items-start mb-2">
              <span style={{ color: "#11998e", marginRight: "8px" }}>✓</span>
              <small className="text-gray-600">
                Cash on delivery available
              </small>
            </div>

            <div className="flex items-start">
              <span style={{ color: "#11998e", marginRight: "8px" }}>✓</span>
              <small className="text-gray-600">
                Easy return and exchange within 7 days
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
