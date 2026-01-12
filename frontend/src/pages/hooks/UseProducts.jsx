import React, { useEffect, useState } from "react";
import axios from "axios";

const UseProducts = (category) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/get?category=${category}`
        );

        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [category]);

  return products;
};

export default UseProducts;
