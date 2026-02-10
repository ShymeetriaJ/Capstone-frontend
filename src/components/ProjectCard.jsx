import { useState } from 'react';
import TaskList from './TaskList';
import EditProjectForm from './EditProjectForm';
import './ProjectCard.css';

function ProjectCard({ project, onUpdate, onRefresh }) {
  const [editingProject, setEditingProject] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleProjectUpdated = () => {
    onUpdate();
    setEditingProject(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-progress';
      case 'To Do': return 'status-todo';
      default: return 'status-default';
    }
  };

  const isOverdue = () => {
    if (!project.dueDate || project.status === 'Completed') return false;
    return new Date(project.dueDate) < new Date();
  };

  const isDueSoon = () => {
    if (!project.dueDate || project.status === 'Completed') return false;
    const today = new Date();
    const due = new Date(project.dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  return (
    <>
      <div className={`project-card ${isOverdue() ? 'overdue' : ''} ${isDueSoon() ? 'due-soon' : ''}`}>
        <div className="project-card-header">
          <div className="project-info">
            <h3 className="project-title">{project.name}</h3>
            <p className="project-description">{project.description}</p>
          </div>
          <button className="edit-btn" onClick={() => setEditingProject(project)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="project-meta">
          <span className={`status-badge ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          {project.dueDate && (
            <div className="due-date">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{new Date(project.dueDate).toLocaleDateString()}</span>
              {isOverdue() && <span className="overdue-badge">Overdue</span>}
              {isDueSoon() && !isOverdue() && <span className="due-soon-badge">Due Soon</span>}
            </div>
          )}
        </div>

        <button className="expand-btn" onClick={() => setIsExpanded(!isExpanded)}>
          <span>Tasks</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
          >
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {isExpanded && (
          <div className="tasks-container">
            <TaskList projectId={project._id} onRefresh={onRefresh} />
          </div>
        )}
      </div>

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onUpdate={handleProjectUpdated}
        />
      )}
    </>
  );
}

export default ProjectCard;