import api from '../setup/helpers/apiService.js';

export const getAllBlogs = async () => {
    try{
       const response = await api.get(`/api/blog/`);
       return response.data;
    }catch(error){
        console.error("Error getting All Blogs: ", error)
        throw error;
    }
}