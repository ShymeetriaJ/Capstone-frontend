import './ProjectFilter.css';

function ProjectFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { value: '', label: 'All Projects' },
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'dueSoon', label: 'Due Soon' }
  ];

  return (
    <div className="project-filter" style={{ marginBottom: '20px' }}>
      <label style={{ marginRight: '10px' }}>
        <strong>Filter:</strong>
      </label>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            style={{
              marginRight: '5px',
              marginBottom: '5px',  
              padding: '8px 12px',
              backgroundColor: currentFilter === filter.value ? '#1976d2' : '#e0e0e0',
              color: currentFilter === filter.value ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProjectFilter;