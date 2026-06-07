const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

function createToken(user) {
  return jwt.sign(publicUser(user), process.env.JWT_SECRET, { expiresIn: '2h' });
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'This email is already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: passwordHash,
      role: 'user'
    });

    res.status(201).json({
      token: createToken(user),
      user: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ message: 'Wrong email or password.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Wrong email or password.' });
    }

    res.json({
      token: createToken(user),
      user: publicUser(user)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
};

exports.getMe = (req, res) => {
  res.json({ user: req.user });
};
