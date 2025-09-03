import { API_PATHS } from "./apiPath";
import axiosInstance from "./Axiosinstance";

const uploadImage= async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    try{
       
        const response= await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE , formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        
       

        return response.data.imageUrl; // Assuming the response contains the image URL
       
    }
    catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }

    

};

export default uploadImage;