import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, Sliders, User } from 'lucide-react';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ class: '', section: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.class) queryParams.append('class', filters.class);
      if (filters.section) queryParams.append('section', filters.section);

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

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const admNo = s.admissionNo.toLowerCase();
    return fullName.includes(search.toLowerCase()) || admNo.includes(search.toLowerCase());
  });

  const classes = ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
  const sections = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Student Directory</h1>
          <p className="text-slate-400 text-sm">View student profiles, academic classes, and parent contact details.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between border border-slate-850">
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by name or Admission No..."
            className="w-full premium-input py-2 pl-11 pr-4 text-slate-200 focus:outline-none text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-slate-500">
            <Sliders size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Filter:</span>
          </div>

          <select
            name="class"
            className="premium-input py-2 px-4 text-slate-355 focus:outline-none text-xs cursor-pointer"
            value={filters.class}
            onChange={handleFilterChange}
          >
            <option value="" className="bg-slate-900">All Classes</option>
            {classes.map((c) => (
              <option key={c} value={c} className="bg-slate-900">{c}</option>
            ))}
          </select>

          <select
            name="section"
            className="premium-input py-2 px-4 text-slate-355 focus:outline-none text-xs cursor-pointer"
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

      {/* Directory Table */}
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
                    <td className="py-4.5 px-6 text-slate-350 font-medium">
                      {s.parent ? s.parent.fatherName : '-'}
                    </td>
                    <td className="py-4.5 px-6 font-mono font-semibold text-slate-450 text-right">
                      {s.parent ? s.parent.mobile : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
