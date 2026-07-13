import React, { useState } from 'react';
import api from '../services/api';
import { CheckCircle } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Admissions() {
  const [formData, setFormData] = useState({
    admissionNo: '',
    rollNo: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    bloodGroup: '',
    aadhaar: '',
    religion: '',
    category: '',
    medicalHistory: '',
    previousSchool: '',
    address: { street: '', city: '', state: '', zip: '' },
    class: 'Class I',
    section: 'A',
    currentSession: '2026-2027',
    parentDetails: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      mobile: '',
      email: '',
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdCredentials, setCreatedCredentials] = useState(null);

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [name]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/students/admit', formData);
      const student = response.data.student;
      
      setCreatedCredentials({
        username: student.admissionNo,
        password: formData.parentDetails.mobile,
        role: 'Student',
        name: `${student.firstName} ${student.lastName}`
      });

      // Reset form
      setFormData({
        admissionNo: '',
        rollNo: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'Male',
        bloodGroup: '',
        aadhaar: '',
        religion: '',
        category: '',
        medicalHistory: '',
        previousSchool: '',
        address: { street: '', city: '', state: '', zip: '' },
        class: 'Class I',
        section: 'A',
        currentSession: '2026-2027',
        parentDetails: {
          fatherName: '',
          fatherOccupation: '',
          motherName: '',
          motherOccupation: '',
          mobile: '',
          email: '',
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete admission.');
    } finally {
      setLoading(false);
    }
  };

  const classes = ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
  const sections = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Student Admissions</h1>
        <p className="text-slate-400 text-sm">Register a new student and provision system credentials automatically.</p>
      </div>

      {createdCredentials && (
        <div className="glass-panel border-emerald-500/30 rounded-2xl p-6 bg-emerald-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500">
            <CheckCircle size={120} />
          </div>
          <h3 className="text-emerald-400 font-bold text-lg mb-2">Admission Process Complete!</h3>
          <p className="text-sm text-slate-300 mb-4">
            Student profile created for <span className="font-bold text-white">{createdCredentials.name}</span>.
          </p>
          <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl space-y-2 max-w-sm">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Username:</span>
              <span className="text-slate-200 font-bold font-mono">{createdCredentials.username}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Password:</span>
              <span className="text-slate-200 font-bold font-mono">{createdCredentials.password}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Assigned Role:</span>
              <span className="text-indigo-400 font-bold">{createdCredentials.role}</span>
            </div>
          </div>
          <button
            onClick={() => setCreatedCredentials(null)}
            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Admit Another Student
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 glass-panel rounded-2xl p-6 md:p-8">
        {/* Section 1: Academic & Bio Details */}
        <div className="space-y-6">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">Academic & Personal Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Admission No *</label>
              <input
                type="text"
                required
                name="admissionNo"
                placeholder="e.g. DVHS2026001"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.admissionNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Roll Number</label>
              <input
                type="text"
                name="rollNo"
                placeholder="e.g. 12"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.rollNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Session *</label>
              <input
                type="text"
                required
                name="currentSession"
                placeholder="e.g. 2026-2027"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.currentSession}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Date of Birth *</label>
              <input
                type="date"
                required
                name="dob"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Gender *</label>
              <select
                name="gender"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Class *</label>
              <select
                name="class"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.class}
                onChange={handleChange}
              >
                {classes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Section *</label>
              <select
                name="section"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.section}
                onChange={handleChange}
              >
                {sections.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                placeholder="e.g. O+"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Aadhaar Number</label>
              <input
                type="text"
                name="aadhaar"
                placeholder="12-digit UID"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.aadhaar}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Parent Information */}
        <div className="space-y-6">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">Parent Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Father Name *</label>
              <input
                type="text"
                required
                name="fatherName"
                placeholder="Father name"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.parentDetails.fatherName}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mother Name *</label>
              <input
                type="text"
                required
                name="motherName"
                placeholder="Mother name"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.parentDetails.motherName}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Parent Mobile *</label>
              <input
                type="tel"
                required
                name="mobile"
                placeholder="Will serve as default password"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.parentDetails.mobile}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Parent Email</label>
              <input
                type="email"
                name="email"
                placeholder="parent@gmail.com"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.parentDetails.email}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Street Address</label>
              <input
                type="text"
                name="street"
                placeholder="Flat / Building / Street"
                className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                value={formData.address.street}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Confirm Student Admission'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
