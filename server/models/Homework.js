const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
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
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  attachments: [
    {
      name: String,
      url: String,
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Homework', homeworkSchema);
