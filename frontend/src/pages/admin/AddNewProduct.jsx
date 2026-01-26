import axios from "axios";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const AddNewProduct = () => {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fileKey, setFileKey] = useState(Date.now());
  const [loading, setLoading] = useState(false);

  const [formData, setFormdata] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subCategory: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.originalPrice ||
      !formData.category ||
      !formData.subCategory ||
      !formData.description.trim()
    ) {
      toast.error("Please fill all fields!");
      return; // stop submission
    }

    if (!photo) {
      toast.error("Please select a product image!");
      return; // stop submission
    }

    setLoading(true);

    try {
      const data = new FormData();

      (data.append("name", formData.name),
        data.append("price", formData.price),
        data.append("originalPrice", formData.originalPrice),
        data.append("category", formData.category),
        data.append("subCategory", formData.subCategory));
      data.append("description", formData.description);

      data.append("img", photo);

      const response = await axios.post(
        "http://localhost:8080/api/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        setFormdata({
          name: "",
          description: "",
          price: "",
          originalPrice: "",
          category: "",
          subCategory: "",
        });

        setPhotoPreview(null);
        setPhoto(null);

        setFileKey(Date.now());
      }

      toast.success("product added successfully");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 w-full bg-gray-100 min-h-screen pt-20">
      {loading ? (
        <Spinner text="Adding product..." color="black" />
      ) : (
        <>
          <div className="form flex justify-center w-full items-center   py-6 pb-10 ">
            <form
              action=""
              onSubmit={handleSubmit}
              className="shadow-sm p-10 w-full max-w-3xl  mx-auto bg-white rounded-2xl "
            >
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name here..."
                  className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400  outline-none rounded-md w-full"
                />
              </div>

              <div className="mb-3 ">
                <div className="flex flex-rows w-full gap-3 ">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter product price here..."
                    className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400  outline-none rounded-md w-full"
                  />

                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="Enter product original price here..."
                    className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400  outline-none rounded-md w-full"
                  />
                </div>
              </div>

              <div className="mb-3 ">
                <div className="flex flex-rows w-full gap-3 ">
                  <select
                    name="category"
                    value={formData.category}
                    id=""
                    className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400  outline-none rounded-md w-full"
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="mens">Mens</option>
                    <option value="womens">Womens</option>
                    <option value="kids">Kids</option>
                  </select>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    id=""
                    className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400  outline-none rounded-md w-full"
                    onChange={handleChange}
                  >
                    <option value="">Select SubCategory</option>
                    <option value="shirt">Shirt</option>
                    <option value="kurta">Kurta</option>
                    <option value="jeans">Jeans</option>
                    <option value="t-shirt">T-shirt</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex flex-row gap-3 border border-gray-200 outline-none p-3">
                  <div className="h-30 w-32 border-2 border-gray-200 rounded overflow-hidden flex items-center justify-center bg-gray-100">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <FaUserCircle className="h-20 w-20 text-gray-400 p-2" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="border-2 border-dotted border-gray-400 h-30 w-full flex flex-col items-center justify-center text-center cursor-pointer relative bg-gray-50 hover:bg-gray-100 rounded">
                      <input
                        type="file"
                        key={fileKey}
                        onChange={handlePhotoChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <p className="text-gray-500 font-medium">
                        Click to upload
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        JPG / PNG format only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe product details here..."
                  className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400  outline-none rounded-md w-full"
                ></textarea>
              </div>

              <div className="mb-3">
                <button
                  className={`px-3 py-2  ${loading ? `bg-blue-400` : `bg-blue-500`} hover:bg-blue-600 w-full  rounded-md text-white`}
                  disabled={loading}
                >
                  {loading ? "Adding Product..." : "Add New Product"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AddNewProduct;
