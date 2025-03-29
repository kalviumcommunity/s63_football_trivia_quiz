const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'football_trivia_secret', {
    expiresIn: '24h'
  });
};

// User registration
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        errors: {
          username: !username ? 'Username is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Validate username format and length
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ 
        message: 'Username must be between 3 and 30 characters' 
      });
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({ 
        message: 'Username can only contain letters, numbers, and underscores' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format' 
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!(hasUppercase && hasLowercase && hasNumber)) {
      return res.status(400).json({ 
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    // Save user to database - this will trigger the password hashing middleware
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);
    console.log(`\n${'='.repeat(80)}`);
    console.log(`[TOKEN GENERATED] User: ${user.username} (ID: ${user._id})`);
    console.log(`[JWT TOKEN VALUE] ${token}`);
    console.log(`${'='.repeat(80)}\n`);

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' // Use secure in production
    });
    console.log(`[AUTH] Token stored in cookie for user: ${user.username}`);

    // Return success with token and user data (excluding password)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        errors: {
          username: !username ? 'Username is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);
    console.log(`\n${'='.repeat(80)}`);
    console.log(`[TOKEN GENERATED] Login for user: ${user.username} (ID: ${user._id})`);
    console.log(`[JWT TOKEN VALUE] ${token}`);
    console.log(`${'='.repeat(80)}\n`);

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production' // Use secure in production
    });
    console.log(`[AUTH] Token stored in cookie for login: ${user.username}`);

    // Set username in cookie
    res.cookie('username', user.username, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/',
      sameSite: 'lax'
    });

    // Return success with token and user data (excluding password)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// User logout
exports.logout = async (req, res) => {
  try {
    // Clear the token and username cookies
    res.clearCookie('token', { path: '/' });
    res.clearCookie('username', { path: '/' });
    console.log(`\n${'='.repeat(80)}`);
    console.log(`[TOKEN CLEARED] Token and username cookies cleared during logout`);
    console.log(`${'='.repeat(80)}\n`);
    
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error retrieving user data' });
  }
};

// Get all users for dropdown
exports.getAllUsers = async (req, res) => {
  try {
    // Only return necessary fields for the dropdown
    const users = await User.find({})
      .select('_id username')
      .sort({ username: 1 }); // Sort alphabetically by username
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};