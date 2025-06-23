import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listEvents = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    const events = await Event.find(query)
      .sort('date')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerAttendee = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (event.attendees.includes(req.user._id))
      return res.status(400).json({ msg: 'Already registered' });

    event.attendees.push(req.user._id);
    await event.save();
    res.json({ msg: 'Registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'username');
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json(event.attendees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};