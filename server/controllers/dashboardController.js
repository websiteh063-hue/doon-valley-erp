const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const FeePayment = require('../models/FeePayment');

const getDashboardStats = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    
    // Count new admissions in the current session/year
    const newAdmissions = await Student.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) }
    });

    // Compute fee collection sum
    const payments = await FeePayment.find({});
    const totalCollected = payments.reduce((sum, p) => sum + (p.amountPaid || p.amount || 0), 0);

    // Compute average attendance rate
    const todayStr = new Date().toISOString().split('T')[0];
    const todayRecords = await Attendance.find({ date: todayStr });
    
    let attendanceRate = '0.0%';
    if (todayRecords.length > 0) {
      const present = todayRecords.filter(r => r.status === 'Present').length;
      attendanceRate = `${((present / todayRecords.length) * 100).toFixed(1)}%`;
    }

    res.status(200).json({
      success: true,
      stats: {
        totalStudents: totalStudents,
        totalTeachers: totalTeachers,
        todayAttendance: todayRecords.length > 0 ? attendanceRate : '0.0%',
        feeCollected: `₹${totalCollected.toLocaleString()}`,
        pendingFees: '₹0',
        birthdays: [],
        holidays: [
          { name: 'Independence Day', date: '15 Aug 2026' },
          { name: 'Raksha Bandhan', date: '28 Aug 2026' }
        ],
        recentAlerts: []
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
