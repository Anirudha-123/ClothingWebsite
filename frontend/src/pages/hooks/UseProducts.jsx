import React, { useEffect, useState } from "react";
import axios from "axios";

const UseProducts = (category) => {
    const [loading, setLoading] = useState(false);
    const [hasFeched, setHasfetched] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://clothingwebsitebackend.onrender.com/api/products/get?category=${category}`
        );

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

  return {products , loading, hasFeched};
};

export default UseProducts;
