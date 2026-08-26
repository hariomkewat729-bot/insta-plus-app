import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('सभी फील्ड भरें');
      return;
    }

    if (onLogin(email, password)) {
      navigate('/');
    } else {
      setError('गलत ईमेल या पासवर्ड');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="app-title">📷 Insta Plus</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="ई��ेल"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="पासवर्ड"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-btn">लॉगिन करें</button>
        </form>
        <p className="auth-link">
          अकाउंट नहीं है? <Link to="/register">रजिस्टर करें</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;