const express = require('express');
const router = express.Router();
const {
  onboardTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
} = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/auth');

router.post('/onboard', protect, authorize('Super Admin', 'Principal'), onboardTeacher);
router.get('/', protect, authorize('Super Admin', 'Principal', 'Office Admin'), getTeachers);
router.get('/:id', protect, getTeacherById);
router.put('/:id', protect, authorize('Super Admin', 'Principal'), updateTeacher);

module.exports = router;
