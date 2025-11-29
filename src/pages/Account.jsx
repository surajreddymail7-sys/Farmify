import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usersAPI } from '../utils/api'
import '../styles/Dashboard.css'

function Account() {
  const navigate = useNavigate()
  const { user, logout, updateUser, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    bio: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
      return
    }
    if (user) {
      setFormData({
        name: user.name || '',
        location: user.location || '',
        bio: user.bio || ''
      })
    }
  }, [user, isAuthenticated, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const updated = await usersAPI.updateProfile(formData)
      updateUser({ ...user, ...updated })
      setMessage('Profile updated successfully!')
    } catch (err) {
      setMessage('Failed to update profile: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">Farmify</div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Feed</Link>
          <Link to="/resources" className="nav-item">Resources</Link>
          <Link to="/articles" className="nav-item">Articles</Link>
          <Link to="/ai" className="nav-item">AI Assistant</Link>
        </div>
        <Link to="/account" className="account-btn">
          <div className="avatar">U</div>
          <span>Account</span>
        </Link>
      </nav>

      <div className="dashboard-main">
        <div className="feed-container">
          <div className="create-post">
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Account Settings</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>Manage your profile and preferences</p>
          </div>

          <div className="post-card">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Profile Information</h3>
            {message && (
              <div style={{ 
                padding: '12px', 
                background: message.includes('success') ? '#d1fae5' : '#fee2e2', 
                color: message.includes('success') ? '#065f46' : '#dc2626', 
                borderRadius: '8px', 
                marginBottom: '16px', 
                fontSize: '14px' 
              }}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#0a0a0a' }}>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange}
                  className="post-input" 
                  style={{ minHeight: 'auto' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#0a0a0a' }}>Email</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  className="post-input" 
                  style={{ minHeight: 'auto', background: '#f5f5f5' }} 
                  disabled 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#0a0a0a' }}>Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location} 
                  onChange={handleChange}
                  className="post-input" 
                  style={{ minHeight: 'auto' }} 
                  placeholder="e.g., Punjab, India"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#0a0a0a' }}>Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio} 
                  onChange={handleChange}
                  className="post-input" 
                  style={{ minHeight: '80px' }} 
                  placeholder="Tell us about your farming experience..."
                />
              </div>
              <button type="submit" className="post-btn" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          <div className="post-card">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '15px', marginBottom: '4px' }}>Email Notifications</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>Receive updates about new articles and posts</div>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '15px', marginBottom: '4px' }}>Weather Alerts</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>Get notified about important weather changes</div>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          <div className="post-card">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#dc2626' }}>Danger Zone</h3>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 24px',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <h3>Your Stats</h3>
            <div className="stat-item">
              <span>Posts</span>
              <strong>{user?.postsCount || 0}</strong>
            </div>
            <div className="stat-item">
              <span>Followers</span>
              <strong>{user?.followers?.length || 0}</strong>
            </div>
            <div className="stat-item">
              <span>Following</span>
              <strong>{user?.following?.length || 0}</strong>
            </div>
            <div className="stat-item">
              <span>Joined</span>
              <strong>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
