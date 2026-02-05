import api from './api';

// get all my projects
export const getProjects = async (filters = {}) => {
  try {
    // query string
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
    const url = queryString ? `/api/projects?${queryString}` : '/api/projects';
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error.response?.data || error.message);
    throw error;
  }
};

// get one project using id
export const getProjectById = async (projectId) => {
  try {
    const response = await api.get(`/api/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error.response?.data || error.message);
    throw error;
  }
};

// creat a new pj
export const createProject = async (projectData) => {
  try {
    const response = await api.post('/api/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response?.data || error.message);
    throw error;
  }
};

// update my project
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/api/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error.response?.data || error.message);
    throw error;
  }
};

// delete my project
export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/api/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error.response?.data || error.message);
    throw error;
  }
};