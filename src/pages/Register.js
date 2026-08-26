import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('सभी फील्ड भरें');
      return;
    }

    if (password.length < 6) {
      setError('पासवर्ड कम से कम 6 वर्ण का हो');
      return;
    }

    onRegister(username, email, password);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="app-title">📷 Insta Plus</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="यूजरनेम"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="ईमेल"
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
          <button type="submit" className="auth-btn">रजिस्टर करें</button>
        </form>
        <p className="auth-link">
          पहले से अकाउंट है? <Link to="/">लॉगिन करें</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;