import React, { useState } from 'react';
import { DollarSign, Plus, Calendar, CreditCard, Edit, Trash2, X } from 'lucide-react';

export default function FeesConfig() {
  const [feeHeads, setFeeHeads] = useState([
    { id: 1, name: 'Tuition Fee (Quarterly)', amount: 12000, frequency: 'Quarterly', class: 'Class I - X' },
    { id: 2, name: 'Admission Fee', amount: 15000, frequency: 'One-Time', class: 'New Admissions' },
    { id: 3, name: 'Examination Fee (Half-Yearly)', amount: 1500, frequency: 'Bi-Annual', class: 'Class Nursery - X' },
    { id: 4, name: 'Transport Fee (Monthly)', amount: 2000, frequency: 'Monthly', class: 'Optional' }
  ]);

  const [formData, setFormData] = useState({ name: '', amount: '', frequency: 'Quarterly', class: 'Class I - X' });
  const [editingFee, setEditingFee] = useState(null);
  const [success, setSuccess] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;
    setFeeHeads((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: formData.name,
        amount: Number(formData.amount),
        frequency: formData.frequency,
        class: formData.class
      }
    ]);
    setFormData({ name: '', amount: '', frequency: 'Quarterly', class: 'Class I - X' });
    setSuccess('Fee header created successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setFeeHeads((prev) =>
      prev.map((f) => (f.id === editingFee.id ? { ...f, ...editingFee } : f))
    );
    setSuccess('Fee structure updated successfully!');
    setEditingFee(null);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id) => {
    setFeeHeads((prev) => prev.filter((f) => f.id !== id));
    setSuccess('Fee component removed.');
    setTimeout(() => setSuccess(''), 3000);
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Fees Configuration</h1>
        <p className="text-slate-400 text-sm">Configure administrative billing schemas, tuition rates, and transport fees.</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleAdd} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus size={16} className="text-indigo-400" />
            Create Fee Header
          </h3>
          <div>
            <label className={labelClass}>Fee Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Tuition Fee"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Amount (₹)</label>
            <input
              type="number"
              required
              placeholder="Amount in Rupees"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Frequency</label>
            <select
              className="w-full premium-input py-2.5 px-4 text-slate-330 focus:outline-none text-xs cursor-pointer"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            >
              <option value="Monthly" className="bg-slate-900">Monthly</option>
              <option value="Quarterly" className="bg-slate-900">Quarterly</option>
              <option value="Bi-Annual" className="bg-slate-900">Bi-Annual</option>
              <option value="One-Time" className="bg-slate-900">One-Time</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Applicable Students</label>
            <input
              type="text"
              placeholder="e.g. All Students / New Admissions"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Create Billing Head
          </button>
        </form>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-850 flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <CreditCard size={20} />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Tuition Revenue Model</span>
                <p className="text-lg font-black text-white">₹14.2 Lakhs Expected</p>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5 border border-slate-850 flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                <Calendar size={20} />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Billing Cycle</span>
                <p className="text-lg font-black text-white">Q2 Quarter Active</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Fee Component</th>
                  <th className="py-4.5 px-6">Applicable Classes</th>
                  <th className="py-4.5 px-6">Frequency</th>
                  <th className="py-4.5 px-6 text-right">Standard Amount</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {feeHeads.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                      <DollarSign size={14} className="text-indigo-400" />
                      {f.name}
                    </td>
                    <td className="py-4.5 px-6 text-slate-400 font-semibold">{f.class}</td>
                    <td className="py-4.5 px-6">
                      <span className="badge-cyan font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide">
                        {f.frequency}
                      </span>
                    </td>
                    <td className="py-4.5 px-6 text-slate-200 font-extrabold font-mono text-right text-xs">
                      ₹{f.amount.toLocaleString()}
                    </td>
                    <td className="py-4.5 px-6 text-right flex justify-end gap-2">
                      <button
                        onClick={() => setEditingFee(f)}
                        className="p-2 text-indigo-400 hover:text-white rounded-xl hover:bg-indigo-600/20 transition-colors cursor-pointer"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="p-2 text-rose-455 hover:text-white rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Fee Modal */}
      {editingFee && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleEditSubmit} className="w-full max-w-md glass-panel rounded-3xl p-8 border border-slate-850 space-y-6 relative">
            <button
              type="button"
              onClick={() => setEditingFee(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-white text-base tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <DollarSign size={18} className="text-indigo-400" />
              Edit Fee Details
            </h3>

            <div>
              <label className={labelClass}>Fee Name</label>
              <input
                type="text"
                required
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={editingFee.name}
                onChange={(e) => setEditingFee({ ...editingFee, name: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass}>Amount (₹)</label>
              <input
                type="number"
                required
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={editingFee.amount}
                onChange={(e) => setEditingFee({ ...editingFee, amount: Number(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Frequency</label>
                <select
                  className="w-full premium-input py-2.5 px-4 text-slate-330 focus:outline-none text-xs cursor-pointer"
                  value={editingFee.frequency}
                  onChange={(e) => setEditingFee({ ...editingFee, frequency: e.target.value })}
                >
                  <option value="Monthly" className="bg-slate-900">Monthly</option>
                  <option value="Quarterly" className="bg-slate-900">Quarterly</option>
                  <option value="Bi-Annual" className="bg-slate-900">Bi-Annual</option>
                  <option value="One-Time" className="bg-slate-900">One-Time</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Applicable Class</label>
                <input
                  type="text"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editingFee.class}
                  onChange={(e) => setEditingFee({ ...editingFee, class: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setEditingFee(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-glow px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
