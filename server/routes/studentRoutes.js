const express = require('express');
const router = express.Router();
const {
  admitStudent,
  getStudents,
  getStudentById,
  updateStudent,
  promoteStudents,
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/admit', protect, authorize('Super Admin', 'Office Admin', 'Principal'), admitStudent);
router.get('/', protect, authorize('Super Admin', 'Principal', 'Office Admin', 'Teacher', 'Class Teacher'), getStudents);
router.get('/:id', protect, getStudentById);
router.put('/:id', protect, authorize('Super Admin', 'Office Admin', 'Principal'), updateStudent);
router.post('/promote', protect, authorize('Super Admin', 'Principal'), promoteStudents);

module.exports = router;
