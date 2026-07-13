const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAttendance,
  getStudentAttendanceSummary,
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');

router.post('/mark', protect, authorize('Super Admin', 'Principal', 'Teacher', 'Class Teacher'), markAttendance);
router.get('/', protect, getAttendance);
router.get('/student-summary/:studentUserId', protect, getStudentAttendanceSummary);

module.exports = router;
