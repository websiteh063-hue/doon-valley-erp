const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
  },
  admissionNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  rollNo: {
    type: String,
    trim: true,
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
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  bloodGroup: {
    type: String,
    trim: true,
  },
  aadhaar: {
    type: String,
    trim: true,
  },
  religion: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    default: '',
  },
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
  medicalHistory: {
    type: String,
    trim: true,
  },
  previousSchool: {
    type: String,
    trim: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  penNo: {
    type: String,
    trim: true,
    default: '',
  },
  currentSession: {
    type: String,
    required: true,
  },
  class: {
    type: String, // String representation or Class ref
    required: true,
  },
  section: {
    type: String, // String representation or Section ref
    required: true,
  },
}, {
  timestamps: true,
});

studentSchema.index({ class: 1, section: 1, currentSession: 1 });

module.exports = mongoose.model('Student', studentSchema);
