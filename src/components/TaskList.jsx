import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';
import TaskFilter from './TaskFilter';

function TaskList({ projectId, onRefresh }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('');

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

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <h3>Tasks ({tasks.length})</h3>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      {showForm && (
        <TaskForm projectId={projectId} onTaskCreated={handleTaskCreated} />
      )}

      {tasks.length === 0 && !showForm ? (
        <p>No tasks yet.</p>
      ) : (
        <div>
          {tasks.map(task => (
            <div key={task._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
              <div>
                <h4>
                  {task.title}
                  {isDueSoon(task.dueDate) && task.status !== 'Completed' && (
                    <span className="pulse-red" style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#f44336',
                      display: 'inline-block',
                      marginLeft: '10px'
                    }} />
                  )}
                </h4>
                <p>{task.description}</p>
                <p><strong>Status:</strong> {task.status}</p>
                {task.dueDate && (
                  <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                )}
                <button onClick={() => setEditingTask(task)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingTask && (
        <EditTaskForm
          task={editingTask}
          projectId={projectId}
          onClose={() => setEditingTask(null)}
          onUpdate={handleTaskUpdated}
        />
      )}
    </div>
  );
}

export default TaskList;