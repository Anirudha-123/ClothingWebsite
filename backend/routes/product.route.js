import express from 'express'
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller.js'
import { upload } from '../middlewares/multer.js'

//rk
const route = express.Router()

route.post("/" ,  upload.single("img")   ,addProduct)
route.put("/:id", upload.single("img") ,updateProduct)
route.get("/get" , getAllProducts)
route.get("/:id" , getProductById)
route.delete("/delete/:id" , deleteProductById)


export default route