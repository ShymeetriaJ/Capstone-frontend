import { useState } from 'react';
import { createTask } from '../services/taskService';
import './TaskForm.css';

function TaskForm({ projectId, onTaskCreated }) {
  const [title, setTitle] = useState('');
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
      const taskData = {
        title,
        description,
        status,
        dueDate: dueDate || undefined
      };

      await createTask(projectId, taskData);
      
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setDueDate('');
      
      onTaskCreated();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h4>Add New Task</h4>
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

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Design homepage mockup"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What needs to be done?"
            required
            rows="2"
            className="form-textarea"
          />
        </div>

        <div className="task-form-row">
          <div className="form-group">
            <label htmlFor="task-status">Status</label>
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
            <label htmlFor="task-duedate">Due Date</label>
            <input
              id="task-duedate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="task-form-actions">
          <button type="submit" disabled={loading} className="btn-task-primary">
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                Adding...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Add Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;