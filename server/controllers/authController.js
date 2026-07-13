const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Parent = require('../models/Parent');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

// @desc    Log in user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check account lockout
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(403).json({
        success: false,
        message: `Account is locked. Try again in ${remainingTime} minute(s).`,
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 mins lock
        await user.save();
        return res.status(403).json({
          success: false,
          message: 'Account locked due to 5 failed attempts. Please try again in 15 minutes.',
        });
      }
      await user.save();
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;

    // Save login history
    const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    user.loginHistory.push({ ip: clientIp, device: userAgent, loginAt: new Date() });
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Fetch related profile if applicable
    let profile = null;
    if (user.role === 'Student') {
      profile = await Student.findOne({ user: user._id });
    } else if (user.role === 'Teacher' || user.role === 'Class Teacher') {
      profile = await Teacher.findOne({ user: user._id });
    } else if (user.role === 'Parent') {
      profile = await Parent.findOne({ user: user._id });
    }

    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        status: user.status,
        isFirstLogin: user.isFirstLogin,
        email: user.email,
        mobile: user.mobile,
      },
      profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Refresh token is required' });
    }

    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.status === 'Inactive') {
      return res.status(401).json({ success: false, message: 'User not found or inactive' });
    }

    const newAccessToken = generateAccessToken(user);
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password (first login or normal change)
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ success: false, message: 'New password is required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify old password (skip only if it's the first login force reset, but standard is to check it)
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect old password' });
    }

    user.password = newPassword;
    user.isFirstLogin = false; // Mark first login password reset complete
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  refreshToken,
  changePassword,
};
