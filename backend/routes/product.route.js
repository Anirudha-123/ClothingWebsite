import express from 'express'
import { addProduct, getAllProducts, getProductById } from '../controllers/product.controller.js'
import { upload } from '../middlewares/multer.js'

//rk
const route = express.Router()

route.post("/" ,  upload.single("img")   ,addProduct)
route.get("/get" , getAllProducts)
route.get("/:id" , getProductById)


export default route