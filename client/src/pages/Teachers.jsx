import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, UserPlus } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
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

  const filteredTeachers = teachers.filter((t) => {
    const fullName = `${t.firstName} ${t.lastName}`.toLowerCase();
    const email = t.email.toLowerCase();
    return fullName.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Teacher Directory</h1>
          <p className="text-slate-400 text-sm">Onboard staff, edit class allocations, and manage academic salaries.</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all shadow flex items-center gap-2 cursor-pointer w-fit"
        >
          <UserPlus size={16} />
          {showAddForm ? 'View Directory' : 'Onboard Teacher'}
        </button>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl p-4 text-center">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-4 text-center">
          {error}
        </div>
      )}

      {showAddForm ? (
        <form onSubmit={handleOnboard} className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">Staff Profile Registration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">First Name *</label>
              <input
                type="text"
                required
                name="firstName"
                placeholder="First name"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Last Name *</label>
              <input
                type="text"
                required
                name="lastName"
                placeholder="Last name"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address *</label>
              <input
                type="email"
                required
                name="email"
                placeholder="teacher@school.com"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mobile Number *</label>
              <input
                type="tel"
                required
                name="mobile"
                placeholder="Mobile contact number"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Qualification *</label>
              <input
                type="text"
                required
                name="qualification"
                placeholder="e.g. M.Sc B.Ed"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.qualification}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Experience (Years) *</label>
              <input
                type="number"
                required
                name="experience"
                min="0"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Base Salary *</label>
              <input
                type="number"
                required
                name="salary"
                min="0"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="isClassTeacher"
              type="checkbox"
              name="isClassTeacher"
              className="h-4 w-4 rounded bg-slate-900 border-slate-700/50 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
              checked={formData.isClassTeacher}
              onChange={handleChange}
            />
            <label htmlFor="isClassTeacher" className="ml-2 block text-xs text-slate-400">
              Assign as Class Teacher (Grants Parent Communication permissions)
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Confirm Teacher Onboarding'
              )}
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Filters Bar */}
          <div className="glass-panel rounded-2xl p-4 flex gap-4 items-center justify-between">
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search teachers by name or email..."
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 pl-9 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Directory Table */}
          <div className="glass-panel rounded-2xl overflow-hidden shadow-xl">
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredTeachers.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                No teachers found. Click Onboard Teacher to add staff.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold bg-slate-900/35">
                      <th className="py-4 px-6">Staff Name</th>
                      <th className="py-4 px-6">Email Address</th>
                      <th className="py-4 px-6">Mobile Contact</th>
                      <th className="py-4 px-6">Qualifications</th>
                      <th className="py-4 px-6">Experience (Yrs)</th>
                      <th className="py-4 px-6">Role</th>
                      <th className="py-4 px-6">Salary Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {filteredTeachers.map((t) => (
                      <tr key={t._id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-4 px-6 font-semibold text-slate-200">{t.firstName} {t.lastName}</td>
                        <td className="py-4 px-6 text-slate-300 font-mono">{t.email}</td>
                        <td className="py-4 px-6 text-slate-400 font-mono">{t.mobile}</td>
                        <td className="py-4 px-6 text-slate-300">{t.qualification}</td>
                        <td className="py-4 px-6 text-slate-400">{t.experience} Year(s)</td>
                        <td className="py-4 px-6">
                          <span className={`font-bold px-2.5 py-1 rounded-full text-[10px] ${
                            t.user?.role === 'Class Teacher' 
                              ? 'bg-amber-500/10 text-amber-400' 
                              : 'bg-cyan-500/10 text-cyan-400'
                          }`}>
                            {t.user?.role || 'Teacher'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-200 font-semibold font-mono">₹{t.salary.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
