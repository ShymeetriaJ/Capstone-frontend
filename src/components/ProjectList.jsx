import { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import ProjectForm from './ProjectForm';
import EditProjectForm from './EditProjectForm';

function ProjectList({ onRefresh }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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
  const handleProjectUpdated = () => {
    loadProjects();
    setEditingProject(null);
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
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start'
              }}>
                <div style={{ flex: 1 }}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p>
                    <strong>Status:</strong> {project.status}
                  </p>
                  {project.dueDate && (
                    <p>
                      <strong>Due:</strong>{' '}
                      {new Date(project.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <button onClick={() => setEditingProject(project)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdate={handleProjectUpdated}
        />
      )}
    </div>
  );
}

export default ProjectList;
