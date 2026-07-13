const Examination = require('../models/Examination');
const Mark = require('../models/Mark');
const Student = require('../models/Student');

// @desc    Create exam schedule
// @route   POST /api/exams
// @access  Private (Super Admin, Principal)
const createExam = async (req, res, next) => {
  try {
    const { name, session, startDate, endDate, status } = req.body;

    if (!name || !session) {
      return res.status(400).json({ success: false, message: 'Please provide exam name and session' });
    }

    const exam = new Examination({ name, session, startDate, endDate, status });
    const savedExam = await exam.save();

    res.status(201).json({ success: true, message: 'Exam created successfully!', exam: savedExam });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all exams
// @route   GET /api/exams
// @access  Private (All Roles)
const getExams = async (req, res, next) => {
  try {
    const { session } = req.query;
    const filter = {};
    if (session) filter.session = session;

    const exams = await Examination.find(filter).sort({ startDate: -1 });
    res.status(200).json({ success: true, count: exams.length, exams });
  } catch (error) {
    next(error);
  }
};

// @desc    Enter or update student marks in bulk
// @route   POST /api/exams/marks
// @access  Private (Teacher, Class Teacher, Principal, Super Admin)
const enterMarks = async (req, res, next) => {
  try {
    const { examId, class: className, section, subject, marksData } = req.body;
    // marksData: [{ studentId, theoryMarks, practicalMarks, maxMarks, remarks }]

    if (!examId || !className || !section || !subject || !marksData || !Array.isArray(marksData)) {
      return res.status(400).json({ success: false, message: 'Invalid marks parameters' });
    }

    const promises = marksData.map(async (item) => {
      const theory = parseFloat(item.theoryMarks || 0);
      const practical = parseFloat(item.practicalMarks || 0);
      const total = theory + practical;
      const max = parseFloat(item.maxMarks || 100);

      // Simple grading formula
      const percentage = (total / max) * 100;
      let grade = 'F';
      if (percentage >= 90) grade = 'A+';
      else if (percentage >= 80) grade = 'A';
      else if (percentage >= 70) grade = 'B';
      else if (percentage >= 60) grade = 'C';
      else if (percentage >= 50) grade = 'D';
      else if (percentage >= 33) grade = 'E';

      return Mark.findOneAndUpdate(
        { exam: examId, student: item.studentId, subject: subject },
        {
          exam: examId,
          student: item.studentId,
          class: className,
          section,
          subject,
          theoryMarks: theory,
          practicalMarks: practical,
          totalMarks: total,
          maxMarks: max,
          grade,
          remarks: item.remarks || '',
        },
        { upsert: true, new: true }
      );
    });

    const results = await Promise.all(promises);
    res.status(200).json({
      success: true,
      message: `Successfully updated ${results.length} marks record(s)`,
      results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get marks list
// @route   GET /api/exams/marks
// @access  Private (All Roles)
const getMarks = async (req, res, next) => {
  try {
    const { examId, studentId, class: className, section, subject } = req.query;
    const filter = {};

    if (examId) filter.exam = examId;
    if (studentId) filter.student = studentId;
    if (className) filter.class = className;
    if (section) filter.section = section;
    if (subject) filter.subject = subject;

    const marks = await Mark.find(filter).populate('student').populate('exam');
    res.status(200).json({ success: true, count: marks.length, marks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student report card summary
// @route   GET /api/exams/report-card/:studentId
// @access  Private (Student, Parent, Teacher, Admin)
const getReportCard = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { examId } = req.query; // optional: to get specific exam or all

    if (!examId) {
      return res.status(400).json({ success: false, message: 'Please specify the examId' });
    }

    const student = await Student.findById(studentId).populate('parent');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    const exam = await Examination.findById(examId);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam period not found' });
    }

    const marks = await Mark.find({ student: studentId, exam: examId });

    // Aggregate statistics
    const totalMax = marks.reduce((sum, m) => sum + m.maxMarks, 0);
    const totalObtained = marks.reduce((sum, m) => sum + m.totalMarks, 0);
    const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;

    let overallGrade = 'F';
    if (percentage >= 90) overallGrade = 'A+';
    else if (percentage >= 80) overallGrade = 'A';
    else if (percentage >= 70) overallGrade = 'B';
    else if (percentage >= 60) overallGrade = 'C';
    else if (percentage >= 50) overallGrade = 'D';
    else if (percentage >= 33) overallGrade = 'E';

    res.status(200).json({
      success: true,
      reportCard: {
        student: {
          id: student._id,
          name: `${student.firstName} ${student.lastName}`,
          admissionNo: student.admissionNo,
          class: student.class,
          section: student.section,
        },
        examName: exam.name,
        session: exam.session,
        subjects: marks.map(m => ({
          subject: m.subject,
          theoryMarks: m.theoryMarks,
          practicalMarks: m.practicalMarks,
          totalMarks: m.totalMarks,
          maxMarks: m.maxMarks,
          grade: m.grade,
          remarks: m.remarks,
        })),
        stats: {
          totalObtained,
          totalMax,
          percentage: Math.round(percentage * 100) / 100,
          overallGrade,
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExam,
  getExams,
  enterMarks,
  getMarks,
  getReportCard,
};
