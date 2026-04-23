import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserEvents();
  }, [user, navigate]);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      const eventsRes = await axios.get('http://localhost:8000/api/events');
      const allEvts = eventsRes.data.data || eventsRes.data;
      setAllEvents(allEvts);

      // Get registered events
      const registered = allEvts.filter(event => 
        event.attendees.includes(user.id)
      );
      setRegisteredEvents(registered);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (eventId) => {
    if (window.confirm('Are you sure you want to cancel your registration?')) {
      try {
        await axios.post(
          `http://localhost:8000/api/events/${eventId}/cancel-registration`,
          { userId: user.id }
        );
        fetchUserEvents();
      } catch (err) {
        console.error('Failed to cancel registration:', err);
        alert('Failed to cancel registration');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  const upcomingEvents = registeredEvents.filter(event => 
    new Date(event.date) > new Date()
  );

  const pastEvents = registeredEvents.filter(event => 
    new Date(event.date) <= new Date()
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <div className="user-info-card">
          <p className="user-name">Welcome, {user.name}!</p>
          <p className="user-email">{user.email}</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{registeredEvents.length}</div>
          <div className="stat-label">Total Registrations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{upcomingEvents.length}</div>
          <div className="stat-label">Upcoming Events</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{pastEvents.length}</div>
          <div className="stat-label">Attended Events</div>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>📅 Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <p className="no-data">You haven't registered for any upcoming events yet.</p>
        ) : (
          <div className="events-list">
            {upcomingEvents.map(event => (
              <div key={event._id} className="event-item">
                <div className="event-item-content">
                  <h3>{event.title}</h3>
                  <p className="event-date">
                    📅 {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="event-location">📍 {event.location}</p>
                </div>
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelRegistration(event._id)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>✅ Past Events</h2>
        {pastEvents.length === 0 ? (
          <p className="no-data">You haven't attended any events yet.</p>
        ) : (
          <div className="events-list">
            {pastEvents.map(event => (
              <div key={event._id} className="event-item past">
                <div className="event-item-content">
                  <h3>{event.title}</h3>
                  <p className="event-date">
                    📅 {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="event-location">📍 {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
