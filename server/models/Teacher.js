const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  qualification: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  subjects: [
    {
      type: String,
    },
  ],
  classes: [
    {
      class: String,
      section: String,
    },
  ],
  documents: [
    {
      name: String,
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Teacher', teacherSchema);
