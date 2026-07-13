const Homework = require('../models/Homework');
const Assignment = require('../models/Assignment');
const Student = require('../models/Student');

// @desc    Create a new homework assignment
// @route   POST /api/homework
// @access  Private (Teacher, Class Teacher, Principal, Super Admin)
const createHomework = async (req, res, next) => {
  try {
    const { class: className, section, subject, title, description, dueDate, attachments, teacherId } = req.body;

    if (!className || !section || !subject || !title || !description || !dueDate || !teacherId) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const homework = new Homework({
      class: className,
      section,
      subject,
      title,
      description,
      dueDate,
      attachments: attachments || [],
      teacher: teacherId,
    });

    const savedHomework = await homework.save();
    res.status(201).json({ success: true, message: 'Homework created successfully!', homework: savedHomework });
  } catch (error) {
    next(error);
  }
};

// @desc    Get homework list
// @route   GET /api/homework
// @access  Private (All Roles)
const getHomework = async (req, res, next) => {
  try {
    const { class: className, section, subject } = req.query;
    const filter = {};

    if (className) filter.class = className;
    if (section) filter.section = section;
    if (subject) filter.subject = subject;

    const homeworkList = await Homework.find(filter).populate('teacher').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: homeworkList.length, homeworkList });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit homework assignment
// @route   POST /api/homework/:id/submit
// @access  Private (Student)
const submitAssignment = async (req, res, next) => {
  try {
    const homeworkId = req.params.id;
    const { studentId, content, attachments } = req.body;

    if (!studentId) {
      return res.status(400).json({ success: false, message: 'Student ID is required' });
    }

    // Verify homework exists
    const homeworkDoc = await Homework.findById(homeworkId);
    if (!homeworkDoc) {
      return res.status(404).json({ success: false, message: 'Homework not found' });
    }

    // Check if late
    const isLate = new Date() > new Date(homeworkDoc.dueDate);
    const status = isLate ? 'Late' : 'Submitted';

    const assignment = await Assignment.findOneAndUpdate(
      { homework: homeworkId, student: studentId },
      {
        homework: homeworkId,
        student: studentId,
        submissionDate: new Date(),
        content: content || '',
        attachments: attachments || [],
        status: status,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: 'Assignment submitted successfully!', assignment });
  } catch (error) {
    next(error);
  }
};

// @desc    Review & Grade assignment submission
// @route   PUT /api/homework/assignments/:id/review
// @access  Private (Teacher, Class Teacher, Principal, Super Admin)
const reviewAssignment = async (req, res, next) => {
  try {
    const { marks, remarks } = req.body;
    if (marks === undefined) {
      return res.status(400).json({ success: false, message: 'Marks are required' });
    }

    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        marks,
        remarks: remarks || '',
        status: 'Reviewed',
      },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment submission not found' });
    }

    res.status(200).json({ success: true, message: 'Assignment graded successfully!', assignment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get submissions for a homework
// @route   GET /api/homework/:id/submissions
// @access  Private (Teacher, Class Teacher, Principal, Super Admin)
const getSubmissionsByHomework = async (req, res, next) => {
  try {
    const submissions = await Assignment.find({ homework: req.params.id })
      .populate('student')
      .sort({ submissionDate: -1 });

    res.status(200).json({ success: true, count: submissions.length, submissions });
  } catch (error) {
    next(error);
  }
};

// @desc    Get assignments submitted by a student
// @route   GET /api/homework/student/:studentId
// @access  Private (Student, Parent, Teacher, Admin)
const getSubmissionsByStudent = async (req, res, next) => {
  try {
    const submissions = await Assignment.find({ student: req.params.studentId })
      .populate({
        path: 'homework',
        populate: { path: 'teacher' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: submissions.length, submissions });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHomework,
  getHomework,
  submitAssignment,
  reviewAssignment,
  getSubmissionsByHomework,
  getSubmissionsByStudent,
};
