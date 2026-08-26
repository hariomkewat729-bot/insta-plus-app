import React, { useState } from 'react';
import Post from '../components/Post';
import './Home.css';

function Home({ posts, currentUser, users, onLikePost, onAddComment, onFollowUser }) {
  const [searchTerm, setSearchTerm] = useState('');

  const suggestedUsers = users.filter(
    u => u.id !== currentUser.id && !currentUser.following.includes(u.id)
  ).slice(0, 5);

  const filteredPosts = posts.filter(post =>
    post.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="main-content">
        <div className="feed">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="पोस्ट या यूजर खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <i className="fas fa-inbox"></i>
              <p>कोई पोस्ट नहीं मिली</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <Post
                key={post.id}
                post={post}
                currentUser={currentUser}
                onLikePost={onLikePost}
                onAddComment={onAddComment}
              />
            ))
          )}
        </div>

        <div className="sidebar">
          <div className="suggestions-box">
            <h3>सुझाव</h3>
            {suggestedUsers.length === 0 ? (
              <p className="no-suggestions">कोई सुझाव नहीं</p>
            ) : (
              suggestedUsers.map(user => (
                <div key={user.id} className="suggestion-item">
                  <img src={user.profilePic} alt={user.username} />
                  <div className="suggestion-info">
                    <p className="suggestion-username">{user.username}</p>
                    <button
                      className="follow-btn"
                      onClick={() => onFollowUser(user.id)}
                    >
                      फॉलो करें
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;