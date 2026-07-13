import React from 'react';
import { Award, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Exams() {
  const chartData = {
    labels: ['Class Nursery', 'Class KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'],
    datasets: [
      {
        label: 'Average Score (%)',
        data: [82, 79, 85, 88, 83, 81, 78, 82, 75, 73, 69, 71],
        fill: false,
        borderColor: '#6366f1',
        tension: 0.35,
      }
    ]
  };

  const cardClass = "glass-panel rounded-2xl p-5 border border-slate-850 flex items-center gap-4";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Examination Records</h1>
        <p className="text-slate-400 text-sm">View aggregate academic score graphs, class-average trends, and exam dates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cardClass}>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Award size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Overall Class average</span>
            <p className="text-lg font-black text-white">78.8%</p>
            <span className="text-[9px] text-emerald-450 flex items-center gap-0.5">
              <TrendingUp size={12} />
              +1.5% vs last term
            </span>
          </div>
        </div>

        <div className={cardClass}>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Passing Rate</span>
            <p className="text-lg font-black text-white">96.8%</p>
            <span className="text-[9px] text-slate-500">22 failures predicted</span>
          </div>
        </div>

        <div className={cardClass}>
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
            <BarChart3 size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Academic Term</span>
            <p className="text-lg font-black text-white">First Term Exams</p>
            <span className="text-[9px] text-indigo-400">Begins Sept 10</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-6">
          <h3 className="font-bold text-white text-base">Class Performance Curve</h3>
          <div className="h-[280px]">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}
