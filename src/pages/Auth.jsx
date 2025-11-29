import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI, setToken } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Temporary: Skip authentication and go directly to dashboard
    navigate('/dashboard')
    
    /* 
    // Original authentication code (disabled temporarily)
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const data = await authAPI.login({
          email: formData.email,
          password: formData.password
        })
        setToken(data.token)
        login(data, data.token)
        navigate('/dashboard')
      } else {
        const data = await authAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          location: formData.location
        })
        setToken(data.token)
        login(data, data.token)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
    */
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="logo">Farmify</h1>
        
        <div className="auth-tabs">
          <button 
            className={isLogin ? 'tab active' : 'tab'}
            onClick={() => {
              setIsLogin(true)
              setError('')
            }}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'tab active' : 'tab'}
            onClick={() => {
              setIsLogin(false)
              setError('')
            }}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div style={{ padding: '12px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input 
              type="text"
              name="name"
              placeholder="Full Name" 
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          
          <input 
            type="email"
            name="email"
            placeholder="Email" 
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input 
            type="password"
            name="password"
            placeholder="Password (min 6 characters)" 
            className="input"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />

          {!isLogin && (
            <select 
              name="location"
              className="input"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
