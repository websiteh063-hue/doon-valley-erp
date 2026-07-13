import React, { useState } from 'react';
import { Calendar, ClipboardCheck, FileText, CheckCircle, Clock, Download, DollarSign } from 'lucide-react';

// -------------------------------------------------------------
// 1. Student / Child Attendance View
// -------------------------------------------------------------
export function StudentAttendance() {
  const logs = [
    { date: '2026-07-13', status: 'Present', session: 'Morning & Afternoon' },
    { date: '2026-07-12', status: 'Present', session: 'Morning & Afternoon' },
    { date: '2026-07-11', status: 'Present', session: 'Morning & Afternoon' },
    { date: '2026-07-10', status: 'Absent', session: 'Medical Leave' },
    { date: '2026-07-09', status: 'Present', session: 'Morning & Afternoon' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Attendance Journal</h1>
        <p className="text-slate-400 text-sm">Monitor child presence ratios, leave balance applications, and term totals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-5 border border-slate-850 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Attendance Rate</span>
            <p className="text-lg font-black text-white">94.2%</p>
            <span className="text-[9px] text-emerald-450">Excel Status: Excellent</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-850 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Days Present</span>
            <p className="text-lg font-black text-white">82 Days</p>
            <span className="text-[9px] text-slate-550">Active Academic Session</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-850 flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Excused Leaves</span>
            <p className="text-lg font-black text-white">5 Days</p>
            <span className="text-[9px] text-rose-455">1 Absent Without Excuse</span>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
              <th className="py-4.5 px-6">Date</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-right">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/50">
            {logs.map((l) => (
              <tr key={l.date} className="hover:bg-slate-900/20 transition-all duration-200">
                <td className="py-4.5 px-6 font-mono font-bold text-slate-350">{l.date}</td>
                <td className="py-4.5 px-6">
                  <span className={`badge-${l.status === 'Present' ? 'emerald' : 'rose'} font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide`}>
                    {l.status}
                  </span>
                </td>
                <td className="py-4.5 px-6 text-slate-400 font-semibold text-right">{l.session}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Student / Child Homework View
// -------------------------------------------------------------
export function StudentHomework() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Calculus Assignment II', subject: 'Mathematics', deadline: '2026-07-20', status: 'Pending', description: 'Complete Chapter 4 exercise questions 1 to 15 in the practical notebook.' },
    { id: 2, title: 'Optics Lab Project', subject: 'Physics', deadline: '2026-07-22', status: 'Submitted', description: 'Draw ray diagrams for concave and convex mirrors.' }
  ]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Coursework & Tasks</h1>
        <p className="text-slate-400 text-sm">Download class assignments, check task deadlines, and upload homework files.</p>
      </div>

      <div className="space-y-4">
        {tasks.map((t) => (
          <div key={t.id} className="glass-panel rounded-2xl p-6 border border-slate-850 space-y-4 hover:border-slate-800 transition-colors">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="badge-cyan font-bold px-2.5 py-1 rounded-xl text-[8px] uppercase tracking-wide">
                  {t.subject}
                </span>
                <h4 className="font-extrabold text-white text-base pt-1">{t.title}</h4>
              </div>
              <span className={`badge-${t.status === 'Submitted' ? 'emerald' : 'rose'} font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide`}>
                {t.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>
            <div className="flex justify-between items-center pt-3 border-t border-slate-850/40 text-xs">
              <span className="text-[10px] text-rose-455 font-bold uppercase tracking-wider">Due Date: {t.deadline}</span>
              {t.status === 'Pending' ? (
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow">
                  Upload Assignment
                </button>
              ) : (
                <span className="text-emerald-450 font-bold flex items-center gap-1">
                  ✓ Submitted
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. Student / Child Exams & Results View
// -------------------------------------------------------------
export function StudentResults() {
  const marks = [
    { subject: 'Mathematics', score: 85, max: 100, grade: 'A2', remarks: 'Excellent performance' },
    { subject: 'Physics', score: 92, max: 100, grade: 'A1', remarks: 'Class topper' },
    { subject: 'Chemistry', score: 78, max: 100, grade: 'B1', remarks: 'Good, can improve' },
    { subject: 'English Literature', score: 88, max: 100, grade: 'A2', remarks: 'Very expressive writer' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Academic Report Card</h1>
          <p className="text-slate-400 text-sm">Download term marksheets, view subject grades, and check assessment criteria.</p>
        </div>
        <button className="btn-glow px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all shadow flex items-center gap-2 cursor-pointer uppercase tracking-wider">
          <Download size={14} />
          Print PDF Marksheet
        </button>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
              <th className="py-4.5 px-6">Subject</th>
              <th className="py-4.5 px-6 text-center">Score</th>
              <th className="py-4.5 px-6 text-center">Grade</th>
              <th className="py-4.5 px-6 text-right">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/50">
            {marks.map((m) => (
              <tr key={m.subject} className="hover:bg-slate-900/20 transition-all duration-200">
                <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                  <FileText size={14} className="text-indigo-400" />
                  {m.subject}
                </td>
                <td className="py-4.5 px-6 text-center font-mono font-bold text-slate-350">
                  {m.score} / {m.max}
                </td>
                <td className="py-4.5 px-6 text-center">
                  <span className="badge-cyan font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide">
                    {m.grade}
                  </span>
                </td>
                <td className="py-4.5 px-6 text-slate-400 font-semibold text-right">{m.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Student / Child Fee Status View
// -------------------------------------------------------------
export function StudentFees() {
  const bills = [
    { term: 'Admission Fee', amount: 15000, date: '2026-07-05', status: 'Paid', receiptNo: 'DV-FE-260021' },
    { term: 'Q1 Tuition Fee', amount: 12000, date: '2026-07-06', status: 'Paid', receiptNo: 'DV-FE-260045' },
    { term: 'Q2 Tuition Fee', amount: 12000, date: '2026-07-13', status: 'Pending', receiptNo: '-' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Billing & Accounts</h1>
        <p className="text-slate-400 text-sm">Download paid transaction receipts and pay outstanding quarterly balances.</p>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
              <th className="py-4.5 px-6">Receipt / Billing Description</th>
              <th className="py-4.5 px-6">Due Date</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/50">
            {bills.map((b) => (
              <tr key={b.term} className="hover:bg-slate-900/20 transition-all duration-200 group">
                <td className="py-4.5 px-6 font-bold text-slate-200">
                  <p>{b.term}</p>
                  <span className="text-[9px] font-mono text-slate-500 font-medium tracking-wide uppercase">
                    Receipt: {b.receiptNo}
                  </span>
                </td>
                <td className="py-4.5 px-6 font-mono text-slate-400 font-semibold">{b.date}</td>
                <td className="py-4.5 px-6">
                  <span className={`badge-${b.status === 'Paid' ? 'emerald' : 'rose'} font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-4.5 px-6 text-slate-200 font-extrabold font-mono text-right text-xs">
                  ₹{b.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
