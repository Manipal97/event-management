import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import '../styles/Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchEvents();
  }, [user, navigate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/events');
      setEvents(res.data.data || res.data);
      setError('');
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      if (registeredEvents.includes(eventId)) {
        // Cancel registration
        await axios.post(
          `http://localhost:5000/api/events/${eventId}/cancel-registration`,
          { userId: user.id }
        );
        setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      } else {
        // Register
        await axios.post(
          `http://localhost:8000/api/events/${eventId}/register`,
          { userId: user.id }
        );
        setRegisteredEvents([...registeredEvents, eventId]);
      }
      fetchEvents();
    } catch (err) {
      console.error('Registration failed:', err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <p>Find and register for events that interest you</p>
      </div>

      <div className="events-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
            <option value="hackathon">Hackathon</option>
            <option value="seminar">Seminar</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {filteredEvents.length === 0 ? (
        <div className="no-events">
          <p>No events found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <EventCard
              key={event._id}
              event={event}
              onRegister={() => handleRegister(event._id)}
              isRegistered={registeredEvents.includes(event._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
