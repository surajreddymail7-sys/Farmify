import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postsAPI } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import '../styles/Dashboard.css'

function Dashboard() {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [posting, setPosting] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { language, setLanguage, translations } = useLanguage()

  useEffect(() => {
    // Temporary: Skip authentication check
    // if (!isAuthenticated) {
    //   navigate('/auth')
    //   return
    // }
    fetchPosts()
  }, [isAuthenticated, navigate])

  const fetchPosts = async () => {
    try {
      const data = await postsAPI.getPosts()
      setPosts(data.posts || [])
    } catch (err) {
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    if (!newPost.trim()) return

    setPosting(true)
    try {
      const post = await postsAPI.createPost({ content: newPost })
      setPosts([post, ...posts])
      setNewPost('')
    } catch (err) {
      alert('Failed to create post: ' + err.message)
    } finally {
      setPosting(false)
    }
  }

  const handleLike = async (postId) => {
    try {
      const result = await postsAPI.likePost(postId)
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, likesCount: result.likesCount, liked: result.liked }
          : post
      ))
    } catch (err) {
      console.error('Failed to like post:', err)
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1 className="logo">🌾 Farmify</h1>
        
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item active">Feed</Link>
          <Link to="/weather" className="nav-item">Weather</Link>
          <Link to="/market" className="nav-item">Market</Link>
          <Link to="/resources" className="nav-item">Resources</Link>
          <Link to="/ai" className="nav-item">AI</Link>
        </div>

        <div className="nav-actions">
          <div className="language-selector">
            <button 
              className="language-btn" 
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              🌐 {translations[language]?.name || 'English'}
            </button>
            {showLanguageMenu && (
              <div className="language-menu">
                {Object.keys(translations).map(lang => (
                  <button
                    key={lang}
                    className={`language-option ${language === lang ? 'active' : ''}`}
                    onClick={() => { setLanguage(lang); setShowLanguageMenu(false); }}
                  >
                    {translations[lang].name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="account-btn" onClick={() => navigate('/account')}>
            <span className="avatar">👤</span>
            Account
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="feed-container">
          <div className="create-post">
            <form onSubmit={handleCreatePost}>
              <textarea 
                placeholder="Share your farming experience..."
                className="post-input"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                disabled={posting}
              />
              <button type="submit" className="post-btn" disabled={posting || !newPost.trim()}>
                {posting ? 'Posting...' : 'Post'}
              </button>
            </form>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              Loading posts...
            </div>
          ) : error ? (
            <div style={{ padding: '20px', background: '#fee2e2', color: '#dc2626', borderRadius: '12px' }}>
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              No posts yet. Be the first to share!
            </div>
          ) : (
            <div className="posts">
              {posts.map(post => (
                <article key={post._id} className="post-card">
                  <div className="post-header">
                    <div className="author-info">
                      <div className="author-avatar">
                        {post.author?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h3 className="author-name">{post.author?.name || 'Unknown'}</h3>
                        <p className="post-meta">
                          {post.author?.location || 'Location not set'} · {formatTime(post.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="post-content">{post.content}</p>

                  <div className="post-actions">
                    <button className="action-btn" onClick={() => handleLike(post._id)}>
                      <span>{post.liked ? '❤️' : '👍'}</span> {post.likesCount || 0}
                    </button>
                    <button className="action-btn">
                      <span>💬</span> {post.commentsCount || 0}
                    </button>
                    <button className="action-btn">
                      <span>🔗</span> Share
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="sidebar">
          <div className="sidebar-card highlight">
            <h3>🌤️ Today's Weather</h3>
            <div className="weather-preview">
              <div className="weather-temp">28°C</div>
              <div className="weather-condition">☀️ Sunny</div>
              <Link to="/weather" className="sidebar-link">View Forecast →</Link>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>📈 Market Prices</h3>
            <div className="price-preview">
              <div className="price-item">
                <span>Wheat</span>
                <strong className="price-up">₹2,150 📈</strong>
              </div>
              <div className="price-item">
                <span>Rice</span>
                <strong className="price-down">₹3,800 📉</strong>
              </div>
              <Link to="/market" className="sidebar-link">View All Prices →</Link>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>🔥 Trending Topics</h3>
            <div className="topic-list">
              <span className="topic-tag">#OrganicFarming</span>
              <span className="topic-tag">#DripIrrigation</span>
              <span className="topic-tag">#SoilHealth</span>
              <span className="topic-tag">#Vermicompost</span>
              <span className="topic-tag">#CropRotation</span>
              <span className="topic-tag">#SmartFarming</span>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>📚 Learning Resources</h3>
            <div className="resources-preview">
              <div className="resource-item">
                <span className="resource-icon">🌾</span>
                <div>
                  <div className="resource-title">Wheat Farming Guide</div>
                  <div className="resource-meta">15 min read</div>
                </div>
              </div>
              <div className="resource-item">
                <span className="resource-icon">💧</span>
                <div>
                  <div className="resource-title">Water Conservation</div>
                  <div className="resource-meta">12 min read</div>
                </div>
              </div>
              <Link to="/resources" className="sidebar-link">Browse All →</Link>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>📊 Your Stats</h3>
            <div className="stat-item">
              <span>Your Posts</span>
              <strong>12</strong>
            </div>
            <div className="stat-item">
              <span>Connections</span>
              <strong>45</strong>
            </div>
            <div className="stat-item">
              <span>Articles Read</span>
              <strong>28</strong>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default Dashboard
