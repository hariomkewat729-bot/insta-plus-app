import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // लोड करो localStorage से
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedUsers = localStorage.getItem('users');
    const savedPosts = localStorage.getItem('posts');

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
  }, []);

  // Save करो localStorage में
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleRegister = (username, email, password) => {
    const newUser = {
      id: Date.now(),
      username,
      email,
      password,
      bio: '',
      followers: [],
      following: [],
      profilePic: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleAddPost = (postData) => {
    const newPost = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      profilePic: currentUser.profilePic,
      ...postData,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    setPosts([newPost, ...posts]);
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(currentUser.id);
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter(id => id !== currentUser.id)
            : [...post.likes, currentUser.id]
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              userId: currentUser.id,
              username: currentUser.username,
              text: comment,
              createdAt: new Date().toISOString()
            }
          ]
        };
      }
      return post;
    }));
  };

  const handleFollowUser = (userId) => {
    setCurrentUser(prev => ({
      ...prev,
      following: prev.following.includes(userId)
        ? prev.following.filter(id => id !== userId)
        : [...prev.following, userId]
    }));

    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          followers: user.followers.includes(currentUser.id)
            ? user.followers.filter(id => id !== currentUser.id)
            : [...user.followers, currentUser.id]
        };
      }
      return user;
    }));
  };

  if (!currentUser) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                currentUser={currentUser}
                users={users}
                onLikePost={handleLikePost}
                onAddComment={handleAddComment}
                onFollowUser={handleFollowUser}
              />
            }
          />
          <Route
            path="/upload"
            element={<Upload onAddPost={handleAddPost} user={currentUser} />}
          />
          <Route
            path="/profile/:userId"
            element={
              <Profile
                currentUser={currentUser}
                users={users}
                posts={posts}
                onFollowUser={handleFollowUser}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;