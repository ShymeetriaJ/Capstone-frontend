import { useState } from 'react';
import { updateTask, deleteTask } from '../services/taskService';

function EditTaskForm({ task, projectId, onClose, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split('T')[0] : ''
  );
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateTask(projectId, task._id, { title, description, status, dueDate });
      onUpdate();
      onClose();
    } catch (err) {
      alert('Failed to update task');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    setLoading(true);
    try {
      await deleteTask(projectId, task._id);
      onUpdate();
      onClose();
    } catch (err) {
      alert('Failed to delete task');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Edit Task</h3>
          <button className="modal-close" onClick={onClose} disabled={loading}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleUpdate} className="modal-form">
          <div className="form-group">
            <label htmlFor="task-title" style={{ 
              fontWeight: '500', 
              color: 'var(--text-primary)',
              marginBottom: '8px',
              display: 'block'
            }}>
              Title:
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description" style={{ 
              fontWeight: '500', 
              color: 'var(--text-primary)',
              marginBottom: '8px',
              display: 'block'
            }}>
              Description:
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
              className="form-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-status" style={{ 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                marginBottom: '8px',
                display: 'block'
              }}>
                Status:
              </label>
              <select
                id="task-status"
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
              <label htmlFor="task-duedate" style={{ 
                fontWeight: '500', 
                color: 'var(--text-primary)',
                marginBottom: '8px',
                display: 'block'
              }}>
                Due Date:
              </label>
              <input
                id="task-duedate"
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
                {loading ? 'Saving...' : 'Save'}
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
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



export default EditTaskForm;