import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjectById } from '../services/projectService';
import TaskList from '../components/TaskList';
import EditProjectForm from '../components/EditProjectForm';

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const data = await getProjectById(projectId);
      setProject(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectUpdated = () => {
    loadProject();
    setEditingProject(null);
  };

  const handleProjectDeleted = () => {
    navigate('/dashboard');
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;
  if (!project) return <div className="page-container"><p>Project not found</p></div>;

  return (
    <div className="page-container">
      <Link to="/dashboard">← Back to Dashboard</Link>

      <div style={{ border: '2px solid #1976d2', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            {project.dueDate && (
              <p><strong>Due:</strong> {new Date(project.dueDate).toLocaleDateString()}</p>
            )}
          </div>
          <button onClick={() => setEditingProject(project)}>Edit</button>
        </div>
      </div>

      <TaskList projectId={project._id} />

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdate={handleProjectUpdated}
          onDelete={handleProjectDeleted}
        />
      )}
    </div>
  );
}

export default ProjectDetail;