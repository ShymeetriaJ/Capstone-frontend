import api from './api';

export const getRecentActivities = async (limit = 10) => {
  try {
    const response = await api.get(`/api/activities/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent activities:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllActivities = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(`/api/activities?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all activities:', error.response?.data || error.message);
    throw error;
  }
};