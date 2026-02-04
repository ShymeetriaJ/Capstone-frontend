import { useState } from 'react';
import { createProject } from '../services/projectService';

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
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '20px', 
      marginBottom: '20px',
      borderRadius: '4px'
    }}>
      <h3>Create New Project</h3>
      
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Status:</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Due Date (optional):</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;