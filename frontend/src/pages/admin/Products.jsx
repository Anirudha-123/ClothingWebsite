import React, { useEffect, useState } from "react";
import UseProducts from "../hooks/UseProducts";
import Spinner from "../../components/Spinner";
import axios from "axios";

const Products = () => {
  const { products, setProducts, loading, hasFeched } = UseProducts();

  const [edit, setEdit] = useState(null);
  const [preview, setPreview] = useState(null);



  const [formData, setFormaData] = useState({
    name: "",
    description: "",
    price: "",
    originalprice: "",
    category: "",
    subCategory: "",
  });

  const [photo, setPhoto] = useState(null)

  const handleChange = (e) => {
    setFormaData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {

    const file = e.target.files?.[0]

    if(file){
      setPhoto(file)
    }

        setPreview(URL.createObjectURL(file)); 

  }

  const handleEdit = (item) => {
    setEdit(item);

    setFormaData({ name: item.name || "", price: item.price || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProducts((prev) =>
      prev.map((p) => (p._id === edit._id ? { ...p,name: formData.name,
          price: formData.price,
          img: preview || p.img, } : p)),
    );

    setEdit(null);

    try {


       const data = new FormData();

       data.append("name", formData.name)
       data.append("price", formData.price)
       data.append("img", photo)

      const response = await axios.put(
        `http://localhost:8080/api/products/${edit._id}`,
        data,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );

      setEdit(null);

      setFormaData({ name: "", price: "" });
      alert("product update successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 min-h-screen pt-20 py-20">
      {loading && <Spinner></Spinner>}

      {!loading && hasFeched && products.length === 0 && (
        <h3>Product not found</h3>
      )}
      {!loading && hasFeched && products.length > 0 && (
        <>
          {" "}
          <table className="min-w-full border border-gray-300 border-collapse">
            <thead className="bg-gray-100">
              <tr className="divide-x divide-gray-300">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Original Price</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">subCategory</th>
                <th className="px-4 py-2">Edit Status</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {products.map((i) => (
                <>
                  <tr className="divide-x divide-gray-300 text-center">
                    {edit?._id === i._id ? (
                      <>
                        <td className="px-1 py-2 flex items-center justify-center ">

                           <img
    src={preview || i.img}
    alt="preview"
    className="h-20 w-20 object-contain border"
  />


                          <input type="file" onChange={handlePhotoChange}  />
                          
                        </td>

                        <td className="">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="px-2 py-2 border-2 border-gray-200"
                          />
                        </td>

                        <td>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="px-4 py-2 border-2 border-gray-200"
                          />
                        </td>

                        <td className="px-4 py-2">{i.originalPrice}</td>
                        <td className="px-4 py-2">{i.category}</td>
                        <td className="px-4 py-2">{i.subCategory}</td>

                        <td className="px-4 py-2 w-30 text-green-700 cursor-pointer">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 w-full"
                          >
                            Save
                          </button>
                        </td>
                        <td className="px-4 py-2 w-30 text-green-700 cursor-pointer">
                          <button
                            onClick={() => setEdit(null)}
                            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 w-full"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-1 py-2 flex items-center justify-center ">
                          <img
                            src={i.img}
                            alt=""
                            className="h-30 w-20  object-contain   "
                          />
                        </td>
                        <td className="px-4 py-2">{i.name}</td>

                        <td className="px-4 py-2">{i.price}</td>
                        <td className="px-4 py-2">{i.originalPrice}</td>
                        <td className="px-4 py-2">{i.category}</td>
                        <td className="px-4 py-2">{i.subCategory}</td>
                        <td className="px-4 py-2 w-30 text-green-700 cursor-pointer">
                          <button
                            onClick={() => handleEdit(i)}
                            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 w-full"
                          >
                            Update
                          </button>
                        </td>
                        <td className="px-4 py-2 text-red-600 cursor-pointer">
                          delete
                        </td>
                      </>
                    )}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Products;
