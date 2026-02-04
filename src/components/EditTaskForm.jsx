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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px'
      }}>
        <h3>Edit Task</h3>

        <form onSubmit={handleUpdate}>
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

          <div style={{ marginTop: '15px' }}>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              style={{ backgroundColor: '#d32f2f', color: 'white' }}
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