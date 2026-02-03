import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="page-container">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username}!</p>
      {user?.dashboardNickname && <p>"{user.dashboardNickname}"</p>}
      
      <button onClick={logout}>Logout</button>

      <h2>Your Projects</h2>
      <p>Projects will go here...</p>

      <h2>Recent Activity</h2>
      <p>Activity feed will go here...</p>
    </div>
  );
}

export default Dashboard;