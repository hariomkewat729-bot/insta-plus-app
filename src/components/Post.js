import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

function Post({ post, currentUser, onLikePost, onAddComment }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const isLiked = post.likes.includes(currentUser.id);

  const handleAddComment = () => {
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  const formatDate = (date) => {
    const postDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    if (postDate.toDateString() === today.toDateString()) {
      return postDate.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
    } else if (postDate.toDateString() === yesterday.toDateString()) {
      return 'कल';
    } else {
      return postDate.toLocaleDateString('hi-IN');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.profilePic} alt={post.username} className="post-avatar" />
        <div className="post-user-info">
          <Link to={`/profile/${post.userId}`} className="post-username">
            {post.username}
          </Link>
          <span className="post-time">{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="post-image">
        <img src={post.image} alt="Post" />
      </div>

      <div className="post-actions">
        <button
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={() => onLikePost(post.id)}
        >
          <i className={`fas fa-heart ${isLiked ? 'fas' : 'far'}`}></i>
        </button>
        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          <i className="far fa-comment"></i>
        </button>
        <button className="action-btn">
          <i className="far fa-paper-plane"></i>
        </button>
      </div>

      <div className="post-stats">
        <strong>{post.likes.length} लाइक्स</strong>
        <span className="comments-count">{post.comments.length} कमेंट्स</span>
      </div>

      <div className="post-caption">
        <strong>{post.username}</strong> {post.caption}
      </div>

      {showComments && (
        <div className="post-comments">
          <div className="comments-list">
            {post.comments.map(comment => (
              <div key={comment.id} className="comment">
                <strong>{comment.username}</strong> {comment.text}
              </div>
            ))}
          </div>
          <div className="comment-input">
            <input
              type="text"
              placeholder="कमेंट लिखें..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button onClick={handleAddComment}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;