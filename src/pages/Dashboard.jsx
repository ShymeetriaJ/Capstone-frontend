import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import ProjectList from '../components/ProjectList';
import ActivityFeed from '../components/ActivityFeed';

function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="page-container">
      <DashboardHeader />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 400px', 
        gap: '40px',
        marginTop: '30px'
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
