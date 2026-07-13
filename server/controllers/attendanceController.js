const Attendance = require('../models/Attendance');

// @desc    Mark attendance for multiple users (students or teachers)
// @route   POST /api/attendance/mark
// @access  Private (Super Admin, Principal, Teacher, Class Teacher)
const markAttendance = async (req, res, next) => {
  try {
    const { date, userType, attendanceData } = req.body; // attendanceData: [{ userId, status, remarks }]

    if (!date || !userType || !attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({ success: false, message: 'Invalid attendance input' });
    }

    const attendanceDate = new Date(date);
    // Normalize date to start of day
    attendanceDate.setHours(0, 0, 0, 0);

    const promises = attendanceData.map(async (item) => {
      return Attendance.findOneAndUpdate(
        { user: item.userId, date: attendanceDate },
        {
          user: item.userId,
          userType: userType,
          date: attendanceDate,
          status: item.status,
          remarks: item.remarks || '',
        },
        { upsert: true, new: true }
      );
    });

    const results = await Promise.all(promises);

    res.status(200).json({
      success: true,
      message: `Successfully marked attendance for ${results.length} record(s)`,
      results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance stats / records for a specific date/class
// @route   GET /api/attendance
// @access  Private (All Roles)
const getAttendance = async (req, res, next) => {
  try {
    const { date, userType, userId } = req.query;
    const filter = {};

    if (userType) filter.userType = userType;
    if (userId) filter.user = userId;

    if (date) {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);
      filter.date = targetDate;
    }

    const records = await Attendance.find(filter).populate('user', 'username role email mobile');
    res.status(200).json({ success: true, count: records.length, records });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance summary for a student over a month/year
// @route   GET /api/attendance/student-summary/:studentUserId
// @access  Private (Student, Parent, Teacher, Admin)
const getStudentAttendanceSummary = async (req, res, next) => {
  try {
    const { studentUserId } = req.params;
    const { year, month } = req.query; // e.g. year=2026, month=0-11

    const filter = { user: studentUserId };

    if (year && month) {
      const startDate = new Date(parseInt(year), parseInt(month), 1);
      const endDate = new Date(parseInt(year), parseInt(month) + 1, 0, 23, 59, 59, 999);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const records = await Attendance.find(filter);
    
    // Calculate stats
    const totalDays = records.length;
    const present = records.filter(r => r.status === 'Present').length;
    const absent = records.filter(r => r.status === 'Absent').length;
    const late = records.filter(r => r.status === 'Late').length;
    const halfDay = records.filter(r => r.status === 'Half Day').length;

    const attendancePercentage = totalDays > 0 ? ((present + late * 0.8 + halfDay * 0.5) / totalDays) * 100 : 100;

    res.status(200).json({
      success: true,
      summary: {
        totalDays,
        present,
        absent,
        late,
        halfDay,
        percentage: Math.round(attendancePercentage * 100) / 100,
      },
      records
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  markAttendance,
  getAttendance,
  getStudentAttendanceSummary,
};
