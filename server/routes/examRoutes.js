const express = require('express');
const router = express.Router();
const {
  createExam,
  getExams,
  enterMarks,
  getMarks,
  getReportCard,
} = require('../controllers/examController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('Super Admin', 'Principal'), createExam);
router.get('/', protect, getExams);
router.post('/marks', protect, authorize('Super Admin', 'Principal', 'Teacher', 'Class Teacher'), enterMarks);
router.get('/marks', protect, getMarks);
router.get('/report-card/:studentId', protect, getReportCard);

module.exports = router;
