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

export const addBlog = async (blogData) => {
    try{
        const response = await api.post(`/api/blog/add`, blogData);
        return response.data;
    } catch(error){
        console.error("Error adding blog: ", error);
        throw error;
    }
}

export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/api/blog/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting Blog By Id: ", error);
        throw error;
    }
}

export const getBlogComments = async (blogId) => {
    try {
        const response = await api.post(`/api/blog/comments`, { blogId });
        return response.data;
    } catch (error) {
        console.error("Error getting blog comments: ", error);
        throw error;
    }
}

export const addComment = async (commentData) => {
    try {
        const response = await api.post(`/api/blog/add-comments`, commentData);
        return response.data;
    } catch (error) {
        console.error("Error adding comment: ", error);
        throw error;
    }
}

export const deleteBlogById = async (id) => {
    try {
        const response = await api.delete(`/api/blog/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting blog: ", error);
        throw error;
    }
}

export const togglePublish = async (id, isPublished) => {
    try {
        const response = await api.post(`/api/blog/toggle-publish`, { id, isPublished });
        return response.data;
    } catch (error) {
        console.error("Error toggling publish: ", error);
        throw error;
    }
}