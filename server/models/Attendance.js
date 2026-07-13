const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userType: {
    type: String,
    enum: ['Student', 'Teacher'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Half Day'],
    required: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Compound index to ensure a user only has one attendance entry per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
