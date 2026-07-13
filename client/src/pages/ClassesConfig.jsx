import React, { useState } from 'react';
import { Plus, Trash2, Edit, CheckCircle } from 'lucide-react';

export default function ClassesConfig() {
  const [classesList, setClassesList] = useState([
    { id: 1, name: 'Class I', sections: ['A', 'B'], classTeacher: 'Mr. R. K. Verma', subjects: ['Mathematics', 'Science', 'English'] },
    { id: 2, name: 'Class II', sections: ['A'], classTeacher: 'Ms. Shalini Gupta', subjects: ['Mathematics', 'EVS', 'Hindi'] },
    { id: 3, name: 'Class X', sections: ['A', 'B', 'C'], classTeacher: 'Dr. S. P. Pandey', subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'] }
  ]);

  const [formData, setFormData] = useState({ name: '', sections: 'A', classTeacher: '', subjects: '' });
  const [success, setSuccess] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    setClassesList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: formData.name,
        sections: formData.sections.split(',').map((s) => s.trim()),
        classTeacher: formData.classTeacher,
        subjects: formData.subjects.split(',').map((s) => s.trim())
      }
    ]);
    setSuccess('Class configuration saved successfully!');
    setFormData({ name: '', sections: 'A', classTeacher: '', subjects: '' });
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id) => {
    setClassesList((prev) => prev.filter((c) => c.id !== id));
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Class & Section Management</h1>
        <p className="text-slate-400 text-sm">Create school classes, allocate sections, assign class teachers, and attach subjects.</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleAdd} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            <Plus size={16} className="text-indigo-400" />
            Create Class
          </h3>
          <div>
            <label className={labelClass}>Class Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Class I"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Sections (Comma Separated)</label>
            <input
              type="text"
              placeholder="e.g. A, B, C"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.sections}
              onChange={(e) => setFormData({ ...formData, sections: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Assign Class Teacher</label>
            <input
              type="text"
              placeholder="e.g. Mr. Verma"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.classTeacher}
              onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Subjects (Comma Separated)</label>
            <input
              type="text"
              placeholder="e.g. English, Science"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.subjects}
              onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Create Class Unit
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-white text-base">Configured Classes</h3>
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Class Name</th>
                  <th className="py-4.5 px-6">Sections</th>
                  <th className="py-4.5 px-6">Class Teacher</th>
                  <th className="py-4.5 px-6">Subjects</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {classesList.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/20 transition-all duration-200">
                    <td className="py-4.5 px-6 font-bold text-slate-200">{c.name}</td>
                    <td className="py-4.5 px-6 font-mono text-slate-400">
                      {c.sections.map((sec) => (
                        <span key={sec} className="badge-cyan px-2 py-0.5 rounded text-[8px] mr-1 uppercase">
                          {sec}
                        </span>
                      ))}
                    </td>
                    <td className="py-4.5 px-6 text-slate-350 font-semibold">{c.classTeacher || '-'}</td>
                    <td className="py-4.5 px-6 text-slate-400 max-w-xs truncate">{c.subjects.join(', ')}</td>
                    <td className="py-4.5 px-6 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 text-rose-450 hover:text-white rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
