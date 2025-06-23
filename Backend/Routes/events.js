import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createEvent,
  listEvents,
  getEventById,
  registerAttendee,
  getAttendees
} from '../controllers/eventController.js';

const router = express.Router();

// Create an event (protected)
router.post('/', protect, createEvent);

// List events (public)
router.get('/', listEvents);

// Get single event (public)
router.get('/:id', getEventById);

// Register for event (protected)
router.post('/:id/register', protect, registerAttendee);

// Get attendees (public)
router.get('/:id/attendees', getAttendees);

export default router;