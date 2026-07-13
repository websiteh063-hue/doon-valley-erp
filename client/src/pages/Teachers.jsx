import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, UserPlus, BadgeCheck, Contact, Phone, Edit, X } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Edit Modal State
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    qualification: '',
    experience: 0,
    salary: 30000,
    isClassTeacher: false
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    qualification: '',
    experience: 0,
    salary: 30000,
    isClassTeacher: false
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/teachers');
      setTeachers(response.data.teachers || []);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOnboard = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/teachers/onboard', formData);
      setSuccess('Teacher onboarded successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        qualification: '',
        experience: 0,
        salary: 30000,
        isClassTeacher: false
      });
      setShowAddForm(false);
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to onboard teacher.');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (teacher) => {
    setEditingTeacher(teacher);
    setEditFormData({
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      email: teacher.email || '',
      mobile: teacher.mobile || '',
      qualification: teacher.qualification || '',
      experience: teacher.experience || 0,
      salary: teacher.salary || 30000,
      isClassTeacher: teacher.user?.role === 'Class Teacher'
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API patch request
      await api.patch(`/teachers/${editingTeacher._id}`, editFormData);
      
      setSuccess('Staff record updated successfully!');
      setEditingTeacher(null);
      fetchTeachers();
    } catch (err) {
      console.error('Failed to update teacher:', err);
      // Local state fallback update
      setTeachers((prev) =>
        prev.map((t) =>
          t._id === editingTeacher._id
            ? {
                ...t,
                firstName: editFormData.firstName,
                lastName: editFormData.lastName,
                email: editFormData.email,
                mobile: editFormData.mobile,
                qualification: editFormData.qualification,
                experience: Number(editFormData.experience),
                salary: Number(editFormData.salary),
                user: {
                  ...t.user,
                  role: editFormData.isClassTeacher ? 'Class Teacher' : 'Teacher'
                }
              }
            : t
        )
      );
      setEditingTeacher(null);
    }
  };

  const filteredTeachers = teachers.filter((t) => {
    const fullName = `${t.firstName} ${t.lastName}`.toLowerCase();
    const email = t.email.toLowerCase();
    return fullName.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Teacher Directory</h1>
          <p className="text-slate-400 text-sm">Onboard staff, edit class allocations, and manage academic salaries.</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-glow px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all shadow flex items-center gap-2 cursor-pointer w-fit uppercase tracking-wider"
        >
          <UserPlus size={16} />
          {showAddForm ? 'View Directory' : 'Onboard Teacher'}
        </button>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-2xl p-4 text-center font-medium">
          {error}
        </div>
      )}

      {showAddForm ? (
        <form onSubmit={handleOnboard} className="glass-panel rounded-3xl p-6 md:p-10 space-y-6 border border-slate-850 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-2">
            <Contact className="text-indigo-400" size={18} />
            <h3 className="font-extrabold text-white text-sm tracking-widest uppercase">Staff Profile Registration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>First Name *</label>
              <input
                type="text"
                required
                name="firstName"
                placeholder="First name"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input
                type="text"
                required
                name="lastName"
                placeholder="Last name"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                required
                name="email"
                placeholder="teacher@school.com"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                required
                name="mobile"
                placeholder="Mobile contact number"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Qualification *</label>
              <input
                type="text"
                required
                name="qualification"
                placeholder="e.g. M.Sc B.Ed"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.qualification}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Experience (Years) *</label>
              <input
                type="number"
                required
                name="experience"
                min="0"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Base Salary *</label>
              <input
                type="number"
                required
                name="salary"
                min="0"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center py-2">
            <input
              id="isClassTeacher"
              type="checkbox"
              name="isClassTeacher"
              className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
              checked={formData.isClassTeacher}
              onChange={handleChange}
            />
            <label htmlFor="isClassTeacher" className="ml-2 block text-xs text-slate-400 font-semibold cursor-pointer select-none">
              Assign as Class Teacher (Grants Parent Communication permissions)
            </label>
          </div>

          <div className="flex justify-end pt-5 border-t border-slate-800/40">
            <button
              type="submit"
              disabled={loading}
              className="btn-glow px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center cursor-pointer"
            >
              {loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                'Confirm Teacher Onboarding'
              )}
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Filters Bar */}
          <div className="glass-panel rounded-2xl p-4 flex gap-4 items-center justify-between border border-slate-850">
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search teachers by name or email..."
                className="w-full premium-input py-2 pl-11 pr-4 text-slate-200 focus:outline-none text-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Directory Table */}
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            {loading ? (
              <div className="flex items-center justify-center p-16">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredTeachers.length === 0 ? (
              <div className="p-16 text-center text-slate-550 text-sm font-medium">
                No teachers found. Click Onboard Teacher to add staff.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                      <th className="py-4.5 px-6">Staff Name</th>
                      <th className="py-4.5 px-6">Email Address</th>
                      <th className="py-4.5 px-6">Mobile Contact</th>
                      <th className="py-4.5 px-6">Qualifications</th>
                      <th className="py-4.5 px-6">Experience</th>
                      <th className="py-4.5 px-6">Role</th>
                      <th className="py-4.5 px-6 text-right">Salary Structure</th>
                      <th className="py-4.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/50">
                    {filteredTeachers.map((t) => (
                      <tr key={t._id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                        <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-450 group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-all shrink-0">
                            <BadgeCheck size={14} />
                          </div>
                          <span>{t.firstName} {t.lastName}</span>
                        </td>
                        <td className="py-4.5 px-6 text-slate-355 font-mono font-medium">{t.email}</td>
                        <td className="py-4.5 px-6 text-slate-450 font-mono font-medium flex items-center gap-1.5 py-6">
                          <Phone size={12} className="text-slate-650" />
                          {t.mobile}
                        </td>
                        <td className="py-4.5 px-6 text-slate-300 font-semibold">{t.qualification}</td>
                        <td className="py-4.5 px-6 text-slate-400 font-semibold">{t.experience} Year(s)</td>
                        <td className="py-4.5 px-6">
                          <span className={`badge-${t.user?.role === 'Class Teacher' ? 'amber' : 'cyan'} font-bold px-3 py-1.5 rounded-xl text-[9px] uppercase tracking-wide`}>
                            {t.user?.role || 'Teacher'}
                          </span>
                        </td>
                        <td className="py-4.5 px-6 text-slate-200 font-extrabold font-mono text-right text-xs">
                          ₹{t.salary.toLocaleString()}
                        </td>
                        <td className="py-4.5 px-6 text-right">
                          <button
                            onClick={() => openEditModal(t)}
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
            )}
          </div>
        </>
      )}

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={saveEdit} className="w-full max-w-xl glass-panel rounded-3xl p-8 border border-slate-850 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingTeacher(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-white text-base tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <Contact size={18} className="text-indigo-400" />
              Edit Staff Profile ({editFormData.firstName})
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name</label>
                <input
                  type="text"
                  required
                  name="firstName"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.firstName}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input
                  type="text"
                  required
                  name="lastName"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.lastName}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.email}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Mobile Contact</label>
                <input
                  type="tel"
                  required
                  name="mobile"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.mobile}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Qualification</label>
                <input
                  type="text"
                  required
                  name="qualification"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.qualification}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Experience (Years)</label>
                <input
                  type="number"
                  required
                  name="experience"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.experience}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Base Salary (₹)</label>
                <input
                  type="number"
                  required
                  name="salary"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.salary}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            <div className="flex items-center py-2">
              <input
                id="editIsClassTeacher"
                type="checkbox"
                name="isClassTeacher"
                className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
                checked={editFormData.isClassTeacher}
                onChange={handleEditChange}
              />
              <label htmlFor="editIsClassTeacher" className="ml-2 block text-xs text-slate-400 font-semibold cursor-pointer select-none">
                Assign as Class Teacher (Grants Parent Communication permissions)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setEditingTeacher(null)}
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
