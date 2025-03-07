import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import heartIcon from './assets/HeartIcon';
import starIcon from './assets/StarIcon';
import cloudIcon from './assets/CloudIcon';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    story: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create decorative elements when component mounts
    createDecorations();
  }, []);

  const createDecorations = () => {
    // Create hearts
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'decoration-container hearts-container';
    document.body.appendChild(heartsContainer);
    
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('img');
      heart.src = heartIcon;
      heart.className = 'heart-decoration';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heartsContainer.appendChild(heart);
    }
    
    // Create stars
    const starsContainer = document.createElement('div');
    starsContainer.className = 'decoration-container stars-container';
    document.body.appendChild(starsContainer);
    
    for (let i = 0; i < 25; i++) {
      const star = document.createElement('img');
      star.src = starIcon;
      star.className = 'star-decoration';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starsContainer.appendChild(star);
    }
    
    // Create clouds
    const cloudsContainer = document.createElement('div');
    cloudsContainer.className = 'decoration-container clouds-container';
    document.body.appendChild(cloudsContainer);
    
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement('img');
      cloud.src = cloudIcon;
      cloud.className = 'cloud-decoration';
      cloud.style.left = `${Math.random() * 100}%`;
      cloud.style.top = `${Math.random() * 30}%`;
      cloud.style.animationDuration = `${Math.random() * 30 + 30}s`;
      cloudsContainer.appendChild(cloud);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFormData({
      ...formData,
      image: file
    });
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('story', formData.story);
      if (formData.image) {
        data.append('image', formData.image);
      }
      
      await axios.post('https://women-sday-form-backend-mzts.vercel.app/api/stories', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSubmitted(true);
      setFormData({
        name: '',
        story: '',
        image: null
      });
      setImagePreview(null);
      
      // Display confetti animation
      createConfetti();
    } catch (err) {
      setError('Something went wrong. Please try again!');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      confettiContainer.appendChild(confetti);
    }
    
    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 6000);
  };

  const resetForm = () => {
    setSubmitted(false);
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="title">Share Your Story</h1>
        <div className="title-decoration">
          <span>✨</span>
          <span>💖</span>
          <span>✨</span>
        </div>
        <h3 className="subtitle">Celebrate Women's Day with Us!</h3>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="story-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="story">Your Story</label>
              <textarea
                id="story"
                name="story"
                value={formData.story}
                onChange={handleChange}
                placeholder="Tell us your inspiring story..."
                required
                className="form-textarea"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Add an Image (Optional)</label>
              <div className="upload-btn-wrapper">
                <button type="button" className="upload-btn">
                  {formData.image ? 'Change image...' : 'Choose an image...'}
                </button>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                </div>
              )}
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Share Your Story'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Thank you for sharing your story!</h2>
            <p>Your story has been submitted successfully.</p>
            <button onClick={resetForm} className="reset-btn">
              Share Another Story
            </button>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Submitting your story...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
