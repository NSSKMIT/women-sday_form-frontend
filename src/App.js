import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
    // Create floating elements when component mounts
    createFloatingElements();
  }, []);

  const createFloatingElements = () => {
    // Create floating flowers
    const flowersContainer = document.createElement('div');
    flowersContainer.className = 'decoration-container flowers-container';
    document.body.appendChild(flowersContainer);
    
    const flowerTypes = ['🌸', '🌺', '🌹', '🌷', '💐', '🌻'];
    
    for (let i = 0; i < 20; i++) {
      const flower = document.createElement('div');
      flower.className = 'floating-element flower-decoration';
      flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      flower.style.left = `${Math.random() * 100}%`;
      flower.style.top = `${Math.random() * 100}%`;
      flower.style.animationDelay = `${Math.random() * 8}s`;
      flower.style.animationDuration = `${Math.random() * 15 + 10}s`;
      flower.style.fontSize = `${Math.random() * 15 + 15}px`;
      flowersContainer.appendChild(flower);
    }
    
    // Create floating symbols
    const symbolsContainer = document.createElement('div');
    symbolsContainer.className = 'decoration-container symbols-container';
    document.body.appendChild(symbolsContainer);
    
    const symbols = ['✨', '💫', '⭐', '🌟', '♀️', '💖'];
    
    for (let i = 0; i < 25; i++) {
      const symbol = document.createElement('div');
      symbol.className = 'floating-element symbol-decoration';
      symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      symbol.style.left = `${Math.random() * 100}%`;
      symbol.style.top = `${Math.random() * 100}%`;
      symbol.style.animationDelay = `${Math.random() * 5}s`;
      symbol.style.animationDuration = `${Math.random() * 10 + 8}s`;
      symbol.style.fontSize = `${Math.random() * 12 + 12}px`;
      symbolsContainer.appendChild(symbol);
    }
    
    // Create soft gradient background
    const gradientBackground = document.createElement('div');
    gradientBackground.className = 'gradient-background';
    document.body.appendChild(gradientBackground);
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
    
    // Check if at least one field is filled
    if (!formData.story && !formData.image) {
      setError('Please share a story or upload an image to continue.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = new FormData();
      // Using a default anonymous name
      data.append('name', 'Anonymous Storyteller');
      data.append('story', formData.story || '');
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
      
      // Display celebration animation
      createCelebration();
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCelebration = () => {
    const celebrationContainer = document.createElement('div');
    celebrationContainer.className = 'celebration-container';
    document.body.appendChild(celebrationContainer);
    
    const celebrationElements = ['🌹', '👑', '✨', '💫', '💕', '🌺', '🌸', '♀️', '💪', '❤️'];
    const colors = ['#FF69B4', '#DA70D6', '#BA55D3', '#FF1493', '#C71585', '#DB7093'];
    
    for (let i = 0; i < 80; i++) {
      const element = document.createElement('div');
      element.className = 'celebration-element';
      element.textContent = celebrationElements[Math.floor(Math.random() * celebrationElements.length)];
      element.style.left = `${Math.random() * 100}%`;
      element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)] + '30'; // 30 for transparency
      element.style.animationDuration = `${Math.random() * 3 + 2}s`;
      element.style.animationDelay = `${Math.random() * 2}s`;
      element.style.fontSize = `${Math.random() * 16 + 14}px`;
      celebrationContainer.appendChild(element);
    }
    
    setTimeout(() => {
      document.body.removeChild(celebrationContainer);
    }, 5000);
  };

  const resetForm = () => {
    setSubmitted(false);
  };

  return (
    <div className="womens-day-container">
      <div className="form-card">
        <div className="form-header">
          <h1>Celebrating Women's Voices</h1>
          <div className="title-decoration">
            <span>🌺</span>
            <span>♀️</span>
            <span>✨</span>
            <span>💪</span>
            <span>🌸</span>
          </div>
          <h3>Share your story for International Women's Day</h3>
        </div>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="womens-day-form">
            {/* Centered image upload section */}
            <div className="image-upload-section">
              <p className="upload-prompt">Share a photo that celebrates you</p>
              <div className="image-upload-wrapper">
                <button type="button" className="image-upload-btn">
                  {formData.image ? 'Change image' : 'Choose an image'}
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
            
            <div className="form-divider">
              <span>or</span>
            </div>
            
            <div className="form-group">
              <label htmlFor="story">Your Story <span className="optional-text">(optional)</span></label>
              <textarea
                id="story"
                name="story"
                value={formData.story}
                onChange={handleChange}
                placeholder="Share your thoughts, experiences, or wishes for Women's Day..."
                className="story-textarea"
              />
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <div className="form-note">
              <p>Share a story, an image, or both - it's up to you</p>
            </div>
            
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Sharing your voice...' : 'Share Your Voice'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">🌟</div>
            <h2>Thank you for sharing!</h2>
            <p>Your voice is an important part of our Women's Day celebration.</p>
            <button onClick={resetForm} className="reset-button">
              Share Another Story
            </button>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Sharing your story with the world...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
