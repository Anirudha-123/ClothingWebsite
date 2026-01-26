import mongoose from "mongoose";



const productSchema = mongoose.Schema({
 
     name:{type:String , required:true ,trim:true},
     description:{type:String , required:true ,trim:true},
     price:{type:Number , required:true},
     originalPrice:{type:Number },
     img:{type:String , required:true },
     category:{
          type:String,
          required:true,
          enum:["mens","womens","kids"]
     },
     subCategory:{

          type:String,
          required:true
     },

      
    

},{timestamps:true})


const Product = mongoose.model('Product' , productSchema)


export default Product