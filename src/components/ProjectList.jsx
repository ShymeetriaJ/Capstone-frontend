import { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import ProjectForm from './ProjectForm';

function ProjectList({ onRefresh }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = () => {
    loadProjects(); 
    setShowForm(false);
    if (onRefresh) onRefresh(); 
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2>Your Projects ({projects.length})</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {showForm && <ProjectForm onProjectCreated={handleProjectCreated} />}
      
      {projects.length === 0 && !showForm ? (
        <p>No projects yet. Create your first project!</p>
      ) : (
        <div>
          {projects.map(project => (
            <div 
              key={project._id} 
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '4px'
              }}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Status:</strong> {project.status}
              </p>
              {project.dueDate && (
                <p>
                  <strong>Due:</strong> {new Date(project.dueDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;