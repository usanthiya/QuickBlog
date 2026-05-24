import api from '../setup/helpers/apiService.js';

export const getAllBlogsAdmin = async () => {
    try {
        const response = await api.get(`/api/admin/blogs`);
        return response.data;
    } catch(error) {
        console.error("Error getting admin blogs: ", error);
        throw error;
    }
}

export const getAllCommentsAdmin = async () => {
    try {
        const response = await api.get(`/api/admin/comments`);
        return response.data;
    } catch(error) {
        console.error("Error getting admin comments: ", error);
        throw error;
    }
}

export const approveCommentAdmin = async (id) => {
    try {
        const response = await api.post(`/api/admin/approve-comment`, { id });
        return response.data;
    } catch(error) {
        console.error("Error approving comment: ", error);
        throw error;
    }
}

export const deleteCommentAdmin = async (id) => {
    try {
        const response = await api.post(`/api/admin/delete-comment`, { id });
        return response.data;
    } catch(error) {
        console.error("Error deleting comment: ", error);
        throw error;
    }
}
