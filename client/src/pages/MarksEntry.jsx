import React, { useState } from 'react';
import { Award, CheckCircle, Sliders } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function MarksEntry() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const [scores, setScores] = useState([
    { id: 1, name: 'Aman Singh', admissionNo: 'DVHS2026001', score: 85, grade: 'A2' },
    { id: 2, name: 'Aarav Kumar', admissionNo: 'DVHS2026002', score: 92, grade: 'A1' },
    { id: 3, name: 'Ishita Gupta', admissionNo: 'DVHS2026003', score: 78, grade: 'B1' },
    { id: 4, name: 'Rahul Roy', admissionNo: 'DVHS2026004', score: 45, grade: 'C2' },
    { id: 5, name: 'Sneha Patel', admissionNo: 'DVHS2026005', score: 88, grade: 'A2' }
  ]);

  const handleScoreChange = (id, newScore) => {
    let score = Number(newScore);
    if (score < 0) score = 0;
    if (score > 100) score = 100;

    let grade = 'E';
    if (score >= 91) grade = 'A1';
    else if (score >= 81) grade = 'A2';
    else if (score >= 71) grade = 'B1';
    else if (score >= 61) grade = 'B2';
    else if (score >= 51) grade = 'C1';
    else if (score >= 41) grade = 'C2';
    else if (score >= 33) grade = 'D';

    setScores((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score, grade } : s))
    );
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setSuccess('Student report card marks successfully updated!');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Enter Term Marks</h1>
          <p className="text-slate-400 text-sm">Key-in assessment scores and assign final grades to students.</p>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      {/* Filter Selection Banner */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between border border-slate-850">
        <div className="flex items-center gap-2 text-slate-500">
          <Sliders size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Active Sheet:</span>
        </div>
        <div className="flex gap-4">
          <select className="premium-input py-2 px-4 text-slate-355 focus:outline-none text-xs cursor-pointer">
            <option className="bg-slate-900">Class X - A</option>
          </select>
          <select className="premium-input py-2 px-4 text-slate-355 focus:outline-none text-xs cursor-pointer">
            <option className="bg-slate-900">Mathematics</option>
            <option className="bg-slate-900">Physics</option>
          </select>
        </div>
      </div>

      {/* Scores Grid */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
              <th className="py-4.5 px-6">Admission No</th>
              <th className="py-4.5 px-6">Student Name</th>
              <th className="py-4.5 px-6 text-center">Score (Max: 100)</th>
              <th className="py-4.5 px-6 text-right">Computed Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/50">
            {scores.map((s) => (
              <tr key={s.id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                <td className="py-4.5 px-6 font-mono font-bold text-indigo-400">{s.admissionNo}</td>
                <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-450 shrink-0">
                    <Award size={14} />
                  </div>
                  {s.name}
                </td>
                <td className="py-4.5 px-6 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="premium-input py-1.5 px-3 text-slate-250 font-mono font-bold text-center w-20 focus:outline-none text-xs inline-block"
                    value={s.score}
                    onChange={(e) => handleScoreChange(s.id, e.target.value)}
                  />
                </td>
                <td className="py-4.5 px-6 text-right">
                  <span className={`badge-${s.grade === 'E' ? 'rose' : s.grade.startsWith('A') ? 'emerald' : 'cyan'} font-bold px-3 py-1.5 rounded-xl text-[9px] uppercase tracking-wide`}>
                    {s.grade}
                  </span>
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
              <CheckCircle size={16} />
              Save Class Marks
            </>
          )}
        </button>
      </div>
    </div>
  );
}
