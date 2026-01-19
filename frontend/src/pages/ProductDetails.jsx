import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState({});

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

  if (loading) {
    return (
      <h3
        className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-gray-800 "
        style={{ minHeight: "300px" }}
      >
        Loading...
      </h3>
    );
  }


  return (
    <>
      <div className="container mx-auto px-5 mt-25">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="flex lg:flex-col gap-1 order-2 lg:order-1 h-full">
              {images.map((i, index) => (
                <img
                  key={index}
                  src={i}
                  alt="thumb"
                  className="w-full h-39 sm:w-24 sm:h-32 lg:w-56  lg:h-51
                       object-cover cursor-pointer border
                       hover:border-black transition"
                  onMouseEnter={(e) => setBgImg(e.target.src)}
                />
              ))}
            </div>

            <div className="flex order-1 ">
              <img
                src={bgimg}
                alt="product"
                className="w-full max-h-[88vh] md:h-220 object-cover "
              />
            </div>
          </div>

          <div className="details flex flex-col justify-h-full ">
            <h5 className="text-2xl font-semibold text-black mb-2">
              {product?.name}
            </h5>

            <p className="text-gray-600 mb-4">{product?.description}</p>

            <p className="text-xl font-bold text-black">₹{product?.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
