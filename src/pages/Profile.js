import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import './Profile.css';

function Profile({ currentUser, users, posts, onFollowUser }) {
  const { userId } = useParams();
  const profileUser = users.find(u => u.id === parseInt(userId));
  const userPosts = posts.filter(p => p.userId === parseInt(userId));
  const isFollowing = currentUser.following.includes(parseInt(userId));

  if (!profileUser) {
    return <div className="profile-container">यूजर नहीं मिला</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileUser.profilePic} alt={profileUser.username} className="profile-avatar" />
        <div className="profile-info">
          <h1>{profileUser.username}</h1>
          <p className="profile-bio">{profileUser.bio || 'बायो यहाँ आएगा'}</p>
          <div className="profile-stats">
            <div className="stat">
              <strong>{userPosts.length}</strong>
              <span>पोस्ट</span>
            </div>
            <div className="stat">
              <strong>{profileUser.followers.length}</strong>
              <span>फॉलोअर्स</span>
            </div>
            <div className="stat">
              <strong>{profileUser.following.length}</strong>
              <span>फॉलो करते हैं</span>
            </div>
          </div>
          {currentUser.id !== profileUser.id && (
            <button
              className={`follow-btn ${isFollowing ? 'following' : ''}`}
              onClick={() => onFollowUser(profileUser.id)}
            >
              {isFollowing ? 'अनफॉलो करें' : 'फॉलो करें'}
            </button>
          )}
        </div>
      </div>

      <div className="profile-posts">
        <h2>{profileUser.username} की पोस्ट्स</h2>
        {userPosts.length === 0 ? (
          <p className="no-posts">अभी कोई पोस्ट नहीं</p>
        ) : (
          <div className="posts-grid">
            {userPosts.map(post => (
              <Post
                key={post.id}
                post={post}
                currentUser={currentUser}
                onLikePost={() => {}}
                onAddComment={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;