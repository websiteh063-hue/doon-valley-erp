import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { Search, CreditCard, User, Wallet, FileText, ChevronRight, X } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CollectFees() {
  const { academicSession } = useSelector((state) => state.auth);
  
  // Search state
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Payment State
  const [paymentStudent, setPaymentStudent] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [paymentData, setPaymentData] = useState({
    amount: '',
    mode: 'Cash',
    referenceNo: ''
  });

  const classes = ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);
    setSuccess('');

    try {
      const queryParams = new URLSearchParams();
      if (selectedClass) queryParams.append('class', selectedClass);
      if (selectedSection) queryParams.append('section', selectedSection);
      queryParams.append('currentSession', academicSession);

      const response = await api.get(`/students?${queryParams.toString()}`);
      let list = response.data.students || [];

      // Filter locally by keyword if provided
      if (keyword) {
        const term = keyword.toLowerCase();
        list = list.filter((s) => {
          const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
          const admNo = s.admissionNo.toLowerCase();
          const mob = s.parent?.mobile || '';
          return fullName.includes(term) || admNo.includes(term) || mob.includes(term);
        });
      }

      setStudents(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openPaymentModal = (student) => {
    // Generate a mock pending amount if not defined
    const mockPending = student.pendingFees ?? 12000;
    setPaymentStudent({ ...student, pendingAmount: mockPending });
    setPaymentData({ amount: '', mode: 'Cash', referenceNo: '' });
  };

  const handleCollectSubmit = async (e) => {
    e.preventDefault();
    if (!paymentData.amount) return;
    setPaymentLoading(true);
    setSuccess('');

    try {
      // Simulate API payment success
      setTimeout(() => {
        setSuccess(`Successfully recorded payment of ₹${paymentData.amount} for ${paymentStudent.firstName}!`);
        
        // Update local list
        setStudents((prev) =>
          prev.map((s) =>
            s._id === paymentStudent._id
              ? { ...s, pendingFees: Math.max(0, (s.pendingFees ?? 12000) - Number(paymentData.amount)) }
              : s
          )
        );

        setPaymentStudent(null);
        setPaymentLoading(false);
      }, 1200);
    } catch (err) {
      console.error(err);
      setPaymentLoading(false);
    }
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Collect Fees</h1>
        <p className="text-slate-400 text-sm">Query student billing criteria, view pending balances, and record payments.</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl p-4 text-center font-medium">
          {success}
        </div>
      )}

      {/* Select Criteria Box */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-6">
        <h3 className="font-extrabold text-white text-xs tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
          <Search size={14} className="text-indigo-400" />
          Select Criteria
        </h3>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label className={labelClass}>Class *</label>
            <select
              className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="" className="bg-slate-900">Select Class</option>
              {classes.map((c) => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Section</label>
            <select
              className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="" className="bg-slate-900">Select Section</option>
              {sections.map((s) => (
                <option key={s} value={s} className="bg-slate-900">{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Search by Keyword</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Admission no, Student Name, Phone"
                className="w-full premium-input py-2.5 px-4 pr-10 text-slate-200 focus:outline-none text-xs"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-white"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end pt-2 border-t border-slate-800/40">
          <button
            onClick={() => handleSearch()}
            className="btn-glow px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 uppercase tracking-wider"
          >
            Search Students
          </button>
        </div>
      </div>

      {/* Results Table */}
      {searched && (
        <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850">
          {loading ? (
            <div className="flex items-center justify-center p-16">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : students.length === 0 ? (
            <div className="p-16 text-center text-slate-500 text-sm font-medium">
              No students found matching the selected criteria.
            </div>
          ) : (
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Admission No</th>
                  <th className="py-4.5 px-6">Roll No</th>
                  <th className="py-4.5 px-6">Student Name</th>
                  <th className="py-4.5 px-6">Class & Section</th>
                  <th className="py-4.5 px-6">Parent Mobile</th>
                  <th className="py-4.5 px-6 text-right">Pending Dues</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {students.map((s) => {
                  const dues = s.pendingFees ?? 12000;
                  return (
                    <tr key={s._id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                      <td className="py-4.5 px-6 font-mono font-bold text-indigo-400">{s.admissionNo}</td>
                      <td className="py-4.5 px-6 text-slate-400 font-semibold">{s.rollNo || '-'}</td>
                      <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                        <User size={14} className="text-slate-500" />
                        {s.firstName} {s.lastName}
                      </td>
                      <td className="py-4.5 px-6 text-slate-400">{s.class} - {s.section}</td>
                      <td className="py-4.5 px-6 text-slate-450 font-mono">{s.parent?.mobile || '-'}</td>
                      <td className="py-4.5 px-6 text-slate-200 font-mono font-extrabold text-right">
                        ₹{dues.toLocaleString()}
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <button
                          onClick={() => openPaymentModal(s)}
                          disabled={dues === 0}
                          className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
                            dues === 0
                              ? 'bg-slate-800 text-slate-650 border border-slate-900'
                              : 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/25 hover:bg-indigo-600 hover:text-white'
                          }`}
                        >
                          {dues === 0 ? 'Settled' : 'Collect Fee'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Collect Fee Modal */}
      {paymentStudent && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCollectSubmit} className="w-full max-w-md glass-panel rounded-3xl p-8 border border-slate-850 space-y-6 relative">
            <button
              type="button"
              onClick={() => setPaymentStudent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-white text-base tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <CreditCard size={18} className="text-indigo-400" />
              Collect Fee (₹)
            </h3>

            <div className="space-y-2 border-b border-slate-850 pb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase">Student:</span>
                <span className="text-slate-200 font-bold">{paymentStudent.firstName} {paymentStudent.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase">Class / Section:</span>
                <span className="text-slate-200 font-semibold">{paymentStudent.class} - {paymentStudent.section}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase">Pending Amount:</span>
                <span className="text-rose-400 font-mono font-extrabold">₹{paymentStudent.pendingAmount.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className={labelClass}>Collect Amount (₹) *</label>
              <input
                type="number"
                required
                max={paymentStudent.pendingAmount}
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
                  className="w-full premium-input py-2.5 px-4 text-slate-355 focus:outline-none text-xs cursor-pointer"
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
                <label className={labelClass}>Ref / Txn ID</label>
                <input
                  type="text"
                  placeholder="Optional reference No"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={paymentData.referenceNo}
                  onChange={(e) => setPaymentData({ ...paymentData, referenceNo: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setPaymentStudent(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={paymentLoading || paymentStudent.pendingAmount <= 0}
                className="btn-glow px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow"
              >
                {paymentLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  'Record Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
