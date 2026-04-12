import { API_URL } from '../setup/config/env';
import axios from 'axios';


export const getAllBlogs = async () => {
    try{
       const response = await axios.get(`${API_URL}/api/blog/`);
       return response.data;
    }catch(error){
        console.error("Error getting All Blogs: ", error)
        throw error;
    }
}