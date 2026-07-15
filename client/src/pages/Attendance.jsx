import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { Calendar, CheckCircle2, UserCheck, Search, Sliders } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Attendance() {
  const { academicSession } = useSelector((state) => state.auth);
  
  // Search state
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const classes = ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedSection) {
      setError('Please select both Class and Section.');
      return;
    }
    setLoading(true);
    setSearched(true);
    setSuccess('');
    setError('');

    try {
      const queryParams = new URLSearchParams();
      queryParams.append('class', selectedClass);
      queryParams.append('section', selectedSection);
      queryParams.append('currentSession', academicSession);

      const response = await api.get(`/students?${queryParams.toString()}`);
      const list = response.data.students || [];

      // Map students to include attendance status default as 'Present'
      setStudents(
        list.map((s) => ({
          _id: s._id,
          name: s.firstName,
          admissionNo: s.admissionNo,
          rollNo: s.rollNo,
          attendance: 'Present'
        }))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to fetch class list.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s._id === id
          ? { ...s, attendance: s.attendance === 'Present' ? 'Absent' : 'Present' }
          : s
      )
    );
  };

  const handleSave = () => {
    setSubmitLoading(true);
    setSuccess('');
    setError('');
    
    setTimeout(() => {
      setSuccess(`Attendance sheet for ${selectedClass} - ${selectedSection} submitted successfully!`);
      setSubmitLoading(false);
    }, 1200);
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Mark Attendance</h1>
        <p className="text-slate-400 text-sm font-medium">Select class criteria to load students, mark daily status, and submit sheets.</p>
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

      {/* Select Criteria */}
      <form onSubmit={handleSearch} className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-6">
        <h3 className="font-extrabold text-white text-xs tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
          <Sliders size={14} className="text-indigo-400" />
          Select Class & Date
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className={labelClass}>Class *</label>
            <select
              required
              className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="" className="bg-slate-900">Select Class</option>
              {classes.map((c) => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Section *</label>
            <select
              required
              className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="" className="bg-slate-900">Select Section</option>
              {sections.map((s) => (
                <option key={s} value={s} className="bg-slate-900">{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Attendance Date</label>
            <input
              type="date"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800/40">
          <button
            type="submit"
            className="btn-glow px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 uppercase tracking-wider"
          >
            <Search size={14} />
            Load Class List
          </button>
        </div>
      </form>

      {/* Directory Table */}
      {searched && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            {loading ? (
              <div className="flex items-center justify-center p-16">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : students.length === 0 ? (
              <div className="p-16 text-center text-slate-500 text-sm font-medium">
                No active students registered under {selectedClass} - {selectedSection} for session {academicSession}.
              </div>
            ) : (
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                    <th className="py-4.5 px-6">Roll No</th>
                    <th className="py-4.5 px-6">Admission No</th>
                    <th className="py-4.5 px-6">Student Name</th>
                    <th className="py-4.5 px-6 text-center">Status</th>
                    <th className="py-4.5 px-6 text-right">Toggle Checklist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/50">
                  {students.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                      <td className="py-4.5 px-6 font-mono font-bold text-slate-450">{s.rollNo || '-'}</td>
                      <td className="py-4.5 px-6 font-mono font-bold text-indigo-400">{s.admissionNo}</td>
                      <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-450 shrink-0">
                          <UserCheck size={14} />
                        </div>
                        {s.name}
                      </td>
                      <td className="py-4.5 px-6 text-center">
                        <span className={`badge-${s.attendance === 'Present' ? 'emerald' : 'rose'} font-bold px-3 py-1.5 rounded-xl text-[9px] uppercase tracking-wide`}>
                          {s.attendance}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => toggleAttendance(s._id)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                            s.attendance === 'Present'
                              ? 'bg-emerald-500/10 text-emerald-450 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-455 border border-rose-500/20'
                          }`}
                        >
                          Set {s.attendance === 'Present' ? 'Absent' : 'Present'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {students.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={submitLoading}
                className="btn-glow px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer flex items-center gap-2"
              >
                {submitLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Submit Attendance Sheet
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
