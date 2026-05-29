 import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
 const uploadOnCloudinary = async (filePath)=>{

     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

try {
      const uploadResult = await cloudinary.uploader
       .upload(filePath)
       try {
           fs.unlinkSync(filePath)
       } catch (unlinkErr) {
           console.error("Failed to delete temp file:", unlinkErr)
       }

       return uploadResult.secure_url
} catch (error) {
         try {
             fs.unlinkSync(filePath)
         } catch (unlinkErr) {
             console.error("Failed to delete temp file on error:", unlinkErr)
         }
         console.error("Cloudinary upload failed:", error)
         return null
}

 }
  
 export default uploadOnCloudinary