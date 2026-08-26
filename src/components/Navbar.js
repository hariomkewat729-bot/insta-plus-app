import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-camera"></i> Insta Plus
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            <i className="fas fa-home"></i> होम
          </Link>
          <Link to="/upload" className="navbar-link">
            <i className="fas fa-plus-circle"></i> अपलोड करें
          </Link>
          <Link to={`/profile/${user.id}`} className="navbar-link">
            <i className="fas fa-user"></i> प्रोफाइल
          </Link>
          <button onClick={handleLogout} className="navbar-link logout-btn">
            <i className="fas fa-sign-out-alt"></i> लॉगआउट
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;