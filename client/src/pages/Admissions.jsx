import React, { useState } from 'react';
import api from '../services/api';
import { CheckCircle, ClipboardList, UserCheck, MapPin } from 'lucide-react';
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

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Student Admissions</h1>
        <p className="text-slate-400 text-sm">Register a new student and provision system credentials automatically.</p>
      </div>

      {createdCredentials && (
        <div className="glass-panel border-emerald-500/30 rounded-3xl p-6 bg-emerald-500/5 relative overflow-hidden animate-float-slow">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500">
            <CheckCircle size={150} />
          </div>
          <h3 className="text-emerald-400 font-bold text-lg mb-2 flex items-center gap-2">
            <CheckCircle size={20} />
            Admission Process Complete!
          </h3>
          <p className="text-sm text-slate-350 mb-4">
            Student profile created for <span className="font-bold text-white">{createdCredentials.name}</span>.
          </p>
          <div className="p-5 bg-slate-950/60 border border-slate-800/40 rounded-2xl space-y-3 max-w-sm">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Username:</span>
              <span className="text-slate-200 font-extrabold font-mono text-sm">{createdCredentials.username}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Password:</span>
              <span className="text-slate-200 font-extrabold font-mono text-sm">{createdCredentials.password}</span>
            </div>
            <div className="flex justify-between text-xs border-t border-slate-800/30 pt-2">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Assigned Role:</span>
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-xs">{createdCredentials.role}</span>
            </div>
          </div>
          <button
            onClick={() => setCreatedCredentials(null)}
            className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/20"
          >
            Admit Another Student
          </button>
        </div>
      )}

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-2xl p-4 text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 glass-panel rounded-3xl p-6 md:p-10 border border-slate-850">
        
        {/* Section 1: Academic & Bio Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ClipboardList className="text-indigo-400" size={18} />
            <h3 className="font-extrabold text-white text-sm tracking-widest uppercase">Academic & Personal Profile</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Admission No *</label>
              <input
                type="text"
                required
                name="admissionNo"
                placeholder="e.g. DVHS2026001"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.admissionNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Roll Number</label>
              <input
                type="text"
                name="rollNo"
                placeholder="e.g. 12"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.rollNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Session *</label>
              <input
                type="text"
                required
                name="currentSession"
                placeholder="e.g. 2026-2027"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.currentSession}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <div>
              <label className={labelClass}>Date of Birth *</label>
              <input
                type="date"
                required
                name="dob"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Gender *</label>
              <select
                name="gender"
                className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male" className="bg-slate-900">Male</option>
                <option value="Female" className="bg-slate-900">Female</option>
                <option value="Other" className="bg-slate-900">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className={labelClass}>Class *</label>
              <select
                name="class"
                className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                value={formData.class}
                onChange={handleChange}
              >
                {classes.map((c) => (
                  <option key={c} value={c} className="bg-slate-900">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Section *</label>
              <select
                name="section"
                className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                value={formData.section}
                onChange={handleChange}
              >
                {sections.map((s) => (
                  <option key={s} value={s} className="bg-slate-900">{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                placeholder="e.g. O+"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Aadhaar Number</label>
              <input
                type="text"
                name="aadhaar"
                placeholder="12-digit UID"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.aadhaar}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Parent Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <UserCheck className="text-cyan-400" size={18} />
            <h3 className="font-extrabold text-white text-sm tracking-widest uppercase">Parent Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Father Name *</label>
              <input
                type="text"
                required
                name="fatherName"
                placeholder="Father name"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.parentDetails.fatherName}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
            <div>
              <label className={labelClass}>Mother Name *</label>
              <input
                type="text"
                required
                name="motherName"
                placeholder="Mother name"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.parentDetails.motherName}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
            <div>
              <label className={labelClass}>Parent Mobile *</label>
              <input
                type="tel"
                required
                name="mobile"
                placeholder="Serves as student default pwd"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.parentDetails.mobile}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Parent Email</label>
              <input
                type="email"
                name="email"
                placeholder="parent@gmail.com"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.parentDetails.email}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
            <div>
              <label className={labelClass}>Father Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                placeholder="Father occupation"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.parentDetails.fatherOccupation}
                onChange={(e) => handleChange(e, 'parentDetails')}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Address details */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="text-amber-400" size={18} />
            <h3 className="font-extrabold text-white text-sm tracking-widest uppercase">Contact Address</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className={labelClass}>Street Address</label>
              <input
                type="text"
                name="street"
                placeholder="Flat / Building / Street"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.address.street}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input
                type="text"
                name="city"
                placeholder="City name"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.address.city}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>State</label>
              <input
                type="text"
                name="state"
                placeholder="State / Region"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.address.state}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label className={labelClass}>Zip Code</label>
              <input
                type="text"
                name="zip"
                placeholder="Postal Pin Code"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={formData.address.zip}
                onChange={handleAddressChange}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-5 border-t border-slate-800/40">
          <button
            type="submit"
            disabled={loading}
            className="btn-glow px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              'Confirm Student Admission'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
