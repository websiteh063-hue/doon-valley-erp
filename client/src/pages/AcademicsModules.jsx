import React from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, Award, AlertTriangle, FileText, Calendar, Plus } from 'lucide-react';

export default function AcademicsModules() {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    if (path.includes('academics')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Subject Allocations & Syllabus</h2>
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
        </div>
      );
    }

    if (path.includes('lesson-planner')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Weekly Lesson Planners</h2>
          <div className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="font-extrabold text-white text-sm">Class X - Physics (Week 3)</h4>
              <span className="badge-indigo font-bold px-2.5 py-1 rounded-xl text-[9px] uppercase">Approved</span>
            </div>
            <p className="text-xs text-slate-455">**Topic**: Geometric Optics (Refraction, Convex lens equations).</p>
            <p className="text-xs text-slate-455">**Lab Activity**: Finding focal length of double convex mirror using optical bench.</p>
          </div>
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
    if (path.includes('academics')) return { title: 'Academics Configurations', desc: 'Manage class syllabus schemes, curriculum guidelines, and subject layouts.' };
    if (path.includes('lesson-planner')) return { title: 'Lesson Planner Log', desc: 'Review weekly lesson planners, lab protocols, and teacher notes.' };
    if (path.includes('question-papers')) return { title: 'Question Papers Desk', desc: 'Secure repository for exam paper blueprints, drafts, and archives.' };
    if (path.includes('primary-evaluation')) return { title: 'Primary Evaluation Rubric', desc: 'Track cognitive progress and motor skills parameters for Nursery and Kindergarten divisions.' };
    if (path.includes('disciplinary')) return { title: 'Student Disciplinary Actions', desc: 'Review disciplinary warning logs, conduct checklists, and parent reports.' };
    return { title: 'Academic Portal', desc: 'Manage school academic operations.' };
  };

  const header = getPageHeader();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">{header.title}</h1>
        <p className="text-slate-400 text-sm">{header.desc}</p>
      </div>

      {renderContent()}
    </div>
  );
}
