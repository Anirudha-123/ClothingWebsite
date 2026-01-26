

import multer from "multer"
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "..", "..", "public", "temp");

const storage  =  multer.diskStorage({


  destination: function( req, file , cb){

     cb(null , uploadPath)
  },

  filename: function (req,file,cb) {
    
    // console.log("file :", file)
    cb(null, file.originalname)
  }

})


export const upload = multer({storage})