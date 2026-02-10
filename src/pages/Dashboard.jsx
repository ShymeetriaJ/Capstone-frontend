import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import ProjectList from '../components/ProjectList';
import ActivityFeed from '../components/ActivityFeed';
import './Dashboard.css';

function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="page-container">
      <DashboardHeader />
      
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <ProjectList onRefresh={handleRefresh} />
        </div>
        
        <div className="dashboard-sidebar">
          <ActivityFeed refresh={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
