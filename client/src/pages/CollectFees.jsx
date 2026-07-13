import React, { useState } from 'react';
import { Search, Wallet, FileText, CheckCircle } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CollectFees() {
  const [loading, setLoading] = useState(false);
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [success, setSuccess] = useState('');
  
  const [paymentData, setPaymentData] = useState({
    amount: '',
    mode: 'Cash',
    referenceNo: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!studentSearch) return;
    // Mock Search result
    setSelectedStudent({
      id: 1,
      name: 'Aman Singh',
      admissionNo: 'DVHS2026001',
      class: 'Class X',
      pendingAmount: 12000
    });
  };

  const handleCollect = async (e) => {
    e.preventDefault();
    if (!paymentData.amount) return;
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setSuccess(`Receipt generated successfully for ₹${paymentData.amount}!`);
      setSelectedStudent((prev) => ({
        ...prev,
        pendingAmount: prev.pendingAmount - Number(paymentData.amount)
      }));
      setPaymentData({ amount: '', mode: 'Cash', referenceNo: '' });
      setLoading(false);
    }, 1500);
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Collect Student Fees</h1>
        <p className="text-slate-400 text-sm">Search student profiles, view pending balances, and record payment transactions.</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      {/* Step 1: Student Search */}
      <form onSubmit={handleSearch} className="glass-panel rounded-3xl p-6 border border-slate-850 flex gap-4 items-end">
        <div className="flex-1">
          <label className={labelClass}>Search Student (Name or Admission No)</label>
          <input
            type="text"
            required
            placeholder="e.g. DVHS2026001"
            className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn-glow px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer h-[38px] flex items-center gap-2 uppercase tracking-wider"
        >
          <Search size={14} />
          Search
        </button>
      </form>

      {/* Step 2: Payment Collector Panel */}
      {selectedStudent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-4">
            <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <FileText size={16} className="text-indigo-400" />
              Student Profile
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500 font-bold uppercase">Name:</span>
                <span className="text-slate-200 font-bold">{selectedStudent.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500 font-bold uppercase">Admission No:</span>
                <span className="text-slate-200 font-mono font-bold">{selectedStudent.admissionNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span className="text-slate-500 font-bold uppercase">Class:</span>
                <span className="text-indigo-400 font-bold">{selectedStudent.class}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-500 font-bold uppercase">Total Pending:</span>
                <span className="text-rose-400 font-mono font-extrabold text-sm">₹{selectedStudent.pendingAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleCollect} className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-4">
            <h3 className="font-extrabold text-white text-sm tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <Wallet size={16} className="text-cyan-400" />
              Record Payment
            </h3>
            <div>
              <label className={labelClass}>Receipt Amount (₹) *</label>
              <input
                type="number"
                required
                max={selectedStudent.pendingAmount}
                placeholder="Amount in Rupees"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={paymentData.amount}
                onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Payment Mode *</label>
                <select
                  className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                  value={paymentData.mode}
                  onChange={(e) => setPaymentData({ ...paymentData, mode: e.target.value })}
                >
                  <option value="Cash" className="bg-slate-900">Cash</option>
                  <option value="UPI" className="bg-slate-900">UPI / QR</option>
                  <option value="Card" className="bg-slate-900">Card Swipe</option>
                  <option value="Bank" className="bg-slate-900">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Reference No</label>
                <input
                  type="text"
                  placeholder="Txn ID / Ref No"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={paymentData.referenceNo}
                  onChange={(e) => setPaymentData({ ...paymentData, referenceNo: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || selectedStudent.pendingAmount <= 0}
              className="w-full btn-glow py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer flex items-center justify-center"
            >
              {loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                'Submit Receipt'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
