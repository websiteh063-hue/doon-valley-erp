const Student = require('../models/Student');
const User = require('../models/User');
const Parent = require('../models/Parent');

// @desc    Admit a new student
// @route   POST /api/students/admit
// @access  Private (Super Admin, Office Admin, Principal)
const admitStudent = async (req, res, next) => {
  try {
    const {
      admissionNo,
      rollNo,
      firstName,
      lastName,
      dob,
      gender,
      bloodGroup,
      aadhaar,
      religion,
      category,
      medicalHistory,
      previousSchool,
      address,
      class: className,
      section,
      currentSession,
      parentDetails // { fatherName, motherName, mobile, email, fatherOccupation, motherOccupation }
    } = req.body;

    if (!admissionNo || !firstName || !lastName || !dob || !gender || !className || !section || !currentSession || !parentDetails) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if student user already exists
    const userExists = await User.findOne({ username: admissionNo });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Admission number already exists as a user' });
    }

    // Check if student profile exists
    const studentExists = await Student.findOne({ admissionNo });
    if (studentExists) {
      return res.status(400).json({ success: false, message: 'Student with this admission number already exists' });
    }

    // 1. Process Parent
    let parentDoc = await Parent.findOne({ mobile: parentDetails.mobile });
    if (!parentDoc) {
      // Create user for Parent
      const parentUser = new User({
        username: parentDetails.mobile,
        password: parentDetails.mobile, // default password is mobile number
        role: 'Parent',
        mobile: parentDetails.mobile,
        email: parentDetails.email,
        isFirstLogin: true
      });
      const savedParentUser = await parentUser.save();

      // Create Parent profile
      parentDoc = new Parent({
        user: savedParentUser._id,
        fatherName: parentDetails.fatherName,
        fatherOccupation: parentDetails.fatherOccupation,
        motherName: parentDetails.motherName,
        motherOccupation: parentDetails.motherOccupation,
        mobile: parentDetails.mobile,
        email: parentDetails.email,
        children: []
      });
      await parentDoc.save();
    }

    // 2. Create Student User
    const studentUser = new User({
      username: admissionNo,
      password: parentDetails.mobile, // default password is parent mobile
      role: 'Student',
      isFirstLogin: true,
      mobile: parentDetails.mobile
    });
    const savedStudentUser = await studentUser.save();

    // 3. Create Student Profile
    const studentDoc = new Student({
      user: savedStudentUser._id,
      parent: parentDoc._id,
      admissionNo,
      rollNo,
      firstName,
      lastName,
      dob,
      gender,
      bloodGroup,
      aadhaar,
      religion,
      category,
      medicalHistory,
      previousSchool,
      address,
      class: className,
      section,
      currentSession
    });
    const savedStudent = await studentDoc.save();

    // 4. Update Parent children array
    parentDoc.children.push(savedStudent._id);
    await parentDoc.save();

    res.status(201).json({
      success: true,
      message: 'Student admitted successfully!',
      student: savedStudent
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Private (Super Admin, Principal, Office Admin, Teacher)
const getStudents = async (req, res, next) => {
  try {
    const { class: className, section } = req.query;
    const filter = {};
    if (className) filter.class = className;
    if (section) filter.section = section;

    const students = await Student.find(filter).populate('parent');
    res.status(200).json({ success: true, count: students.length, students });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student profile
// @route   GET /api/students/:id
// @access  Private (All Roles)
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('parent').populate('user', '-password');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }
    res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student profile
// @route   PUT /api/students/:id
// @access  Private (Super Admin, Office Admin, Principal)
const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, message: 'Student profile updated successfully', student });
  } catch (error) {
    next(error);
  }
};

// @desc    Promote students in bulk
// @route   POST /api/students/promote
// @access  Private (Super Admin, Principal)
const promoteStudents = async (req, res, next) => {
  try {
    const { studentIds, nextClass, nextSection, nextSession } = req.body;
    if (!studentIds || !Array.isArray(studentIds) || !nextClass || !nextSection || !nextSession) {
      return res.status(400).json({ success: false, message: 'Invalid promotion parameters' });
    }

    const result = await Student.updateMany(
      { _id: { $in: studentIds } },
      {
        $set: {
          class: nextClass,
          section: nextSection,
          currentSession: nextSession,
        }
      }
    );

    res.status(200).json({
      success: true,
      message: `Successfully promoted ${result.modifiedCount} student(s) to ${nextClass} - ${nextSection}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  admitStudent,
  getStudents,
  getStudentById,
  updateStudent,
  promoteStudents,
};
