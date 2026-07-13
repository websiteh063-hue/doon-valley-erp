import React from 'react';
import { Landmark, ArrowUpRight, ArrowDownRight, Wallet, Percent } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FeesTracker() {
  const chartData = {
    labels: ['Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'],
    datasets: [
      {
        label: 'Collected (₹)',
        data: [120000, 110000, 130000, 95000, 105000, 140000, 125000, 115000, 150000, 170000],
        backgroundColor: 'rgba(99, 102, 241, 0.65)',
        borderRadius: 6,
      },
      {
        label: 'Pending (₹)',
        data: [15000, 20000, 10000, 25000, 15000, 5000, 20000, 30000, 10000, 15000],
        backgroundColor: 'rgba(244, 63, 94, 0.65)',
        borderRadius: 6,
      }
    ]
  };

  const cardClass = "glass-panel rounded-2xl p-5 border border-slate-850 flex items-center gap-4";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Fees Revenue Tracker</h1>
        <p className="text-slate-400 text-sm">Monitor overall collection metrics, pending balances, and defaults across classes.</p>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={cardClass}>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Landmark size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Collection</span>
            <p className="text-lg font-black text-white">₹12.6 Lakhs</p>
            <span className="text-[9px] text-emerald-450 flex items-center gap-0.5">
              <ArrowUpRight size={12} />
              +12% vs last term
            </span>
          </div>
        </div>

        <div className={cardClass}>
          <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400">
            <Wallet size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Pending Dues</span>
            <p className="text-lg font-black text-white">₹1.8 Lakhs</p>
            <span className="text-[9px] text-rose-455 flex items-center gap-0.5">
              <ArrowDownRight size={12} />
              11% defaulters
            </span>
          </div>
        </div>

        <div className={cardClass}>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <Percent size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Collection Ratio</span>
            <p className="text-lg font-black text-white">87.5%</p>
            <span className="text-[9px] text-slate-500">Target: 95.0%</span>
          </div>
        </div>

        <div className={cardClass}>
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
            <Landmark size={20} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Cycle Receipts</span>
            <p className="text-lg font-black text-white">342 Invoices</p>
            <span className="text-[9px] text-indigo-400">Q2 Term Billing</span>
          </div>
        </div>
      </div>

      {/* Chart Layout */}
      <div className="grid grid-cols-1 gap-8">
        <div className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-6">
          <h3 className="font-bold text-white text-base">Class-wise Collection Analysis</h3>
          <div className="h-[300px]">
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}
