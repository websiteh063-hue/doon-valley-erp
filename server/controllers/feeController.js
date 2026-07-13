const Fee = require('../models/Fee');
const FeePayment = require('../models/FeePayment');
const Student = require('../models/Student');

// @desc    Create/Set fee structure for class/session
// @route   POST /api/fees/structure
// @access  Private (Super Admin, Principal)
const createFeeStructure = async (req, res, next) => {
  try {
    const { classGroup, session, heads } = req.body;

    if (!classGroup || !session || !heads || !Array.isArray(heads)) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const totalAmount = heads.reduce((sum, h) => sum + parseFloat(h.amount || 0), 0);

    const fee = await Fee.findOneAndUpdate(
      { classGroup, session },
      { classGroup, session, heads, totalAmount },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, message: 'Fee structure configured successfully!', fee });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all fee structures
// @route   GET /api/fees/structures
// @access  Private (All Roles)
const getFeeStructures = async (req, res, next) => {
  try {
    const { session, classGroup } = req.query;
    const filter = {};
    if (session) filter.session = session;
    if (classGroup) filter.classGroup = classGroup;

    const structures = await Fee.find(filter);
    res.status(200).json({ success: true, count: structures.length, structures });
  } catch (error) {
    next(error);
  }
};

// @desc    Collect a fee payment
// @route   POST /api/fees/collect
// @access  Private (Office Admin, Super Admin, Principal)
const collectFee = async (req, res, next) => {
  try {
    const { studentId, session, amountPaid, discount, fine, paymentMode, transactionId, remarks } = req.body;

    if (!studentId || !session || amountPaid === undefined || !paymentMode) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    // Verify student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    // Generate unique receipt number
    const receiptNo = `REC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Verify fee structure exists for this class/session
    // Find if class is in one of the groups, or check standard fee
    let classGroup = 'I-V';
    if (['Nursery', 'KG', 'LKG', 'UKG'].includes(student.class)) {
      classGroup = 'Nursery-KG';
    } else if (['VI', 'VII', 'VIII'].includes(student.class) || student.class.includes('6') || student.class.includes('7') || student.class.includes('8')) {
      classGroup = 'VI-VIII';
    } else if (['IX', 'X', 'XI', 'XII'].includes(student.class) || student.class.includes('9') || student.class.includes('10')) {
      classGroup = 'IX-X';
    }

    const structure = await Fee.findOne({ classGroup, session });
    const totalDue = structure ? structure.totalAmount : 5000; // fallback default fee

    // Sum previous payments for this student in this session
    const previousPayments = await FeePayment.find({ student: studentId, session });
    const totalPaidBefore = previousPayments.reduce((sum, p) => sum + p.amountPaid, 0);

    const newTotalPaid = totalPaidBefore + parseFloat(amountPaid) + parseFloat(discount || 0) - parseFloat(fine || 0);
    const status = newTotalPaid >= totalDue ? 'Paid' : 'Partial';

    const payment = new FeePayment({
      student: studentId,
      session,
      amountPaid,
      discount: discount || 0,
      fine: fine || 0,
      paymentMode,
      transactionId,
      status,
      receiptNo,
      remarks,
    });

    const savedPayment = await payment.save();
    res.status(201).json({
      success: true,
      message: 'Fee collected successfully!',
      payment: savedPayment,
      outstanding: Math.max(0, totalDue - newTotalPaid),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get fee payments list
// @route   GET /api/fees/payments
// @access  Private (All Roles)
const getPayments = async (req, res, next) => {
  try {
    const { studentId, session } = req.query;
    const filter = {};

    if (studentId) filter.student = studentId;
    if (session) filter.session = session;

    const payments = await FeePayment.find(filter).populate('student').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: payments.length, payments });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate PDF receipt for a payment
// @route   GET /api/fees/payments/:id/receipt-pdf
// @access  Private (All Roles)
const getReceiptPdf = async (req, res, next) => {
  try {
    const payment = await FeePayment.findById(req.params.id).populate('student');
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    // Since we'll send a PDF, we can use simple HTML response or generate dynamic content.
    // For now, let's return JSON metadata. In production, PDFKit would generate the buffer.
    res.status(200).json({
      success: true,
      receiptNo: payment.receiptNo,
      date: payment.createdAt,
      studentName: `${payment.student.firstName} ${payment.student.lastName}`,
      admissionNo: payment.student.admissionNo,
      class: payment.student.class,
      session: payment.session,
      amountPaid: payment.amountPaid,
      discount: payment.discount,
      fine: payment.fine,
      paymentMode: payment.paymentMode,
      transactionId: payment.transactionId,
      status: payment.status,
      message: 'PDF Receipt generator stub'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFeeStructure,
  getFeeStructures,
  collectFee,
  getPayments,
  getReceiptPdf,
};
