import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Dashboard.css'

function AI() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello! I\'m your Farmify AI Assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now(), type: 'user', text: input }
    setMessages([...messages, userMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: 'Thanks for your question! This is a placeholder response. AI integration will be added soon.'
      }
      setMessages(prev => [...prev, aiResponse])
    }, 500)

    setInput('')
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">Farmify</div>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Feed</Link>
          <Link to="/resources" className="nav-item">Resources</Link>
          <Link to="/articles" className="nav-item">Articles</Link>
          <Link to="/ai" className="nav-item active">AI Assistant</Link>
        </div>
        <Link to="/account" className="account-btn">
          <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
          <span>Account</span>
        </Link>
      </nav>

      <div className="dashboard-main">
        <div className="feed-container">
          <div className="ai-chat" style={{ background: 'white', border: '1px solid #e5e5e5', borderRadius: '12px', height: '600px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e5e5e5' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '4px' }}>AI Farm Assistant</h2>
              <p style={{ color: '#666', fontSize: '14px' }}>Ask me anything about farming, crops, weather, or best practices</p>
            </div>

            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: msg.type === 'user' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#f5f5f5',
                    color: msg.type === 'user' ? 'white' : '#0a0a0a',
                    fontSize: '15px',
                    lineHeight: '1.5'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} style={{ padding: '20px', borderTop: '1px solid #e5e5e5', display: 'flex', gap: '12px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your farming question..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
              <button type="submit" className="post-btn">Send</button>
            </form>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <h3>Suggested Topics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button style={{ padding: '10px', background: '#f0fdf4', border: 'none', borderRadius: '8px', textAlign: 'left', fontSize: '14px', color: '#16a34a', cursor: 'pointer' }}>
                Weather forecast for my region
              </button>
              <button style={{ padding: '10px', background: '#f0fdf4', border: 'none', borderRadius: '8px', textAlign: 'left', fontSize: '14px', color: '#16a34a', cursor: 'pointer' }}>
                Best crops for monsoon season
              </button>
              <button style={{ padding: '10px', background: '#f0fdf4', border: 'none', borderRadius: '8px', textAlign: 'left', fontSize: '14px', color: '#16a34a', cursor: 'pointer' }}>
                Pest control recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AI
