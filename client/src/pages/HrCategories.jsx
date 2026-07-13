import React, { useState } from 'react';
import { Plus, Trash2, Shield } from 'lucide-react';

export default function HrCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Principal', totalStaff: 1 },
    { id: 2, name: 'Teacher', totalStaff: 78 },
    { id: 3, name: 'Office Assistant', totalStaff: 4 },
    { id: 4, name: 'Maintenance Staff', totalStaff: 12 },
    { id: 5, name: 'Driver', totalStaff: 8 }
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory) return;
    setCategories((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newCategory,
        totalStaff: 0
      }
    ]);
    setSuccess('HR Category registered successfully!');
    setNewCategory('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">HR Categories</h1>
        <p className="text-slate-400 text-sm">Create and manage employee categories such as Teachers, Office Assistants, and Maintenance staff.</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleAdd} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus size={16} className="text-indigo-400" />
            Add HR Category
          </h3>
          <div>
            <label className={labelClass}>Category Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Accountant"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Create Category
          </button>
        </form>

        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-white text-base font-sans">Configured HR Categories</h3>
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Category Name</th>
                  <th className="py-4.5 px-6 text-center">Active Staff Count</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/20 transition-all duration-200">
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                      <Shield size={14} className="text-indigo-400" />
                      {c.name}
                    </td>
                    <td className="py-4.5 px-6 text-center font-mono font-bold text-slate-400">{c.totalStaff} staff</td>
                    <td className="py-4.5 px-6 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        disabled={c.totalStaff > 0}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          c.totalStaff > 0
                            ? 'text-slate-700 cursor-not-allowed'
                            : 'text-rose-450 hover:text-white hover:bg-rose-500/10'
                        }`}
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
    </div>
  );
}
