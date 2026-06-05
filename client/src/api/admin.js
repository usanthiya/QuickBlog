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

export const generateBlogAdmin = async (title) => {
    try {
        const response = await api.post(`/api/admin/blogs/generate`, { title });
        return response.data;
    } catch(error) {
        console.error("Error generating blog content: ", error);
        throw error;
    }
}
export const fetchAllUsers = async () => {
  try {
    const response = await api.get(`/api/admin/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/api/admin/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
