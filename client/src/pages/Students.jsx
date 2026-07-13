import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, Sliders } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Student Directory</h1>
          <p className="text-slate-400 text-sm">View student profiles, academic classes, and parent contact details.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by name or Admission No..."
            className="w-full bg-slate-950/50 border border-slate-850 rounded-xl py-2 pl-9 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 text-slate-400">
            <Sliders size={16} />
            <span className="text-xs font-semibold">Filter:</span>
          </div>

          <select
            name="class"
            className="bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-300 focus:outline-none focus:border-indigo-500 text-xs"
            value={filters.class}
            onChange={handleFilterChange}
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            name="section"
            className="bg-slate-950/50 border border-slate-850 rounded-xl py-2 px-3 text-slate-300 focus:outline-none focus:border-indigo-500 text-xs"
            value={filters.section}
            onChange={handleFilterChange}
          >
            <option value="">All Sections</option>
            {sections.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No students found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold bg-slate-900/35">
                  <th className="py-4 px-6">Admission No</th>
                  <th className="py-4 px-6">Roll No</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Class & Section</th>
                  <th className="py-4 px-6">Parent</th>
                  <th className="py-4 px-6">Parent Mobile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredStudents.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-300">{s.admissionNo}</td>
                    <td className="py-4 px-6 text-slate-400">{s.rollNo || '-'}</td>
                    <td className="py-4 px-6 font-semibold text-slate-200">{s.firstName} {s.lastName}</td>
                    <td className="py-4 px-6">
                      <span className="bg-indigo-500/10 text-indigo-400 font-bold px-2.5 py-1 rounded-full text-[10px]">
                        {s.class} - {s.section}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      {s.parent ? s.parent.fatherName : '-'}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-400">
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
