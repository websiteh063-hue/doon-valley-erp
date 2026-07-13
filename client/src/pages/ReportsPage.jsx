import React from 'react';
import { FileText, Download, TrendingUp, Users, CheckCircle, CreditCard } from 'lucide-react';

export default function ReportsPage() {
  
  const handleExport = (reportType) => {
    // Generate a mock CSV trigger
    const csvContent = "data:text/csv;charset=utf-8,ID,Name,Class,Details\n1,Aman Singh,Class X,Admission Record\n2,Aarav Kumar,Class X,Admission Record";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportType}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cardClass = "glass-panel rounded-3xl p-6 border border-slate-850 flex flex-col justify-between hover:border-indigo-500/30 transition-all group";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">School Reports Center</h1>
        <p className="text-slate-400 text-sm">Download aggregated data reports, student enrollments list, attendance histories, and billing sheets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Report 1 */}
        <div className={cardClass}>
          <div className="space-y-3">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 w-fit">
              <Users size={20} />
            </div>
            <h3 className="font-extrabold text-white text-base">Admission Reports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Contains details of new student profiles registered in the active academic session.</p>
          </div>
          <button
            onClick={() => handleExport('Admission')}
            className="mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-850/60 cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        {/* Report 2 */}
        <div className={cardClass}>
          <div className="space-y-3">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit">
              <FileText size={20} />
            </div>
            <h3 className="font-extrabold text-white text-base">Student Directories</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Full directory of active students mapped by their respective classes and sections.</p>
          </div>
          <button
            onClick={() => handleExport('Student_Directory')}
            className="mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-850/60 cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        {/* Report 3 */}
        <div className={cardClass}>
          <div className="space-y-3">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <CheckCircle size={20} />
            </div>
            <h3 className="font-extrabold text-white text-base">Attendance Registries</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Monthly presence percentages and leave details for both students and employee divisions.</p>
          </div>
          <button
            onClick={() => handleExport('Attendance')}
            className="mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-850/60 cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        {/* Report 4 */}
        <div className={cardClass}>
          <div className="space-y-3">
            <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400 w-fit">
              <CreditCard size={20} />
            </div>
            <h3 className="font-extrabold text-white text-base">Fees Collection Statements</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Class-wise collection metrics, pending balances list, and defaulter tracking sheets.</p>
          </div>
          <button
            onClick={() => handleExport('Fees')}
            className="mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-850/60 cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>

        {/* Report 5 */}
        <div className={cardClass}>
          <div className="space-y-3">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-extrabold text-white text-base">Employee Statements</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Onboarded staff details categorized by department designation and monthly pay structures.</p>
          </div>
          <button
            onClick={() => handleExport('Employee')}
            className="mt-6 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-850/60 cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
