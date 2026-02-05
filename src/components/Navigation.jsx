import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Navigation() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <div style={{
      padding: '15px 20px',
      backgroundColor: colors.primary,
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '8px 15px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
        <button
          onClick={() => navigate(1)}
          style={{
            padding: '8px 15px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Forward →
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '8px 15px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          Dashboard
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 15px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
        <span>Welcome, {user?.username}!</span>
        <button
          onClick={logout}
          style={{
            padding: '8px 15px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navigation;