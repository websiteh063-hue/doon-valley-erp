const express = require('express');
const router = express.Router();
const {
  createHomework,
  getHomework,
  submitAssignment,
  reviewAssignment,
  getSubmissionsByHomework,
  getSubmissionsByStudent,
} = require('../controllers/homeworkController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('Super Admin', 'Principal', 'Teacher', 'Class Teacher'), createHomework);
router.get('/', protect, getHomework);
router.post('/:id/submit', protect, authorize('Student'), submitAssignment);
router.put('/assignments/:id/review', protect, authorize('Super Admin', 'Principal', 'Teacher', 'Class Teacher'), reviewAssignment);
router.get('/:id/submissions', protect, authorize('Super Admin', 'Principal', 'Teacher', 'Class Teacher'), getSubmissionsByHomework);
router.get('/student/:studentId', protect, getSubmissionsByStudent);

module.exports = router;
