const Teacher = require('../models/Teacher');
const User = require('../models/User');

// @desc    Onboard a new teacher
// @route   POST /api/teachers/onboard
// @access  Private (Super Admin, Principal)
const onboardTeacher = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      qualification,
      experience,
      salary,
      joiningDate,
      subjects,
      classes,
      isClassTeacher // boolean flag, if true, role will be 'Class Teacher', else 'Teacher'
    } = req.body;

    if (!firstName || !lastName || !email || !mobile || !qualification || experience === undefined || !salary) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if email already registered as user
    const userExists = await User.findOne({ username: email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered as a user' });
    }

    // 1. Create Teacher User
    const role = isClassTeacher ? 'Class Teacher' : 'Teacher';
    const teacherUser = new User({
      username: email,
      password: '123456', // default password
      role: role,
      email: email,
      mobile: mobile,
      isFirstLogin: true,
    });
    const savedUser = await teacherUser.save();

    // 2. Create Teacher Profile
    const teacherDoc = new Teacher({
      user: savedUser._id,
      firstName,
      lastName,
      email,
      mobile,
      qualification,
      experience,
      salary,
      joiningDate,
      subjects: subjects || [],
      classes: classes || [],
    });
    const savedTeacher = await teacherDoc.save();

    res.status(201).json({
      success: true,
      message: `${role} onboarded successfully!`,
      teacher: savedTeacher,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private (Super Admin, Principal, Office Admin)
const getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate('user', '-password');
    res.status(200).json({ success: true, count: teachers.length, teachers });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single teacher profile
// @route   GET /api/teachers/:id
// @access  Private (All Roles)
const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('user', '-password');
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }
    res.status(200).json({ success: true, teacher });
  } catch (error) {
    next(error);
  }
};

// @desc    Update teacher profile
// @route   PUT /api/teachers/:id
// @access  Private (Super Admin, Principal)
const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    // If role is updated, sync back to User schema
    if (req.body.isClassTeacher !== undefined) {
      const user = await User.findById(teacher.user);
      if (user) {
        user.role = req.body.isClassTeacher ? 'Class Teacher' : 'Teacher';
        await user.save();
      }
    }

    res.status(200).json({ success: true, message: 'Teacher profile updated successfully', teacher });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  onboardTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
};
