import express from 'express'
import { addMultipleProduct, addSingleProduct, deleteSingleProduct, getAllProducts, getFeaturedProducts, updateProduct } from '../controllers/productController.js'

const router = express.Router()

router.post('/addSingleProduct' , addSingleProduct)
router.post('/addMultipleProducts',addMultipleProduct)
router.get('/featured',getFeaturedProducts)
router.get('/allProducts',getAllProducts)
router.delete('/deleteProduct/:id', deleteSingleProduct)
router.patch('/patchProduct/:id' , updateProduct)

export default router