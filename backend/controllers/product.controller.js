import { uploadOnCloudinary } from "../config/cloudinary.js";
import Product from "../models/product.model.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory,originalPrice, quantity } = req.body;


    if (!name || !description || !price || !category || !subCategory) {
      res.status(400).json({ message: "all fields are required" });
    }

    const localFilePath = req.file?.path;


    if (!localFilePath) {
      res.status(404).json({ message: "img not found" });
    }

    const img = await uploadOnCloudinary(localFilePath);

   if (!img || !img.url) {
      return res.status(500).json({
        message: "error while uploading image to cloudinary",
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,
      img: img.secure_url,
      originalPrice,
      quantity
    });

    res
      .status(201)
      .json({ message: "product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: `server error ${error.message}`,
        status: error.status,
        error,
      });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const updateData = { name, price };

    if (req.file?.path) {
      const img = await uploadOnCloudinary(req.file.path);

      if (!img?.secure_url) {
        return res.status(500).json({
          message: "error while uploading image",
        });
      }

      updateData.img = img.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json({
      message: "product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};


const getAllProducts = async (req, res) => {
  try {


     const {category } = req.query



     const filter = {}

     if(category) filter.category = category

    const products = await Product.find(filter);




    if (!products) {
      res.status(404).json({ message: "product not found" });
    }

    res
      .status(200)
      .json({ message: "all products fetched successfully", products });
  } catch (error) {
    console.error(error);
  }
};


const getProductById = async (req,res) => {
  
  try {

    const product = await Product.findById(req.params.id)

    if(!product){

      res.status(200).json({message:"product  not found" })
    } 
    
     res.status(200).json({message:"product fetched successfully" , product})
    
  } catch (error) {
    
    console.error(error)
  }
}


 const deleteProductById  = async (req, res) => {
  
  try {

  const product =    await Product.findByIdAndDelete(req.params.id)


  if(!product){

    res.status(404).json({message:"product not found to delete"})
  }


  res.status(201).json({message:"product deleted successfully"})



    
  } catch (error) {
    
    console.error(error)
  }
}

export { addProduct, getAllProducts ,getProductById, deleteProductById , updateProduct};
