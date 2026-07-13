import React, { useState } from 'react';
import { Calendar, CheckCircle2, UserCheck } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Attendance() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Aman Singh', rollNo: 1, attendance: 'Present' },
    { id: 2, name: 'Aarav Kumar', rollNo: 2, attendance: 'Present' },
    { id: 3, name: 'Ishita Gupta', rollNo: 3, attendance: 'Present' },
    { id: 4, name: 'Rahul Roy', rollNo: 4, attendance: 'Absent' },
    { id: 5, name: 'Sneha Patel', rollNo: 5, attendance: 'Present' }
  ]);

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, attendance: s.attendance === 'Present' ? 'Absent' : 'Present' }
          : s
      )
    );
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setSuccess('Attendance sheet submitted successfully!');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Mark Attendance</h1>
          <p className="text-slate-400 text-sm">Select student status checkpoints and submit daily logs to records.</p>
        </div>
        <div className="glass-panel py-2.5 px-4 rounded-xl border border-slate-850 flex items-center gap-2 text-xs font-bold font-mono text-slate-350">
          <Calendar size={14} className="text-indigo-400" />
          {new Date().toISOString().split('T')[0]}
        </div>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      {/* Directory Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
              <th className="py-4.5 px-6">Roll No</th>
              <th className="py-4.5 px-6">Student Name</th>
              <th className="py-4.5 px-6 text-center">Status</th>
              <th className="py-4.5 px-6 text-right">Toggle Checklist</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/50">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                <td className="py-4.5 px-6 font-mono font-bold text-slate-400">{s.rollNo}</td>
                <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-450 shrink-0">
                    <UserCheck size={14} />
                  </div>
                  {s.name}
                </td>
                <td className="py-4.5 px-6 text-center">
                  <span className={`badge-${s.attendance === 'Present' ? 'emerald' : 'rose'} font-bold px-3 py-1.5 rounded-xl text-[9px] uppercase tracking-wide`}>
                    {s.attendance}
                  </span>
                </td>
                <td className="py-4.5 px-6 text-right">
                  <button
                    onClick={() => toggleAttendance(s.id)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                      s.attendance === 'Present'
                        ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-455 border border-rose-500/20'
                    }`}
                  >
                    Set {s.attendance === 'Present' ? 'Absent' : 'Present'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-glow px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer flex items-center gap-2"
        >
          {loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <>
              <CheckCircle2 size={16} />
              Submit Attendance Log
            </>
          )}
        </button>
      </div>
    </div>
  );
}
