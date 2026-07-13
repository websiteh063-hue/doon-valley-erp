import React, { useState } from 'react';
import { PhoneCall, Plus, UserPlus, Users } from 'lucide-react';

export default function FrontOffice() {
  const [logs, setLogs] = useState([
    { id: 1, visitor: 'Rakesh Sharma', phone: '9876543210', purpose: 'Admission enquiry Class VI', date: '2026-07-13', time: '10:15 AM' },
    { id: 2, visitor: 'Meena Devi', phone: '9988776655', purpose: 'Meeting with Principal', date: '2026-07-13', time: '11:00 AM' }
  ]);

  const [formData, setFormData] = useState({ visitor: '', phone: '', purpose: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.visitor || !formData.phone) return;
    setLogs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        visitor: formData.visitor,
        phone: formData.phone,
        purpose: formData.purpose,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setFormData({ visitor: '', phone: '', purpose: '' });
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Front Office</h1>
        <p className="text-slate-400 text-sm">Record visitor check-ins, phone call summaries, and initial admission enquiries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleAdd} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <UserPlus size={16} className="text-indigo-400" />
            Log Visitor / Enquiry
          </h3>
          <div>
            <label className={labelClass}>Visitor Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.visitor}
              onChange={(e) => setFormData({ ...formData, visitor: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Contact Phone *</label>
            <input
              type="tel"
              required
              placeholder="10-digit number"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Purpose of Visit</label>
            <textarea
              rows="3"
              placeholder="Reason for visiting..."
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Log Entry
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-white text-base">Today's Logs</h3>
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Visitor</th>
                  <th className="py-4.5 px-6">Phone</th>
                  <th className="py-4.5 px-6">Purpose</th>
                  <th className="py-4.5 px-6 text-right">Time Logged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                      <Users size={14} className="text-indigo-400" />
                      {l.visitor}
                    </td>
                    <td className="py-4.5 px-6 text-slate-350 font-mono">{l.phone}</td>
                    <td className="py-4.5 px-6 text-slate-400 font-semibold">{l.purpose}</td>
                    <td className="py-4.5 px-6 text-right text-slate-500 font-mono">{l.time}</td>
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
