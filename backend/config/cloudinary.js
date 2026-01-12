import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

cloudinary.config({

   cloud_name:process.env.CLOUDINARY_NAME,
   api_key:process.env.CLOUDINARY_API_KEY,
   api_secret:process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (localPath) => {

   try {

    if(!localPath){
      return null
    }

    const uploadFile  = await cloudinary.uploader.upload(localPath, {resource_type:"auto"})


    if(uploadFile) {

       fs.unlinkSync(localPath)
    }

    return uploadFile
    
   } catch (error) {

     console.error(error)
   
    fs.unlinkSync(localPath)

    return 
    
   }
}


export {uploadOnCloudinary}