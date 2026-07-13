import React, { useState } from 'react';
import { Search, UserPlus, Contact, Phone, Award, Shield, Edit, X } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, employeeId: 'EMP2026001', name: 'Pratibha Singh', category: 'Office Assistant', mobile: '9988776601', salary: 25000, joined: '2026-01-10', qualification: 'MBA' },
    { id: 2, employeeId: 'EMP2026002', name: 'Dr. S. P. Pandey', category: 'Teacher', mobile: '9988776602', salary: 45000, joined: '2025-06-15', qualification: 'Ph.D Physics' },
    { id: 3, employeeId: 'EMP2026003', name: 'Ram Prakash', category: 'Driver', mobile: '9988776603', salary: 18000, joined: '2026-03-01', qualification: 'Intermediate' }
  ]);

  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Teacher',
    mobile: '',
    email: '',
    qualification: '',
    experience: 0,
    salary: 30000,
    aadhaar: '',
    pan: '',
    bankAccount: '',
    bankName: ''
  });

  const categories = ['Principal', 'Vice Principal', 'Teacher', 'Office Assistant', 'Accountant', 'Librarian', 'Maintenance Staff', 'Driver', 'Security Guard'];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    setLoading(true);
    setTimeout(() => {
      setEmployees((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          employeeId: `EMP202600${prev.length + 1}`,
          name: formData.name,
          category: formData.category,
          mobile: formData.mobile,
          salary: Number(formData.salary),
          joined: new Date().toISOString().split('T')[0],
          qualification: formData.qualification
        }
      ]);
      setSuccess('Staff member onboarded successfully!');
      setFormData({
        name: '',
        category: 'Teacher',
        mobile: '',
        email: '',
        qualification: '',
        experience: 0,
        salary: 30000,
        aadhaar: '',
        pan: '',
        bankAccount: '',
        bankName: ''
      });
      setShowAddForm(false);
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }, 1200);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingEmployee.id
          ? {
              ...emp,
              name: editingEmployee.name,
              category: editingEmployee.category,
              mobile: editingEmployee.mobile,
              salary: Number(editingEmployee.salary),
              qualification: editingEmployee.qualification
            }
          : emp
      )
    );
    setSuccess('Staff details updated successfully!');
    setEditingEmployee(null);
    setTimeout(() => setSuccess(''), 3000);
  };

  const filtered = employees.filter((e) => {
    const term = search.toLowerCase();
    return e.name.toLowerCase().includes(term) || e.category.toLowerCase().includes(term) || e.employeeId.toLowerCase().includes(term);
  });

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Employee Management</h1>
          <p className="text-slate-400 text-sm">Register staff profiles, configure qualifications, manage bank accounts, and configure salaries.</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-glow px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all shadow flex items-center gap-2 cursor-pointer w-fit uppercase tracking-wider"
        >
          <UserPlus size={16} />
          {showAddForm ? 'View Directory' : 'Onboard Employee'}
        </button>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      {showAddForm ? (
        <form onSubmit={handleAdd} className="glass-panel rounded-3xl p-6 md:p-10 space-y-6 border border-slate-850 max-w-4xl mx-auto">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <Contact size={16} className="text-indigo-400" />
            Employee Registration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <select
                className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                required
                placeholder="Mobile number"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                placeholder="email@school.com"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Base Salary (₹) *</label>
              <input
                type="number"
                required
                placeholder="Salary in Rupees"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/40">
            <div>
              <label className={labelClass}>Aadhaar Number</label>
              <input
                type="text"
                placeholder="12-digit number"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>PAN Number</label>
              <input
                type="text"
                placeholder="PAN identifier"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.pan}
                onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/40">
            <div>
              <label className={labelClass}>Bank Name</label>
              <input
                type="text"
                placeholder="e.g. SBI"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Bank Account No</label>
              <input
                type="text"
                placeholder="Bank account details"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end pt-5 border-t border-slate-800/40">
            <button
              type="submit"
              disabled={loading}
              className="btn-glow px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow flex items-center justify-center cursor-pointer"
            >
              {loading ? <CircularProgress size={16} color="inherit" /> : 'Confirm Onboarding'}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="glass-panel rounded-2xl p-4 flex gap-4 items-center justify-between border border-slate-850">
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search staff directory by name, ID..."
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
                  <th className="py-4.5 px-6">Employee ID</th>
                  <th className="py-4.5 px-6">Name</th>
                  <th className="py-4.5 px-6">Category</th>
                  <th className="py-4.5 px-6">Mobile Contact</th>
                  <th className="py-4.5 px-6">Joined Date</th>
                  <th className="py-4.5 px-6 text-right">Salary Structure</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                    <td className="py-4.5 px-6 font-mono font-bold text-indigo-400">{e.employeeId}</td>
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                      <Shield size={14} className="text-slate-500" />
                      {e.name}
                    </td>
                    <td className="py-4.5 px-6">
                      <span className="badge-cyan font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wide">
                        {e.category}
                      </span>
                    </td>
                    <td className="py-4.5 px-6 font-mono text-slate-400">{e.mobile}</td>
                    <td className="py-4.5 px-6 font-mono text-slate-450">{e.joined}</td>
                    <td className="py-4.5 px-6 text-slate-200 font-mono font-extrabold text-right">
                      ₹{e.salary.toLocaleString()}
                    </td>
                    <td className="py-4.5 px-6 text-right">
                      <button
                        onClick={() => setEditingEmployee(e)}
                        className="p-2 text-indigo-400 hover:text-white rounded-xl hover:bg-indigo-600/20 transition-colors cursor-pointer"
                      >
                        <Edit size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleEditSave} className="w-full max-w-xl glass-panel rounded-3xl p-8 border border-slate-850 space-y-6 relative">
            <button
              type="button"
              onClick={() => setEditingEmployee(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-white text-base tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <Contact size={18} className="text-indigo-400" />
              Edit Employee Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editingEmployee.name}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select
                  className="w-full premium-input py-2.5 px-4 text-slate-355 focus:outline-none text-xs cursor-pointer"
                  value={editingEmployee.category}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Mobile Contact</label>
                <input
                  type="tel"
                  required
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editingEmployee.mobile}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, mobile: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Base Salary (₹)</label>
                <input
                  type="number"
                  required
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editingEmployee.salary}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setEditingEmployee(null)}
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
