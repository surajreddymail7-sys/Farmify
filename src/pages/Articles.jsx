import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Dashboard.css'

function Articles() {
  const { user } = useAuth()

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">Farmify</div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Feed</Link>
          <Link to="/resources" className="nav-item">Resources</Link>
          <Link to="/articles" className="nav-item active">Articles</Link>
          <Link to="/ai" className="nav-item">AI Assistant</Link>
        </div>
        <Link to="/account" className="account-btn">
          <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
          <span>Account</span>
        </Link>
      </nav>

      <div className="dashboard-main">
        <div className="feed-container">
          <div className="create-post">
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Farming Articles</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>Expert insights and guides for modern farming</p>
          </div>

          <div style={{ 
            padding: '60px 20px', 
            textAlign: 'center',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#0a0a0a' }}>
              Articles Coming Soon!
            </h3>
            <p style={{ color: '#666', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
              We're working on curating the best farming articles and guides. Check back soon for expert insights on organic farming, crop management, and more!
            </p>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <h3>Upcoming Topics</h3>
            <div className="topic-list">
              <div className="topic-tag">Organic Farming</div>
              <div className="topic-tag">Irrigation</div>
              <div className="topic-tag">Soil Health</div>
              <div className="topic-tag">Pest Control</div>
              <div className="topic-tag">Crop Planning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Articles
