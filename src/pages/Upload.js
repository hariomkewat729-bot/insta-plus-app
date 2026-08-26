import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

function Upload({ onAddPost, user }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert('कृपया एक चित्र चुनें');
      return;
    }

    if (!caption.trim()) {
      alert('कृपया कैप्शन लिखें');
      return;
    }

    onAddPost({
      image,
      caption: caption.trim()
    });

    alert('पोस्ट सफलतापूर्वक अपलोड हो गई!');
    navigate('/');
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>नई पोस्ट बनाएं</h2>
        <form onSubmit={handleSubmit}>
          <div className="image-upload-section">
            {preview ? (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <button
                  type="button"
                  className="change-image-btn"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  तस्वीर बदलें
                </button>
              </div>
            ) : (
              <label className="upload-label">
                <div className="upload-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>तस्वीर अपलोड करें</p>
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden-input"
                />
              </label>
            )}
          </div>

          <div className="form-group">
            <textarea
              placeholder="कैप्शन लिखें..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="caption-input"
              rows="4"
            />
          </div>

          <button type="submit" className="submit-btn">
            <i className="fas fa-upload"></i> पोस्ट करें
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;