const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  homework: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homework',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    trim: true,
  },
  attachments: [
    {
      name: String,
      url: String,
    },
  ],
  status: {
    type: String,
    enum: ['Submitted', 'Reviewed', 'Late'],
    default: 'Submitted',
  },
  marks: {
    type: Number,
    min: 0,
  },
  remarks: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Avoid duplicate submissions by the same student for the same homework
assignmentSchema.index({ homework: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
