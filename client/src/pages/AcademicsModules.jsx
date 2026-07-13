import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { BookOpen, Award, AlertTriangle, FileText, Calendar, Plus, UserCheck, ShieldCheck } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function AcademicsModules() {
  const location = useLocation();
  const path = location.pathname;
  const { academicSession } = useSelector((state) => state.auth);

  // Tab state for Academics configuration
  const [activeTab, setActiveTab] = useState('syllabus'); // syllabus | promote

  // Promotion States
  const [promoClass, setPromoClass] = useState('Class I');
  const [promoStudents, setPromoStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [targetClass, setTargetClass] = useState('Class II');
  const [targetSection, setTargetSection] = useState('A');
  const [targetSession, setTargetSession] = useState('2027-2028');
  
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const classes = ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
  const sections = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    if (activeTab === 'promote') {
      fetchPromoStudents();
    }
  }, [promoClass, activeTab, academicSession]);

  const fetchPromoStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/students?class=${promoClass}&currentSession=${academicSession}`);
      setPromoStudents(response.data.students || []);
      setSelectedStudentIds([]);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch class students for promotion.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectToggle = (id) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudentIds.length === promoStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(promoStudents.map((s) => s._id));
    }
  };

  const handlePromoteSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudentIds.length === 0) {
      setError('Please select at least one student to promote.');
      return;
    }
    setPromoLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/students/promote', {
        studentIds: selectedStudentIds,
        nextClass: targetClass,
        nextSection: targetSection,
        nextSession: targetSession
      });
      setSuccess(response.data.message || 'Students promoted successfully!');
      fetchPromoStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Promotion failed.');
    } finally {
      setPromoLoading(false);
    }
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  const renderContent = () => {
    if (path.includes('academics')) {
      return (
        <div className="space-y-6">
          {/* Tab Selector Buttons */}
          <div className="flex border-b border-slate-850 gap-4">
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'border-b-2 border-indigo-500 text-white'
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              Curriculum & Syllabus
            </button>
            <button
              onClick={() => setActiveTab('promote')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'promote'
                  ? 'border-b-2 border-indigo-500 text-white'
                  : 'text-slate-500 hover:text-slate-350'
              }`}
            >
              Promote Students (New Year)
            </button>
          </div>

          {activeTab === 'syllabus' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-3">
                <h4 className="font-extrabold text-white text-sm">Class X Curriculum</h4>
                <p className="text-xs text-slate-400">Mathematics, Physics, Chemistry, English Literature, and Social Studies.</p>
                <span className="badge-cyan font-bold px-2 py-0.5 rounded-xl text-[9px] uppercase tracking-wide inline-block">5 Subjects Active</span>
              </div>
              <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-3">
                <h4 className="font-extrabold text-white text-sm">Class IX Curriculum</h4>
                <p className="text-xs text-slate-400">Mathematics, Physics, Biology, Hindi, and Computer Applications.</p>
                <span className="badge-cyan font-bold px-2 py-0.5 rounded-xl text-[9px] uppercase tracking-wide inline-block">5 Subjects Active</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Promotion Setup Form */}
              <form onSubmit={handlePromoteSubmit} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
                <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
                  <UserCheck size={16} className="text-indigo-400" />
                  Promotion Rules
                </h3>
                
                <div>
                  <label className={labelClass}>Source Class (Current Year)</label>
                  <select
                    className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                    value={promoClass}
                    onChange={(e) => setPromoClass(e.target.value)}
                  >
                    {classes.map((c) => (
                      <option key={c} value={c} className="bg-slate-900">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Target Class (Next Year)</label>
                  <select
                    className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                    value={targetClass}
                    onChange={(e) => setTargetClass(e.target.value)}
                  >
                    {classes.map((c) => (
                      <option key={c} value={c} className="bg-slate-900">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Target Section</label>
                    <select
                      className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                      value={targetSection}
                      onChange={(e) => setTargetSection(e.target.value)}
                    >
                      {sections.map((s) => (
                        <option key={s} value={s} className="bg-slate-900">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Target Session</label>
                    <select
                      className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                      value={targetSession}
                      onChange={(e) => setTargetSession(e.target.value)}
                    >
                      <option value="2026-2027" className="bg-slate-900">2026-2027</option>
                      <option value="2027-2028" className="bg-slate-900">2027-2028</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={promoLoading || selectedStudentIds.length === 0}
                  className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer flex items-center justify-center"
                >
                  {promoLoading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    `Promote ${selectedStudentIds.length} Student(s)`
                  )}
                </button>
              </form>

              {/* Students Checklist Directory */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-base">Students Checklist ({promoClass})</h3>
                  {promoStudents.length > 0 && (
                    <button
                      onClick={handleSelectAll}
                      className="text-xs text-indigo-400 font-bold hover:underline cursor-pointer"
                    >
                      {selectedStudentIds.length === promoStudents.length ? 'Deselect All' : 'Select All'}
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="flex items-center justify-center p-16">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : promoStudents.length === 0 ? (
                  <div className="p-16 text-center text-slate-550 border border-slate-850 rounded-3xl glass-panel text-sm font-medium">
                    No active student records found under {promoClass} for session {academicSession}.
                  </div>
                ) : (
                  <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                          <th className="py-4.5 px-6">Select</th>
                          <th className="py-4.5 px-6">Admission No</th>
                          <th className="py-4.5 px-6">Roll No</th>
                          <th className="py-4.5 px-6">Student Name</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850/50">
                        {promoStudents.map((s) => (
                          <tr key={s._id} className="hover:bg-slate-900/20 transition-all duration-200">
                            <td className="py-4.5 px-6">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                checked={selectedStudentIds.includes(s._id)}
                                onChange={() => handleSelectToggle(s._id)}
                              />
                            </td>
                            <td className="py-4.5 px-6 font-mono font-bold text-indigo-400">{s.admissionNo}</td>
                            <td className="py-4.5 px-6 font-mono text-slate-400">{s.rollNo || '-'}</td>
                            <td className="py-4.5 px-6 font-bold text-slate-200">{s.firstName} {s.lastName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (path.includes('question-papers')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Question Papers Repository</h2>
          <div className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="font-extrabold text-white text-sm">Class X Mathematics First Term Paper</h4>
              <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 cursor-pointer">
                Download PDF
              </button>
            </div>
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-white text-sm">Class IX Biology Half-Yearly Theory Mock</h4>
              <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 cursor-pointer">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (path.includes('primary-evaluation')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Primary Division Evaluations</h2>
          <p className="text-xs text-slate-400 mb-4">Evaluations cover grade parameters like handwriting skills, reading logs, and behavior checkers.</p>
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-3">
            <h4 className="font-extrabold text-white text-sm">Nursery & KG Assessment Rules</h4>
            <p className="text-xs text-slate-455">Cognitive, motor skills, and color recognition parameters are updated quarterly in child report cards.</p>
          </div>
        </div>
      );
    }

    if (path.includes('disciplinary')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Student Disciplinary Logs</h2>
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-extrabold text-white text-sm">Inappropriate Conduct - Class X Student</h4>
              <span className="badge-rose font-bold px-2 py-0.5 rounded-xl text-[8px] uppercase">Warning issued</span>
            </div>
            <p className="text-xs text-slate-455">Logged on 2026-07-10. Classroom disturbance during Physics session. Parents informed.</p>
          </div>
        </div>
      );
    }

    return null;
  };

  const getPageHeader = () => {
    if (path.includes('academics')) return { title: 'Academics Configurations', desc: 'Manage class syllabus schemes, curriculum guidelines, and promote students.' };
    if (path.includes('question-papers')) return { title: 'Question Papers Desk', desc: 'Secure repository for exam paper blueprints, drafts, and archives.' };
    if (path.includes('primary-evaluation')) return { title: 'Primary Evaluation Rubric', desc: 'Track cognitive progress and motor skills parameters for Nursery and Kindergarten divisions.' };
    if (path.includes('disciplinary')) return { title: 'Student Disciplinary Actions', desc: 'Review disciplinary warning logs, conduct checklists, and parent reports.' };
    return { title: 'Academic Portal', desc: 'Manage school academic operations.' };
  };

  const header = getPageHeader();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">{header.title}</h1>
        <p className="text-slate-400 text-sm">{header.desc}</p>
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

      {renderContent()}
    </div>
  );
}
