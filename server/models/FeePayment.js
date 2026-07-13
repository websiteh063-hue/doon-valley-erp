const mongoose = require('mongoose');

const feePaymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  fine: {
    type: Number,
    default: 0,
    min: 0,
  },
  paymentMode: {
    type: String,
    enum: ['Cash', 'UPI', 'Card', 'Net Banking', 'Razorpay'],
    required: true,
  },
  transactionId: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Paid', 'Partial'],
    required: true,
  },
  receiptNo: {
    type: String,
    required: true,
    unique: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('FeePayment', feePaymentSchema);
