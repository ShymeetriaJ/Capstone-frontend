import { useState } from 'react';
import { updateDashboardNickname } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import './DashboardHeader.css';

function DashboardHeader() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setNickname(user?.dashboardNickname || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updateDashboardNickname(nickname);
      updateUser(response.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update nickname:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNickname('');
  };

  const displayName = user?.dashboardNickname || user?.username || 'User';

  return (
    <div className="dashboard-header">
      {!isEditing ? (
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">{displayName}</h1>
            <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
          </div>
          <button className="edit-name-btn" onClick={handleEdit}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Edit Name
          </button>
        </div>
      ) : (
        <div className="edit-mode">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter your display name"
            className="nickname-input"
            autoFocus
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button className="cancel-btn" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardHeader;