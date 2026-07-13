import React, { useState } from 'react';
import { Calendar, Plus, Award, AlertCircle } from 'lucide-react';

export default function ExamsConfig() {
  const [exams, setExams] = useState([
    { id: 1, name: 'First Term Exams', type: 'Written', start: '2026-09-10', end: '2026-09-20', status: 'Scheduled' },
    { id: 2, name: 'Half Yearly Practical', type: 'Practical', start: '2026-11-05', end: '2026-11-12', status: 'Draft' },
    { id: 3, name: 'Final Theory Exam', type: 'Written', start: '2027-03-01', end: '2027-03-15', status: 'Draft' }
  ]);

  const [formData, setFormData] = useState({ name: '', type: 'Written', start: '', end: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.start) return;
    setExams((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: formData.name,
        type: formData.type,
        start: formData.start,
        end: formData.end || formData.start,
        status: 'Scheduled'
      }
    ]);
    setFormData({ name: '', type: 'Written', start: '', end: '' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Exams Configuration</h1>
        <p className="text-slate-400 text-sm">Schedule examination sessions, configure pass marks, and format report card headers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleAdd} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus size={16} className="text-indigo-400" />
            Schedule Examination
          </h3>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Exam Title</label>
            <input
              type="text"
              required
              placeholder="e.g. First Unit Test"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Assessment Type</label>
            <select
              className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Written" className="bg-slate-900">Written Exam</option>
              <option value="Practical" className="bg-slate-900">Practical Lab</option>
              <option value="Viva / Oral" className="bg-slate-900">Oral Viva Voce</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Start Date</label>
              <input
                type="date"
                required
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.start}
                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">End Date</label>
              <input
                type="date"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.end}
                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Confirm Exam Schedule
          </button>
        </form>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 bg-amber-500/5 flex items-start gap-4">
            <AlertCircle className="text-amber-400 mt-1 shrink-0" size={18} />
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Grading System Rules</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Passing percentage is set at **33%**. GPA is calculated using the CGPA scale (grades A1 to E). Ensure all class teachers submit marks within 7 days of exam completion.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Examination Term</th>
                  <th className="py-4.5 px-6">Type</th>
                  <th className="py-4.5 px-6">Start Date</th>
                  <th className="py-4.5 px-6">End Date</th>
                  <th className="py-4.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {exams.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-900/20 transition-all duration-200">
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                      <Award size={14} className="text-indigo-400" />
                      {e.name}
                    </td>
                    <td className="py-4.5 px-6 text-slate-400 font-semibold">{e.type}</td>
                    <td className="py-4.5 px-6 font-mono text-slate-350">{e.start}</td>
                    <td className="py-4.5 px-6 font-mono text-slate-350">{e.end}</td>
                    <td className="py-4.5 px-6 text-right">
                      <span className={`badge-${e.status === 'Scheduled' ? 'indigo' : 'cyan'} font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
