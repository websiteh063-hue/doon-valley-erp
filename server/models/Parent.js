const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    trim: true,
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
  },
  motherOccupation: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Parent', parentSchema);
