import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/DashboardHeader';
import ProjectList from '../components/ProjectList';
import ActivityFeed from '../components/ActivityFeed';

function Dashboard() {
  const { logout } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="page-container">
      <DashboardHeader />
      
      <button 
        onClick={logout}
        style={{ marginBottom: '20px' }}
      >
        Logout
      </button>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '30px',
        marginTop: '20px'
      }}>
        <div>
          <ProjectList onRefresh={handleRefresh} />
        </div>
        
        <div>
          <ActivityFeed refresh={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
