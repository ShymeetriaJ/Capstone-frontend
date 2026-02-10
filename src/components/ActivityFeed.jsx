import { useState, useEffect } from 'react';
import { getRecentActivities } from '../services/activityService';
import './ActivityFeed.css';

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

  const getActionIcon = (action) => {
    if (action.includes('created')) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    if (action.includes('updated') || action.includes('completed')) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (action.includes('deleted')) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    return null;
  };

  const getActionColor = (action) => {
    if (action.includes('created')) return 'activity-created';
    if (action.includes('updated') || action.includes('completed')) return 'activity-updated';
    if (action.includes('deleted')) return 'activity-deleted';
    return '';
  };

  if (loading) {
    return (
      <div className="activity-feed">
        <h2 className="activity-title">Recent Activity</h2>
        <div className="activity-loading">
          <div className="spinner"></div>
          <p>Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-feed">
      <h2 className="activity-title">Recent Activity</h2>
      
      {activities.length === 0 ? (
        <div className="activity-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p>No activity yet</p>
          <span>Start creating projects and tasks!</span>
        </div>
      ) : (
        <div className="activity-list">
          {activities.map(activity => (
            <div key={activity._id} className={`activity-item ${getActionColor(activity.action)}`}>
              <div className="activity-icon">
                {getActionIcon(activity.action)}
              </div>
              <div className="activity-content">
                <p className="activity-text">
                  <strong>{activity.action}</strong> "{activity.targetName}"
                </p>
                <span className="activity-time">{formatTimeAgo(activity.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActivityFeed;