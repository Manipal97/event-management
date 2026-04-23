const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelRegistration
} = require('../controllers/eventController');

// Get all events
router.get('/', getAllEvents);

// Get single event
router.get('/:id', getEventById);

// Create event
router.post('/', createEvent);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

// Register for event
router.post('/:id/register', registerForEvent);

// Cancel registration
router.post('/:id/cancel-registration', cancelRegistration);

module.exports = router;