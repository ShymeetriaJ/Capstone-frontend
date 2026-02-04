import { useState } from 'react';
import { createTask } from '../services/taskService';

function TaskForm({ projectId, onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTask(projectId, { title, description, status, dueDate });
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setDueDate('');
      onTaskCreated();
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      marginBottom: '15px',
      borderRadius: '4px',
      backgroundColor: '#f5f5f5'
    }}>
      <h4>New Task</h4>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="2"
          />
        </div>

        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;