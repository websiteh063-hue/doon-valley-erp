const mongoose = require('mongoose');

const examinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  session: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Draft', 'Active', 'Completed'],
    default: 'Draft',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Examination', examinationSchema);
