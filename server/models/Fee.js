const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  classGroup: {
    type: String, // e.g. 'Nursery-KG', 'I-V', 'VI-VIII', 'IX-X' or specific class 'Class I'
    required: true,
  },
  session: {
    type: String, // e.g. '2026-2027'
    required: true,
  },
  heads: [
    {
      headName: {
        type: String, // e.g. 'Tuition', 'Admission', 'Transport', 'Exam', 'Annual', 'Miscellaneous'
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true,
});

// Ensure only one fee structure exists for a class group per session
feeSchema.index({ classGroup: 1, session: 1 }, { unique: true });

module.exports = mongoose.model('Fee', feeSchema);
