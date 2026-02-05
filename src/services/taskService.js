import api from './api';


export const getTasks = async (projectId, filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.status) {
      queryParams.append('status', filters.status);
    }
    
    if (filters.dueSoon) {
      queryParams.append('dueSoon', 'true');
    }
    
    if (filters.overdue) {
      queryParams.append('overdue', 'true');
    }
    
    const queryString = queryParams.toString();
    const url = queryString 
      ? `/api/projects/${projectId}/tasks?${queryString}` 
      : `/api/projects/${projectId}/tasks`;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error.response?.data || error.message);
    throw error;
  }
};

export const createTask = async (projectId, taskData) => {
  try {
    const response = await api.post(`/api/projects/${projectId}/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error.response?.data || error.message);
    throw error;
  }
};

export const updateTask = async (projectId, taskId, taskData) => {
  try {
    const response = await api.put(`/api/projects/${projectId}/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteTask = async (projectId, taskId) => {
  try {
    const response = await api.delete(`/api/projects/${projectId}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error.response?.data || error.message);
    throw error;
  }
};