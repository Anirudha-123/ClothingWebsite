import React, { useEffect, useState } from "react";
import axios from "axios";

const UseProducts = (category) => {
    const [loading, setLoading] = useState(false);
    const [hasFeched, setHasfetched] = useState(false);
  const [products, setProducts] = useState([]);

  const url = category 
  ? `https://clothingwebsitebackend.onrender.com/api/products/get?category=${category}`
  : `https://clothingwebsitebackend.onrender.com/api/products/get`;


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await axios.get(url);

        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
        setHasfetched(true)
      }
    };

    fetchProducts();
  }, [category]);

  return {products , loading, hasFeched, setProducts};
};

export default UseProducts;
