import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateDashboardNickname } from '../services/authService';

function DashboardHeader() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.dashboardNickname || '');
  const [loading, setLoading] = useState(false);

  const handleSaveNickname = async () => {
    setLoading(true);
    try {
      await updateDashboardNickname(nickname);
      updateUser({ dashboardNickname: nickname });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating nickname:', error);
      alert('Failed to update nickname');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter dashboard nickname"
            style={{ padding: '8px', fontSize: '16px', marginRight: '10px' }}
          />
          <button onClick={handleSaveNickname} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h1>
            {user?.dashboardNickname || `${user?.username}'s Dashboard`}
          </h1>
          <button onClick={() => setIsEditing(true)}>
            {user?.dashboardNickname ? 'Edit Name' : 'Add Dashboard Name'}
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardHeader;