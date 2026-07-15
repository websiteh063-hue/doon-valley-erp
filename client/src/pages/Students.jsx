import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { Search, User, Edit, Eye, X, Shield, Contact, Phone, Mail, Award, CheckCircle } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Students() {
  const { academicSession } = useSelector((state) => state.auth);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ class: '', section: '', search: '' });

  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    class: '',
    section: '',
    parent: {
      fatherName: '',
      fatherOccupation: '',
      fatherAadhaar: '',
      motherName: '',
      motherOccupation: '',
      motherAadhaar: '',
      mobile: '',
      email: ''
    }
  });

  const [viewingStudent, setViewingStudent] = useState(null);
  const [siblings, setSiblings] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [filters.class, filters.section, academicSession]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.class) queryParams.append('class', filters.class);
      if (filters.section) queryParams.append('section', filters.section);
      queryParams.append('currentSession', academicSession);

      const response = await api.get(`/students?${queryParams.toString()}`);
      setStudents(response.data.students || []);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const openProfileDetails = async (student) => {
    setDetailsLoading(true);
    setViewingStudent(student);
    try {
      const response = await api.get(`/students/${student._id}`);
      setViewingStudent(response.data.student);
      setSiblings(response.data.siblings || []);
    } catch (err) {
      console.error('Failed to load profile details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setEditFormData({
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      rollNo: student.rollNo || '',
      class: student.class || 'Class I',
      section: student.section || 'A',
      parent: {
        fatherName: student.parent?.fatherName || '',
        fatherOccupation: student.parent?.fatherOccupation || '',
        fatherAadhaar: student.parent?.fatherAadhaar || '',
        motherName: student.parent?.motherName || '',
        motherOccupation: student.parent?.motherOccupation || '',
        motherAadhaar: student.parent?.motherAadhaar || '',
        mobile: student.parent?.mobile || '',
        email: student.parent?.email || ''
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParentEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      parent: { ...prev.parent, [name]: value }
    }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/students/${editingStudent._id}`, editFormData);
      fetchStudents();
      setEditingStudent(null);
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  const classes = ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
  const sections = ['A', 'B', 'C', 'D'];

  const filteredStudents = students.filter((s) => {
    const term = filters.search.toLowerCase();
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    return fullName.includes(term) || s.admissionNo.toLowerCase().includes(term);
  });

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Student Directory</h1>
        <p className="text-slate-400 text-sm">View comprehensive student files, manage parent linkages, and audit siblings.</p>
      </div>

      <div className="glass-panel rounded-2xl p-5 border border-slate-850 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              name="search"
              placeholder="Search by name or admission no..."
              className="w-full premium-input py-2 pl-11 pr-4 text-slate-200 focus:outline-none text-xs"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>

          <div className="w-full sm:w-auto">
            <select
              name="class"
              className="w-full sm:w-44 premium-input py-2 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={filters.class}
              onChange={handleFilterChange}
            >
              <option value="" className="bg-slate-900">All Classes</option>
              {classes.map((c) => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <select
              name="section"
              className="w-full sm:w-40 premium-input py-2 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={filters.section}
              onChange={handleFilterChange}
            >
              <option value="" className="bg-slate-900">All Sections</option>
              {sections.map((s) => (
                <option key={s} value={s} className="bg-slate-900">{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
        {loading ? (
          <div className="flex items-center justify-center p-16">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-sm font-medium">
            No students found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Admission No</th>
                  <th className="py-4.5 px-6">Roll No</th>
                  <th className="py-4.5 px-6">Name</th>
                  <th className="py-4.5 px-6">Class & Section</th>
                  <th className="py-4.5 px-6">Parent</th>
                  <th className="py-4.5 px-6 text-right">Parent Mobile</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {filteredStudents.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                    <td className="py-4.5 px-6 font-mono font-bold text-indigo-400 group-hover:text-indigo-350 transition-colors">
                      {s.admissionNo}
                    </td>
                    <td className="py-4.5 px-6 text-slate-400 font-semibold">{s.rollNo || '-'}</td>
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center text-slate-450 group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-all shrink-0">
                        <User size={14} />
                      </div>
                      <span>{s.firstName} {s.lastName}</span>
                    </td>
                    <td className="py-4.5 px-6">
                      <span className="badge-indigo font-bold px-3 py-1.5 rounded-xl text-[9px] uppercase tracking-wide">
                        {s.class} - {s.section}
                      </span>
                    </td>
                    <td className="py-4.5 px-6 text-slate-355 font-medium">
                      {s.parent ? s.parent.fatherName : '-'}
                    </td>
                    <td className="py-4.5 px-6 font-mono font-semibold text-slate-450 text-right">
                      {s.parent ? s.parent.mobile : '-'}
                    </td>
                    <td className="py-4.5 px-6 text-right flex justify-end gap-2">
                      <button
                        onClick={() => openProfileDetails(s)}
                        className="p-2 text-cyan-400 hover:text-white rounded-xl hover:bg-cyan-600/20 transition-colors cursor-pointer"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => openEditModal(s)}
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

      {/* Profile Details Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl glass-panel rounded-3xl p-8 border border-slate-850 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewingStudent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-white text-base tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <Shield size={18} className="text-cyan-400" />
              Student Academic & Personal File
            </h3>

            {detailsLoading ? (
              <div className="flex items-center justify-center py-12">
                <CircularProgress size={24} color="inherit" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Academic Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4.5 bg-slate-900/40 border border-slate-850 rounded-2xl">
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Full Name</span>
                    <p className="text-xs font-bold text-slate-200">{viewingStudent.firstName} {viewingStudent.lastName}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Adm No</span>
                    <p className="text-xs font-bold text-indigo-400 font-mono">{viewingStudent.admissionNo}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Class / Section</span>
                    <p className="text-xs font-bold text-slate-200">{viewingStudent.class} - {viewingStudent.section}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Roll No</span>
                    <p className="text-xs font-bold text-slate-200">{viewingStudent.rollNo || '-'}</p>
                  </div>
                </div>

                {/* Parent Details Card */}
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Contact size={14} className="text-indigo-400" />
                    Parent Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/20 border border-slate-850 rounded-2xl space-y-2">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">Father details</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Name:</span>
                        <span className="font-bold text-slate-200">{viewingStudent.parent?.fatherName || '-'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Aadhaar:</span>
                        <span className="font-bold text-slate-200 font-mono">{viewingStudent.parent?.fatherAadhaar || '-'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Occupation:</span>
                        <span className="font-bold text-slate-200">{viewingStudent.parent?.fatherOccupation || '-'}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/20 border border-slate-850 rounded-2xl space-y-2">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">Mother details</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Name:</span>
                        <span className="font-bold text-slate-200">{viewingStudent.parent?.motherName || '-'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Aadhaar:</span>
                        <span className="font-bold text-slate-200 font-mono">{viewingStudent.parent?.motherAadhaar || '-'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Occupation:</span>
                        <span className="font-bold text-slate-200">{viewingStudent.parent?.motherOccupation || '-'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-slate-900/20 border border-slate-850 rounded-xl">
                      <Phone size={14} className="text-indigo-400" />
                      <div className="text-xs">
                        <span className="block text-[8px] text-slate-500 font-bold uppercase">Mobile Contact</span>
                        <span className="font-bold text-slate-200 font-mono">{viewingStudent.parent?.mobile}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-slate-900/20 border border-slate-850 rounded-xl">
                      <Mail size={14} className="text-indigo-400" />
                      <div className="text-xs">
                        <span className="block text-[8px] text-slate-500 font-bold uppercase">Email Address</span>
                        <span className="font-bold text-slate-200 truncate max-w-[150px] block">{viewingStudent.parent?.email || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sibling Card */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Award size={14} className="text-cyan-400" />
                    Auto-Detected Siblings
                  </h4>
                  {siblings.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No sibling records detected matching parent profile data.</p>
                  ) : (
                    <div className="glass-panel border border-slate-850 overflow-hidden rounded-2xl">
                      <table className="w-full border-collapse text-[11px] text-left">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-450 uppercase font-bold text-[9px] tracking-wider">
                            <th className="py-2.5 px-4">Sibling Name</th>
                            <th className="py-2.5 px-4">Admission No</th>
                            <th className="py-2.5 px-4">Class / Section</th>
                            <th className="py-2.5 px-4">Session</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/50">
                          {siblings.map((sib) => (
                            <tr key={sib._id} className="hover:bg-slate-900/10 transition-colors">
                              <td className="py-2.5 px-4 font-bold text-slate-200 flex items-center gap-1.5">
                                <CheckCircle size={10} className="text-emerald-400" />
                                {sib.firstName} {sib.lastName}
                              </td>
                              <td className="py-2.5 px-4 font-mono text-indigo-400">{sib.admissionNo}</td>
                              <td className="py-2.5 px-4 font-semibold text-slate-350">{sib.class} - {sib.section}</td>
                              <td className="py-2.5 px-4 font-mono text-slate-450">{sib.currentSession}</td>
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
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={saveEdit} className="w-full max-w-xl glass-panel rounded-3xl p-8 border border-slate-850 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingStudent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-white text-base tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <User size={18} className="text-indigo-400" />
              Edit Student Details ({editFormData.firstName})
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

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Roll Number</label>
                <input
                  type="text"
                  name="rollNo"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.rollNo}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Class</label>
                <select
                  name="class"
                  className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                  value={editFormData.class}
                  onChange={handleEditChange}
                >
                  {classes.map((c) => (
                    <option key={c} value={c} className="bg-slate-900">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Section</label>
                <select
                  name="section"
                  className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                  value={editFormData.section}
                  onChange={handleEditChange}
                >
                  {sections.map((s) => (
                    <option key={s} value={s} className="bg-slate-900">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-800/40 pt-4">
              <div>
                <label className={labelClass}>Father Name</label>
                <input
                  type="text"
                  name="fatherName"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.parent.fatherName}
                  onChange={handleParentEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Father Occupation</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.parent.fatherOccupation || ''}
                  onChange={handleParentEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Father Aadhaar</label>
                <input
                  type="text"
                  name="fatherAadhaar"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs font-mono"
                  value={editFormData.parent.fatherAadhaar || ''}
                  onChange={handleParentEditChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-800/40 pt-4">
              <div>
                <label className={labelClass}>Mother Name</label>
                <input
                  type="text"
                  name="motherName"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.parent.motherName || ''}
                  onChange={handleParentEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Mother Occupation</label>
                <input
                  type="text"
                  name="motherOccupation"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.parent.motherOccupation || ''}
                  onChange={handleParentEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Mother Aadhaar</label>
                <input
                  type="text"
                  name="motherAadhaar"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs font-mono"
                  value={editFormData.parent.motherAadhaar || ''}
                  onChange={handleParentEditChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-800/40 pt-4">
              <div>
                <label className={labelClass}>Parent Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs font-mono"
                  value={editFormData.parent.mobile}
                  onChange={handleParentEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Parent Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.parent.email || ''}
                  onChange={handleParentEditChange}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
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
