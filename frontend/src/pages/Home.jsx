import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Event Manager</h1>
          <p className="hero-subtitle">
            Discover and register for amazing technical events in your area
          </p>
          <div className="hero-buttons">
            {user ? (
              <>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/events')}
                >
                  Browse Events
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/dashboard')}
                >
                  My Dashboard
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">📅</div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Event Manager?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Easy Discovery</h3>
            <p>Find events that match your interests with our intuitive search and filter system</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Quick Registration</h3>
            <p>Register for events with just one click. No hassle, no paperwork</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Manage Events</h3>
            <p>Keep track of all your registered events in one place</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Connect</h3>
            <p>Meet like-minded people and expand your professional network</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Join?</h2>
        <p>Create an account and start exploring events today</p>
        {!user && (
          <button className="btn btn-large" onClick={() => navigate('/register')}>
            Register Now
          </button>
        )}
      </section>
    </div>
  );
};

export default Home;
