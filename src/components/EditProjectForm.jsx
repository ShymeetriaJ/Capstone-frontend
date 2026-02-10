import { useState } from 'react';
import { updateProject, deleteProject } from '../services/projectService';
import './EditProjectForm.css';

function EditProjectForm({ project, onClose, onUpdate, onDelete }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const [dueDate, setDueDate] = useState(
    project.dueDate ? project.dueDate.split('T')[0] : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateProject(project._id, { name, description, status, dueDate });
      onUpdate();
      onClose();
    } catch (err) {
      setError('Failed to update project');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${project.name}"? This will also delete all tasks in this project.`)) return;

    setLoading(true);
    try {
      await deleteProject(project._id);
      if (onDelete) {
        onDelete();
      } else {
        onUpdate();
        onClose();
      }
    } catch (err) {
      alert('Failed to delete project');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Project</h3>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
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

        <form onSubmit={handleUpdate} className="modal-form">
          <div className="form-group">
            <label htmlFor="edit-name">Project Name</label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
              className="form-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-status">Status</label>
              <select
                id="edit-status"
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
              <label htmlFor="edit-duedate">Due Date</label>
              <input
                id="edit-duedate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="modal-actions">
            <div className="actions-left">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={onClose} disabled={loading} className="btn-secondary">
                Cancel
              </button>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="btn-danger"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectForm;