import axios from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { addToCart } from "../redux/ProductSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useLoginModal } from "../context/LoginModal";

const ProductDetails = () => {
  const { id } = useParams();
    const {setLoginModalOpen} = useLoginModal()

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");

  const [loading, setLoading] = useState(true);
  const [bgimg, setBgImg] = useState(null);
  const images = ["/bo4.jpeg", "/bo5.jpeg", "/bo6.jpeg"];

  useEffect(() => {
    const getProduct = async (params) => {
      try {
        const response = await axios.get(
          `https://clothingwebsitebackend.onrender.com/api/products/${id}`,
        );

        setProduct(response.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    setBgImg(images[0]);
  }, []);



    const addToCart = async (item) => {

      const token = JSON.parse(localStorage.getItem("login"))

      if(!token){

        setLoginModalOpen(true)
        return
      }
      
      try {

        const response = await axios.post("https://clothingwebsitebackend.onrender.com/api/cart", item,{
          headers:{
            Authorization:"Bearer " + token
          }
        })

        if(response.status === 200 || response.status === 201){

          navigate("/cart")
        }
        
      } catch (error) {
        
        console.error(error)
      }
    }

  
  

  if (loading) {
    return <ProductDetailsSkeleton />;
  }


  return (
    <>
      <div className="container mx-auto px-2  lg:px-8">
        <div className="flex flex-wrap items-center gap-2 mt-20 mb-4 text-sm md:text-xl">
          <p
            onClick={() => navigate("/")}
            className="text-gray-400 font-semibold cursor-pointer hover:text-black transition"
            style={{ fontFamily: "math" }}
          >
            Home
          </p>

          <span className="text-gray-300">/</span>

          <p
            onClick={() => navigate("/mens")}
            className="text-gray-400 font-semibold cursor-pointer hover:text-black transition"
            style={{ fontFamily: "math" }}
          >
            Mens
          </p>

          <span className="text-gray-300">/</span>

          <p
            className="text-black font-semibold truncate max-w-55 md:max-w-full"
            style={{ fontFamily: "math" }}
          >
            {product?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-3 h-full">
            <div className="flex order-1 ">
              <img
                src={bgimg}
                alt="product"
                className="w-full max-h-[88vh] md:h-220 object-cover "
              />
            </div>

            <div className="flex lg:flex-col gap-1 order-1 lg:order-1 h-full md:me-5">
              {images.map((i, index) => (
                <img
                  key={index}
                  src={i}
                  alt="thumb"
                  className="w-full h-39 sm:w-full sm:h-32 lg:w-56 md:h-[50vh] lg:h-51
                       object-cover cursor-pointer"
                  onMouseEnter={(e) => setBgImg(e.target.src)}
                />
              ))}
            </div>
          </div>

          <div className=" flex flex-col justify-h-full space-y-3">
            <h5
              className="md:text-2xl  text-xl  font-semibold text-black pt-2 mb-1"
              style={{ fontFamily: "math" }}
            >
              {product?.name.toUpperCase()}
            </h5>

            <div className="flex products-center ">
              <div style={{ color: "#ff9800", fontSize: "18px" }}>★★★★★</div>
              <span className="ms-2 text-muted">(110)</span>
            </div>

            <div className="flex products-center gap-2">
              <span className=" font-bold text-gray-900">
                ₹ {product.price}
              </span>

              {product.originalPrice > product.price && (
                <>
                  <span className="  text-gray-400 line-through">
                    ₹ {product.originalPrice}
                  </span>

                  <span className="  font-semibold text-green-600">
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

            <div className="py-1">
              <h6 className="font-bold text-gray-500 mb-2">Select Size</h6>

              <div className="flex gap-2 flex-wrap ">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="border border-gray-400 text-gray-700 py-1 md:px-4 md:py-2 rounded hover:bg-gray-100 transition "
                    onClick={() =>
                      setSelectedSize((prev) => (prev === size ? "" : size))
                    }
                    style={{
                      minWidth: "55px",
                      backgroundColor:
                        selectedSize === size ? "green" : "white",
                      color: selectedSize === size ? "white" : "black",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-row gap-3 ">
              <button
                className="px-1 py md:px-3  md:py-2 bg-black text-gray-300  font-semibold w-full md:w-40"
                onClick={() =>addToCart(product)}
              >
                ADD TO CART
              </button>
              <button className="px-3 py-2 border border-black text-black font-semibold  w-40 ">
                BUY NOW
              </button>
            </div>

            <p className="space-y-3 text-gray-600 text-sm md:text-base mt-2">
              {product?.description}
            </p>

            <div className="space-y-4 text-gray-600 text-sm md:text-base">
              <p>
                Lightweight and easy to layer, it pairs effortlessly with jeans,
                chinos, or shorts for both casual
              </p>
              <p>
                Easy-care fabric allows for quick washing and minimal ironing
              </p>
              <p>Thoughtfully crafted for daily wear</p>
            </div>

            <div
              className="mb-4 p-3 mt-4"
              style={{
                background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
                borderRadius: "12px",
                border: "1px solid #dee2e6",
              }}
            >
              <div className="d-flex align-products-start mb-2">
                <span style={{ color: "#11998e", marginRight: "8px" }}>✓</span>
                <small className="text-secondary">100% Original product</small>
              </div>
              <div className="d-flex align-products-start mb-2">
                <span style={{ color: "#11998e", marginRight: "8px" }}>✓</span>
                <small className="text-secondary">
                  Cash on delivery available
                </small>
              </div>
              <div className="d-flex align-products-start mb-5">
                <span style={{ color: "#11998e", marginRight: "8px" }}>✓</span>
                <small className="text-secondary">
                  Easy return and exchange within 7 days
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
