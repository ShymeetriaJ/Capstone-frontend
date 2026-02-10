import { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import ProjectForm from './ProjectForm';
import ProjectFilter from './ProjectFilter';
import ProjectCard from './ProjectCard';

function ProjectList({ onRefresh }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
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
    if (onRefresh) onRefresh();
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
          Your Projects ({projects.length})
        </h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'var(--primary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      <ProjectFilter currentFilter={filter} onFilterChange={setFilter} />

      {error && <p className="error">{error}</p>}

      {showForm && <ProjectForm onProjectCreated={handleProjectCreated} />}

      {projects.length === 0 && !showForm ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: 'var(--surface)',
          border: '2px dashed var(--border)',
          borderRadius: 'var(--radius-lg)',
          color: 'var(--text-secondary)'
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 16px', opacity: 0.5 }}>
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>No projects found</h3>
          <p>Create your first project to get started!</p>
        </div>
      ) : (
        <div>
          {projects.map(project => (
            <ProjectCard
              key={project._id}
              project={project}
              onUpdate={handleProjectUpdated}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;