import React from 'react';
import '../styles/EventCard.css';

const EventCard = ({ event, onRegister, isRegistered }) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const spotsLeft = event.maxAttendees - event.attendees.length;

  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-title">{event.title}</h3>
        <span className={`event-category ${event.category}`}>{event.category}</span>
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-details">
        <div className="detail-row">
          <span className="detail-icon">📅</span>
          <span>{formattedDate} at {formattedTime}</span>
        </div>
        <div className="detail-row">
          <span className="detail-icon">📍</span>
          <span>{event.location}</span>
        </div>
        <div className="detail-row">
          <span className="detail-icon">👤</span>
          <span>Organized by {event.organizer}</span>
        </div>
        <div className="detail-row">
          <span className="detail-icon">👥</span>
          <span>{event.attendees.length}/{event.maxAttendees} attendees</span>
        </div>
      </div>
      <div className="event-footer">
        <div className={`spots-info ${spotsLeft <= 0 ? 'full' : spotsLeft <= 5 ? 'low' : ''}`}>
          {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Event is full'}
        </div>
        <button
          className={`register-btn ${isRegistered ? 'registered' : ''} ${spotsLeft <= 0 ? 'disabled' : ''}`}
          onClick={onRegister}
          disabled={spotsLeft <= 0}
        >
          {isRegistered ? '✓ Registered' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
