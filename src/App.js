import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import heartIcon from './assets/HeartIcon';
import starIcon from './assets/StarIcon';
import cloudIcon from './assets/CloudIcon';

function App() {
  const [formData, setFormData] = useState({
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
    
    for (let i = 0; i < 30; i++) {
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
    
    for (let i = 0; i < 40; i++) {
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
    
    for (let i = 0; i < 8; i++) {
      const cloud = document.createElement('img');
      cloud.src = cloudIcon;
      cloud.className = 'cloud-decoration';
      cloud.style.left = `${Math.random() * 100}%`;
      cloud.style.top = `${Math.random() * 30}%`;
      cloud.style.animationDuration = `${Math.random() * 30 + 30}s`;
      cloudsContainer.appendChild(cloud);
    }
    
    // Create rainbow
    const rainbow = document.createElement('div');
    rainbow.className = 'rainbow';
    document.body.appendChild(rainbow);
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
      // Using a default anonymous name
      data.append('name', 'Anonymous Storyteller');
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
        story: '',
        image: null
      });
      setImagePreview(null);
      
      // Display confetti animation
      createConfetti();
    } catch (err) {
      setError('Oopsie! Something went wrong. Try again, pretty please!');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093', '#FFACFC', '#F148FB', '#7122FA', '#560A86'];
    const shapes = ['circle', 'heart', 'star'];
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
      } else if (shape === 'heart') {
        confetti.className += ' confetti-heart';
      } else if (shape === 'star') {
        confetti.className += ' confetti-star';
      }
      
      confetti.style.width = `${Math.random() * 12 + 5}px`;
      confetti.style.height = `${Math.random() * 12 + 5}px`;
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
      <div className="unicorn-container">
        <div className="unicorn"></div>
      </div>
      
      <div className="form-container">
        <h1 className="title">Share Your Magic Story</h1>
        <div className="title-decoration">
          <span>✨</span>
          <span>🦄</span>
          <span>💖</span>
          <span>🌈</span>
          <span>✨</span>
        </div>
        <h3 className="subtitle">Celebrate Women's Day in Dreamland!</h3>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="story-form">
            <div className="form-group">
              <label htmlFor="story">Tell Us Your Magical Story</label>
              <textarea
                id="story"
                name="story"
                value={formData.story}
                onChange={handleChange}
                placeholder="Once upon a time in a magical land..."
                required
                className="form-textarea"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Share a Sparkly Image (Optional)</label>
              <div className="upload-btn-wrapper">
                <button type="button" className="upload-btn">
                  {formData.image ? 'Change image...' : 'Choose a magical image...'}
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
              {isLoading ? 'Sending to Fairy Land...' : 'Share Your Magic'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✨</div>
            <h2>Your fairy tale has been shared!</h2>
            <p>Thank you for adding magic to our Women's Day celebration!</p>
            <div className="sparkles"></div>
            <button onClick={resetForm} className="reset-btn">
              Share Another Story
            </button>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Sprinkling fairy dust on your story...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
