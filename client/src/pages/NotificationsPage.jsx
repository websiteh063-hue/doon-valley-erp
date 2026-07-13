import React, { useState } from 'react';
import { Bell, Plus, Calendar, ShieldAlert } from 'lucide-react';

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Admissions Window Extended', body: 'The admission window for secondary division is extended until July 25, 2026.', date: '2026-07-13', audience: 'All Roles' },
    { id: 2, title: 'Fee Deadline Reminder', body: 'Tuition fees for Q2 must be deposited by the end of this month to avoid default penalties.', date: '2026-07-10', audience: 'Parents' },
    { id: 3, title: 'Practical Exam Schedule', body: 'Practical assessments schedule has been posted in respective dashboards.', date: '2026-07-08', audience: 'Teachers & Students' }
  ]);

  const [formData, setFormData] = useState({ title: '', body: '', audience: 'All Roles' });

  const handlePost = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;
    setAlerts((prev) => [
      {
        id: prev.length + 1,
        title: formData.title,
        body: formData.body,
        date: new Date().toISOString().split('T')[0],
        audience: formData.audience
      },
      ...prev
    ]);
    setFormData({ title: '', body: '', audience: 'All Roles' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">School Bulletin Board</h1>
        <p className="text-slate-400 text-sm">Post news bulletins, circular letters, and holiday notifications to active portals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handlePost} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus size={16} className="text-indigo-400" />
            Publish Circular
          </h3>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Bulletin Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Independence Day Holiday"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Notice Body</label>
            <textarea
              required
              rows="4"
              placeholder="Write the notification details here..."
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Target Audience</label>
            <select
              className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
            >
              <option value="All Roles" className="bg-slate-900">All Portals</option>
              <option value="Teachers" className="bg-slate-900">Teachers Only</option>
              <option value="Parents" className="bg-slate-900">Parents Only</option>
              <option value="Students" className="bg-slate-900">Students Only</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Post Bulletin
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-white text-base">Recent Postings</h3>
          <div className="space-y-4">
            {alerts.map((a) => (
              <div key={a.id} className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-3 relative overflow-hidden group hover:border-slate-800 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Bell size={16} />
                    <h4 className="font-extrabold text-white text-sm">{a.title}</h4>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {a.date}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{a.body}</p>
                <div className="flex items-center gap-1.5 pt-2">
                  <ShieldAlert size={12} className="text-slate-600" />
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Audience: {a.audience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
