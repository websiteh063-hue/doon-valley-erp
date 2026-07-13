const express = require('express');
const router = express.Router();
const {
  createFeeStructure,
  getFeeStructures,
  collectFee,
  getPayments,
  getReceiptPdf,
} = require('../controllers/feeController');
const { protect, authorize } = require('../middleware/auth');

router.post('/structure', protect, authorize('Super Admin', 'Principal'), createFeeStructure);
router.get('/structures', protect, getFeeStructures);
router.post('/collect', protect, authorize('Super Admin', 'Principal', 'Office Admin'), collectFee);
router.get('/payments', protect, getPayments);
router.get('/payments/:id/receipt-pdf', protect, getReceiptPdf);

module.exports = router;
