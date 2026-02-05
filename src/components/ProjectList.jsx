import { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import ProjectForm from './ProjectForm';
import EditProjectForm from './EditProjectForm';
import TaskList from './TaskList';
import ProjectFilter from './ProjectFilter';
import { Link } from 'react-router-dom';

function ProjectList({ onRefresh }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadProjects();
  }, [filter]);

  const loadProjects = async () => {
    try {
      let filterParams = {};

      if (filter === 'overdue') {
        filterParams.overdue = true;
      } else if (filter === 'dueSoon') {
        filterParams.dueSoon = true; 
      } else if (filter) {
        filterParams.status = filter;
      }

      const data = await getProjects(filterParams);
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

      <ProjectFilter currentFilter={filter} onFilterChange={setFilter} />

      {error && <p className="error">{error}</p>}

      {showForm && <ProjectForm onProjectCreated={handleProjectCreated} />}

      {projects.length === 0 && !showForm ? (
        <p>No projects yet.</p>
      ) : (
        <div>
          {projects.map(project => (
            <div
              key={project._id}
              style={{
                border: '1px solid #ddd',
                padding: '20px',
                marginBottom: '15px',
                borderRadius: '8px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start'
              }}>
                <div style={{ flex: 1 }}>
                  <h3>
                    <Link 
                     to={`/projects/${project._id}`}
                     style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                     {project.name}
                    </Link>
                  </h3>
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
              <TaskList projectId={project._id} onRefresh={onRefresh} />
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
