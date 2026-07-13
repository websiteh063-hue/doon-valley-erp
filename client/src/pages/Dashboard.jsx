import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Users, Contact, CheckCircle, Wallet, Cake, Calendar, BellRing } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, we'd query real aggregation endpoints based on role.
    // For demo/prototype and reliable loading, we provide gorgeous mock dashboards
    // prepopulated with custom metrics that match the specifications.
    const timer = setTimeout(() => {
      setStats({
        totalStudents: 1250,
        totalTeachers: 78,
        todayAttendance: '94.2%',
        feeCollected: '₹14.2L',
        pendingFees: '₹2.8L',
        birthdays: [
          { name: 'Aarav Sharma', class: 'Class VI-A' },
          { name: 'Priya Verma', class: 'Class IX-B' }
        ],
        holidays: [
          { name: 'Independence Day', date: '15 Aug 2026' },
          { name: 'Raksha Bandhan', date: '28 Aug 2026' }
        ],
        recentAlerts: [
          { title: 'Fee Reminder', body: 'Q2 Tuition Fees due by August 10th.', time: '2 hours ago' },
          { title: 'Unit Test Results', body: 'UT-1 Reports are now available.', time: '1 day ago' }
        ]
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Common styles
  const cardClass = "glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden";

  // Render Admin / Principal view
  if (user?.role === 'Super Admin' || user?.role === 'Principal') {
    const admissionTrendData = {
      labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
      datasets: [
        {
          label: 'Admissions',
          data: [750, 890, 1020, 1140, 1210, 1250],
          fill: false,
          borderColor: '#6366f1',
          tension: 0.4,
        },
      ],
    };

    const feeCollectionData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Collected (Lakhs)',
          data: [15, 12, 10, 14],
          backgroundColor: 'rgba(6, 182, 212, 0.6)',
          borderRadius: 8,
        },
      ],
    };

    const genderRatioData = {
      labels: ['Boys', 'Girls'],
      datasets: [
        {
          data: [54, 46],
          backgroundColor: ['#6366f1', '#ec4899'],
          borderWidth: 0,
        },
      ],
    };

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">School Dashboard</h1>
          <p className="text-slate-400 text-sm">Welcome back, {user?.username}. Here is the overview of Doon Valley High School.</p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className={cardClass}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Students</span>
              <Users size={20} className="text-indigo-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{stats.totalStudents}</p>
            <span className="text-[10px] text-emerald-400 font-semibold">+4% vs last session</span>
          </div>

          <div className={cardClass}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Teachers</span>
              <Contact size={20} className="text-cyan-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{stats.totalTeachers}</p>
            <span className="text-[10px] text-slate-400 font-semibold">Active staff payroll</span>
          </div>

          <div className={cardClass}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Today's Attendance</span>
              <CheckCircle size={20} className="text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{stats.todayAttendance}</p>
            <span className="text-[10px] text-emerald-400 font-semibold">98.5% teacher attendance</span>
          </div>

          <div className={cardClass}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Fee Collection</span>
              <Wallet size={20} className="text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{stats.feeCollected}</p>
            <span className="text-[10px] text-cyan-400 font-semibold">Q2 Term Active</span>
          </div>

          <div className={cardClass}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Fees</span>
              <Wallet size={20} className="text-rose-400" />
            </div>
            <p className="text-3xl font-extrabold text-white">{stats.pendingFees}</p>
            <span className="text-[10px] text-rose-400 font-semibold">9 defaulters predicted</span>
          </div>
        </div>

        {/* Charts & Mini Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-6">
            <h3 className="font-bold text-white text-base">Admissions & Fees Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[260px] items-center">
              <div>
                <Line data={admissionTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div>
                <Bar data={feeCollectionData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
            <h3 className="font-bold text-white text-base mb-4">Student Gender Ratio</h3>
            <div className="h-[200px] flex items-center justify-center">
              <Doughnut data={genderRatioData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Birthday List */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <Cake size={18} />
              <h3 className="font-bold text-white text-sm">Today's Birthdays</h3>
            </div>
            <div className="space-y-3">
              {stats.birthdays.map((b) => (
                <div key={b.name} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                  <p className="text-sm font-semibold text-slate-200">{b.name}</p>
                  <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{b.class}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Holidays */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-cyan-400">
              <Calendar size={18} />
              <h3 className="font-bold text-white text-sm">Upcoming Holidays</h3>
            </div>
            <div className="space-y-3">
              {stats.holidays.map((h) => (
                <div key={h.name} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                  <p className="text-sm font-semibold text-slate-200">{h.name}</p>
                  <span className="text-xs text-slate-400">{h.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Circular/Notice board */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-amber-400">
              <BellRing size={18} />
              <h3 className="font-bold text-white text-sm">Recent Bulletins</h3>
            </div>
            <div className="space-y-3">
              {stats.recentAlerts.map((a) => (
                <div key={a.title} className="py-2 border-b border-slate-800 last:border-0 space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-200">{a.title}</p>
                    <span className="text-[10px] text-slate-500">{a.time}</span>
                  </div>
                  <p className="text-xs text-slate-400">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Fallback / Teacher / Student Portal dashboards (rendered beautifully as profiles)
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">{user?.role} Portal</h1>
        <p className="text-slate-400 text-sm">Welcome back, {user?.username}. Access your schedules and records here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white">Daily Schedule</h2>
          <div className="space-y-3">
            <div className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-850">
              <div className="text-indigo-400 font-bold text-sm tracking-wide shrink-0">09:00 AM</div>
              <div>
                <h4 className="font-bold text-slate-200 text-sm">Class VII - Mathematics</h4>
                <p className="text-xs text-slate-400">Main Block, Room 102</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-850">
              <div className="text-indigo-400 font-bold text-sm shrink-0">11:00 AM</div>
              <div>
                <h4 className="font-bold text-slate-200 text-sm">Class VIII - Algebra Basics</h4>
                <p className="text-xs text-slate-400">Library Seminar Hall</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-850">
              <div className="text-indigo-400 font-bold text-sm shrink-0">01:30 PM</div>
              <div>
                <h4 className="font-bold text-slate-200 text-sm">Class X - Advanced Trigonometry</h4>
                <p className="text-xs text-slate-400">Science Lab Wing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Portal Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-sm text-slate-400">Current Session</span>
                <span className="text-sm font-semibold text-white">2026-2027</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-sm text-slate-400">Attendance status</span>
                <span className="text-sm font-semibold text-emerald-400">95.8% (Good)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-400">Associated Campus</span>
                <span className="text-sm font-semibold text-white">Doon Valley Campus A</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Circulars & Announcements</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-900/40 rounded-xl space-y-1">
                <h5 className="text-xs font-bold text-indigo-400">Aug 01, 2026</h5>
                <p className="text-xs text-slate-200 font-medium">Mid-Term Exams schedule released</p>
              </div>
              <div className="p-3 bg-slate-900/40 rounded-xl space-y-1">
                <h5 className="text-xs font-bold text-indigo-400">Jul 28, 2026</h5>
                <p className="text-xs text-slate-200 font-medium">School fees must be cleared before mid-terms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
