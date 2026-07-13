import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, TrendingDown, Plus, CreditCard, DollarSign } from 'lucide-react';

export default function IncomeExpense() {
  const location = useLocation();
  const isIncome = location.pathname.includes('income');

  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Q1 Books Supply sale', category: 'Bookshop', date: '2026-07-10', type: 'Income', amount: 45000 },
    { id: 2, title: 'Server Hosting Lease', category: 'IT Infra', date: '2026-07-11', type: 'Expense', amount: 8000 },
    { id: 3, title: 'Uniform store collections', category: 'Merchandise', date: '2026-07-12', type: 'Income', amount: 35000 },
    { id: 4, title: 'Science Lab Chemicals', category: 'Laboratory', date: '2026-07-13', type: 'Expense', amount: 15000 }
  ]);

  const [formData, setFormData] = useState({ title: '', category: 'General', amount: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    setTransactions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: formData.title,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
        type: isIncome ? 'Income' : 'Expense',
        amount: Number(formData.amount)
      }
    ]);
    setFormData({ title: '', category: 'General', amount: '' });
  };

  const filtered = transactions.filter((t) => (isIncome ? t.type === 'Income' : t.type === 'Expense'));
  const total = filtered.reduce((acc, t) => acc + t.amount, 0);

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">
          School {isIncome ? 'Income Source Ledger' : 'Operating Expense Ledger'}
        </h1>
        <p className="text-slate-400 text-sm">
          Track school {isIncome ? 'non-tuition income collections' : 'infrastructure procurement and staff maintenance costs'}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleAdd} className="glass-panel rounded-3xl p-6 space-y-6 border border-slate-850 h-fit">
          <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
            {isIncome ? <TrendingUp size={16} className="text-indigo-400" /> : <TrendingDown size={16} className="text-rose-400" />}
            Record {isIncome ? 'Income' : 'Expense'} Voucher
          </h3>
          <div>
            <label className={labelClass}>Description *</label>
            <input
              type="text"
              required
              placeholder={isIncome ? 'e.g. Canteen Lease Sale' : 'e.g. Classroom Chairs Repair'}
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              placeholder="e.g. Facilities / Assets"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Voucher Amount (₹) *</label>
            <input
              type="number"
              required
              placeholder="Amount in Rupees"
              className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Submit Voucher
          </button>
        </form>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${isIncome ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-450'}`}>
              <CreditCard size={20} />
            </div>
            <div>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                Total {isIncome ? 'Recorded Income' : 'Recorded Operating Expenses'}
              </span>
              <p className="text-lg font-black text-white">₹{total.toLocaleString()}</p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Voucher Name</th>
                  <th className="py-4.5 px-6">Category</th>
                  <th className="py-4.5 px-6">Transaction Date</th>
                  <th className="py-4.5 px-6 text-right">Receipt Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-900/20 transition-all duration-200">
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                      <DollarSign size={14} className={isIncome ? 'text-indigo-400' : 'text-rose-400'} />
                      {t.title}
                    </td>
                    <td className="py-4.5 px-6 text-slate-400 font-semibold">{t.category}</td>
                    <td className="py-4.5 px-6 font-mono text-slate-350">{t.date}</td>
                    <td className="py-4.5 px-6 text-slate-200 font-extrabold font-mono text-right text-xs">
                      ₹{t.amount.toLocaleString()}
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
