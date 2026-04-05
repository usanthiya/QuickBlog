import { API_URL } from '../setup/config/env';
import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (name, email, password, mobile) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/signup`, { name, email, password, mobile });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};
