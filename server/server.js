require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes');
const feeRoutes = require('./routes/feeRoutes');
const examRoutes = require('./routes/examRoutes');
const errorHandler = require('./middleware/error');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api/', limiter);

// Connect to Database & Seed Admin
connectDB().then(() => {
  seedAdmin();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/exams', examRoutes);

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Doon Valley School ERP Backend is online!',
    timestamp: new Date()
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
