import mongoose from "mongoose";



const productSchema = mongoose.Schema({
 
     name:{type:String , required:true ,trim:true},
     description:{type:String , required:true ,trim:true},
     price:{type:Number , required:true},
     image:{type:String , required:true },
     featured:{type:Boolean, default:false}
    

},{timestamps:true})


const Product = mongoose.model('Product' , productSchema)


export default Product