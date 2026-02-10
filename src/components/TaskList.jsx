import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import EditTaskForm from './EditTaskForm';
import './TaskList.css';

function TaskList({ projectId, onRefresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [projectId, filter]);

  const loadTasks = async () => {
    try {
      let filterParams = {};
      
      if (filter === 'overdue') {
        filterParams.overdue = true;
      } else if (filter) {
        filterParams.status = filter;
      }

      const data = await getTasks(projectId, filterParams);
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    loadTasks();
    setShowForm(false);
    if (onRefresh) onRefresh();
  };

  const handleTaskUpdated = () => {
    loadTasks();
    setEditingTask(null);
    if (onRefresh) onRefresh();
  };

  const isDueSoon = (task) => {
    if (!task.dueDate || task.status === 'Completed') return false;
    const today = new Date();
    const due = new Date(task.dueDate);
    const diffMs = due - today;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'task-status-completed';
      case 'In Progress': return 'task-status-progress';
      case 'To Do': return 'task-status-todo';
      default: return '';
    }
  };

  if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Loading tasks...</p>;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h3 className="task-list-title">
          Tasks ({tasks.length})
        </h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-add-task"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      {showForm && <TaskForm projectId={projectId} onTaskCreated={handleTaskCreated} />}

      {tasks.length === 0 && !showForm ? (
        <div className="tasks-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No tasks yet.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <div key={task._id} className="task-card">
              <div className="task-card-header">
                <div className="task-title-row">
                  {isDueSoon(task) && <span className="pulse-dot"></span>}
                  <h4 className="task-title">{task.title}</h4>
                </div>
                <button 
                  className="task-edit-btn"
                  onClick={() => setEditingTask(task)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <p className="task-description">{task.description}</p>
              
              <div className="task-meta">
                <span className={`task-status ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                {task.dueDate && (
                  <span className="task-due-date">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editingTask && (
        <EditTaskForm
          projectId={projectId}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdate={handleTaskUpdated}
        />
      )}
    </div>
  );
}

export default TaskList;