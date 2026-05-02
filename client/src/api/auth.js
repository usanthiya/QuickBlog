import api from '../setup/helpers/apiService.js';

export const login = async (email, password) => {
  try {
    const response = await api.post(`/api/admin/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (name, email, password, mobile) => {
  try {
    const response = await api.post(`/api/admin/signup`, { name, email, password, mobile });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};
