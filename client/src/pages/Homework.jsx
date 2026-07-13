import React, { useState } from 'react';
import { ClipboardList, Plus, FileText, Download } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Homework() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const [homeworkList, setHomeworkList] = useState([
    { id: 1, title: 'Calculus Assignment II', class: 'Class X', subject: 'Mathematics', deadline: '2026-07-20', description: 'Complete Chapter 4 exercise questions 1 to 15 in the practical notebook.' },
    { id: 2, title: 'Optics Lab Project', class: 'Class X', subject: 'Physics', deadline: '2026-07-22', description: 'Draw ray diagrams for concave and convex mirrors.' }
  ]);

  const [formData, setFormData] = useState({ title: '', class: 'Class X', subject: 'Mathematics', deadline: '', description: '' });

  const handlePost = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.deadline) return;
    setLoading(true);
    
    setTimeout(() => {
      setHomeworkList((prev) => [
        {
          id: prev.length + 1,
          title: formData.title,
          class: formData.class,
          subject: formData.subject,
          deadline: formData.deadline,
          description: formData.description
        },
        ...prev
      ]);
      setSuccess('Homework assignment published successfully!');
      setFormData({ title: '', class: 'Class X', subject: 'Mathematics', deadline: '', description: '' });
      setLoading(false);
    }, 1200);
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Homework Board</h1>
        <p className="text-slate-400 text-sm">Post subject coursework, assign due dates, and view submissions logs.</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handlePost} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus size={16} className="text-indigo-400" />
            Assign Homework
          </h3>
          <div>
            <label className={labelClass}>Homework Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Chemical Reactions Quiz"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Target Class *</label>
              <select
                className="w-full premium-input py-2.5 px-4 text-slate-355 focus:outline-none text-xs cursor-pointer"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              >
                <option value="Class X" className="bg-slate-900">Class X</option>
                <option value="Class IX" className="bg-slate-900">Class IX</option>
                <option value="Class VIII" className="bg-slate-900">Class VIII</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Deadline Date *</label>
              <input
                type="date"
                required
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Course Description</label>
            <textarea
              rows="4"
              placeholder="Detailed instructions..."
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer flex items-center justify-center"
          >
            {loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              'Publish Assignment'
            )}
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-white text-base">Active Coursework</h3>
          <div className="space-y-4">
            {homeworkList.map((h) => (
              <div key={h.id} className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-3 relative overflow-hidden group hover:border-slate-800 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <ClipboardList size={16} />
                    <h4 className="font-extrabold text-white text-sm">{h.title}</h4>
                  </div>
                  <span className="badge-rose font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide">
                    Due: {h.deadline}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{h.description}</p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-850/40">
                  <div className="flex items-center gap-1.5">
                    <span className="badge-cyan font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide">
                      {h.class}
                    </span>
                    <span className="badge-indigo font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide">
                      {h.subject}
                    </span>
                  </div>
                  <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 cursor-pointer">
                    <Download size={14} />
                    Submissions (4/5)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
