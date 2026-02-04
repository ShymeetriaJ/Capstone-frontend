import { useState, useEffect } from 'react';
import { getRecentActivities } from '../services/activityService';

function ActivityFeed({ refresh }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, [refresh]);

  const loadActivities = async () => {
    try {
      const data = await getRecentActivities(5);
      setActivities(data);
    } catch (err) {
      console.error('Failed to load activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now - activityTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return activityTime.toLocaleDateString();
  };

  if (loading) return <p>Loading activity...</p>;

  return (
    <div>
      <h2>Recent Activity</h2>
      
      {activities.length === 0 ? (
        <p>No activity yet. Start creating projects and tasks!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {activities.map(activity => (
            <li 
              key={activity._id}
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee'
              }}
            >
              <strong>{activity.action}</strong> "{activity.targetName}"
              <span style={{ color: '#666', marginLeft: '10px', fontSize: '14px' }}>
                {formatTimeAgo(activity.timestamp)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivityFeed;