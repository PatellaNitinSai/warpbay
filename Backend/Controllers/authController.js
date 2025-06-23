import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username taken' });

    const user = await User.create({ username, password });
    res.json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    res.json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};