function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { value: '', label: 'All' },
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  return (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ marginRight: '10px', fontSize: '14px' }}>
        <strong>Filter:</strong>
      </label>
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          style={{
            marginRight: '5px',
            padding: '5px 10px',
            fontSize: '13px',
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
  );
}

export default TaskFilter;