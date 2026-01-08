import Product from "../models/product.js"



const  addSingleProduct = async (req,res) => {
  
  try {
     

       const {name , description , price ,image}   = req.body


       if (!name || !description || !price || !image) {
        
        res.json({message:"all fields are required"})
       }
    

        const newProduct = new Product({name , description , price,image})

        await newProduct.save()

        res.json({message:'product added successfully' ,product:newProduct})
        

  } catch (error) {
    
    console.error(error)
  }
}


const addMultipleProduct = async (req,res) => {
  
  try {

      const products  =  req.body

      if (!Array.isArray(products) || products.length === 0) {
           res.json({message:"product array required"})
      }


    const newProducts =    await Product.insertMany(products)

        res.json({message:"all products added successfully " , products:newProducts})
                   
  } catch (error) {
    
    console.error(error)
  }
}



const getFeaturedProducts = async (req, res) => {
  
   try {

       const featured =    await Product.find({featured:true}).limit(10)

       res.json({message:"featured products",featured})
    
   } catch (error) {
    
    console.error(error)
   }
}

const getAllProducts = async (req,res) => {
  
  try {
     
    const products = await Product.find()

    res.json(products)
    
  } catch (error) {
    
    console.error(error)
  }
}


const updateProduct = async (req,res) => {
  
  try {

     const products =     req.body


     const update  =   await Product.findByIdAndUpdate(req.params.id , {$set : products} , {new:true})

    res.json({message:"product update successfully" ,product:update})
    
  } catch (error) {
    
    console.error(error)
  }
}

const deleteSingleProduct = async (req,res) => {
  
  try {
   const deleteProduct =  await Product.findByIdAndDelete(req.params.id)

   res.json({message:"product delete successfully" , deleteProduct})
    
  } catch (error) {
    
    console.error(error)
  }
}

export {addSingleProduct , addMultipleProduct ,getFeaturedProducts ,getAllProducts , deleteSingleProduct ,updateProduct}