const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examination',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  theoryMarks: {
    type: Number,
    default: 0,
  },
  practicalMarks: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
    default: 100,
  },
  grade: {
    type: String,
  },
  remarks: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// A student can only have one marks entry per subject per exam
markSchema.index({ exam: 1, student: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('Mark', markSchema);
