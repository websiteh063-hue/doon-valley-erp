import React, { useState } from 'react';
import { Search, UserCheck, UserX, UserPlus, Shield } from 'lucide-react';

export default function Users() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Amansingh Lal', email: 'admin@school.com', role: 'Super Admin', status: 'Active', created: '2026-07-01' },
    { id: 2, name: 'Pratibha Singh', email: 'pratibha.office@school.com', role: 'Office Admin', status: 'Active', created: '2026-07-05' },
    { id: 3, name: 'Rohit Verma', email: 'rohit.teacher@school.com', role: 'Teacher', status: 'Active', created: '2026-07-08' },
    { id: 4, name: 'Ankita Sharma', email: 'ankita.class@school.com', role: 'Class Teacher', status: 'Active', created: '2026-07-10' },
    { id: 5, name: 'Aman Singh', email: 'DVHS2026001', role: 'Student', status: 'Active', created: '2026-07-13' }
  ]);

  const [formData, setFormData] = useState({ name: '', email: '', role: 'Teacher' });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: 'Active',
        created: new Date().toISOString().split('T')[0]
      }
    ]);
    setFormData({ name: '', email: '', role: 'Teacher' });
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
    );
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">User Management</h1>
        <p className="text-slate-400 text-sm">Manage administrative accounts, role authorization, and login privileges.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Onboarding Form */}
        <form onSubmit={handleCreate} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <UserPlus size={16} className="text-indigo-400" />
            Provision Admin User
          </h3>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">User Name</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Username / Email</label>
            <input
              type="text"
              required
              placeholder="e.g. john@school.com"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">System Role</label>
            <select
              className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Super Admin" className="bg-slate-900">Super Admin</option>
              <option value="Principal" className="bg-slate-900">Principal</option>
              <option value="Office Admin" className="bg-slate-900">Office Admin</option>
              <option value="Teacher" className="bg-slate-900">Teacher</option>
              <option value="Class Teacher" className="bg-slate-900">Class Teacher</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Create User Account
          </button>
        </form>

        {/* Directory Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel rounded-2xl p-4 flex justify-between items-center border border-slate-850">
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search users..."
                className="w-full premium-input py-2 pl-11 pr-4 text-slate-200 focus:outline-none text-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Name</th>
                  <th className="py-4.5 px-6">Username / Email</th>
                  <th className="py-4.5 px-6">System Role</th>
                  <th className="py-4.5 px-6">Status</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                      <Shield size={14} className="text-indigo-400" />
                      {u.name}
                    </td>
                    <td className="py-4.5 px-6 text-slate-350 font-mono">{u.email}</td>
                    <td className="py-4.5 px-6">
                      <span className="badge-cyan font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4.5 px-6">
                      <span className={`badge-${u.status === 'Active' ? 'emerald' : 'rose'} font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wide`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-4.5 px-6 text-right">
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          u.status === 'Active'
                            ? 'text-rose-400 hover:bg-rose-500/10'
                            : 'text-emerald-400 hover:bg-emerald-500/10'
                        }`}
                      >
                        {u.status === 'Active' ? <UserX size={14} /> : <UserCheck size={14} />}
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
