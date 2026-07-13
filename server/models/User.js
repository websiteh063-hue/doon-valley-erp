const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Principal', 'Office Admin', 'Teacher', 'Class Teacher', 'Student', 'Parent'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: {
    type: Date,
  },
  loginHistory: [
    {
      ip: String,
      device: String,
      loginAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
