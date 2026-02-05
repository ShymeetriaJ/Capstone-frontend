import api from './api';

// register me
export const register = async (userData) => {
  try {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

// log me in first 
export const login = async (credentials) => {
  try {
    const response = await api.post('/api/users/login', credentials);
    
    // token saved
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

// log me out
export const logout = () => {
  localStorage.removeItem('token');
};

// my profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/api/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};

// update my nickname
export const updateDashboardNickname = async (nickname) => {
  try {
    const response = await api.put('/api/users/nickname', { 
      dashboardNickname: nickname 
    });
    return response.data;
  } catch (error) {
    console.error('Error updating nickname:', error.response?.data || error.message);
    throw error;
  }
};

// authentication
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};