import axios from "axios";
import { API_URL } from "../config/env.js";
import { getTokenFromLocalStorage } from "./auth.js";

const api = {
  get: async (url, params, headers) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await axios.get(`${API_URL}${url}`, {
        params,
        headers: {
          authentication: `Bearer ${token}`,
          ...headers,
        },
      });
      return response;
    } catch (error) {
      console.error("Error in API GET request: ", error);
      throw error;
    }
  },
  post: async (url, payload, headers) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await axios.post(`${API_URL}${url}`, payload, {
        headers: {
          authentication: `Bearer ${token}`,
          ...headers,
        },
      });
      return response;
    } catch (error) {
      console.error("Error in API POST request: ", error);
      throw error;
    }
  },
  delete: async (url, headers) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await axios.delete(`${API_URL}${url}`, {
        headers: {
          authentication: `Bearer ${token}`,
          ...headers,
        },
      });
      return response;
    } catch (error) {
      console.error("Error in API DELETE request: ", error);
      throw error;
    }
  },
};

export default api;
