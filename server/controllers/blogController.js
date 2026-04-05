import fs from 'fs';
import imagekit from '../config/imageKit.js';

const addBlog = async (req, res) => {
    const result ={
        sucess: true,
        message: "Blog added successfully",
        data: null
    }
    try{
       const { title, subTitle, description, category, isPublished } = req.body;
       const { imageFile } = req.file;

       if(!title || !description || !category || !imageFile){
        throw new Error("Missing required fields");
       }

       const fileBuffer = fs.readFileSync(imageFile.path);
       const fileName = `${imageFile.originalname}_${Date.now()}`;

       // Upload image to ImageKit
       const response = await imagekit.upload({
        file: fileBuffer,
        fileName,
        folder: "/blogs"
       })
    }catch(error){
        console.log("Error in add blog", error.message);
        res.json({ 
            sucess: false,
            message: error.message 
        });
    }
}