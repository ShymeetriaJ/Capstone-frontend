import { useState } from 'react';
import { createProject } from '../services/projectService';
import './ProjectForm.css';

function ProjectForm({ onProjectCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const projectData = {
        name,
        description,
        status,
        dueDate: dueDate || undefined
      };

      await createProject(projectData);
      
      setName('');
      setDescription('');
      setStatus('To Do');
      setDueDate('');
      
      onProjectCreated();
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-form-container">
      <div className="form-header">
        <h3>Create New Project</h3>
        <p>Fill in the details to create your project</p>
      </div>

      {error && (
        <div className="form-error">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="project-name">
            Project Name <span className="required">*</span>
          </label>
          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Build Portfolio Website"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-description">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this project about?"
            required
            rows="3"
            className="form-textarea"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="project-status">Status</label>
            <select
              id="project-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="project-duedate">Due Date (Optional)</label>
            <input
              id="project-duedate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Creating...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Create Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;