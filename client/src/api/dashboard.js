import api from "../setup/helpers/apiService";

export const getDashboardStats = async () => {
    try{
        const response = await api.get(`/api/admin/dashboard`);
        return response.data;
    }catch(error){
        console.error("Error getting Dashboard Stats: ", error);
        throw error;
    }
}