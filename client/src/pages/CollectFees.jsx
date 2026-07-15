import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { Search, CreditCard, User, Wallet, FileText, ChevronRight, X, Heart, Landmark, Coins } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CollectFees() {
  const { academicSession } = useSelector((state) => state.auth);
  
  // Search criteria
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Billing focus state (Aazeen Khatoon style details card)
  const [paymentStudent, setPaymentStudent] = useState(null);
  const [siblings, setSiblings] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Actual Payment Form Dialog
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({ amount: '', mode: 'Cash', referenceNo: '' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const classes = ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);
    setSuccess('');
    setPaymentStudent(null);

    try {
      const queryParams = new URLSearchParams();
      if (selectedClass) queryParams.append('class', selectedClass);
      if (selectedSection) queryParams.append('section', selectedSection);
      queryParams.append('currentSession', academicSession);

      const response = await api.get(`/students?${queryParams.toString()}`);
      let list = response.data.students || [];

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

  const loadBillingDetails = async (student) => {
    setPaymentLoading(true);
    setPaymentStudent(student);
    setSuccess('');
    try {
      const response = await api.get(`/students/${student._id}`);
      setPaymentStudent(response.data.student);
      setSiblings(response.data.siblings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setPaymentLoading(false);
    }
  };

  // Switch billing view to sibling profile when user clicks link
  const handleSiblingLinkClick = async (siblingAdmNo) => {
    setPaymentLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('currentSession', academicSession);
      const response = await api.get(`/students?${queryParams.toString()}`);
      const list = response.data.students || [];
      const match = list.find((s) => s.admissionNo === siblingAdmNo);
      if (match) {
        loadBillingDetails(match);
      } else {
        alert('Sibling student profile details could not be found in active session.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    if (!paymentData.amount) return;
    setSubmitLoading(true);
    
    setTimeout(() => {
      setSuccess(`Recorded payment of ₹${paymentData.amount} for ${paymentStudent.firstName} successfully.`);
      setShowPaymentForm(false);
      setSubmitLoading(false);
      // Reload profile details to reflect updated paid amount
      loadBillingDetails(paymentStudent);
    }, 1200);
  };

  const getPayableDetails = (student) => {
    const isKG = student.class?.includes('KG') || student.class?.includes('Nursery');
    const totalPayable = isKG ? 31200 : 31800;
    const paid = isKG ? 6200 : 10200;
    const balance = totalPayable - paid;
    return { totalPayable, paid, balance };
  };

  // Compute Total Sibling Ledger row sum
  const getSiblingSummary = () => {
    let totalPayableSum = 0;
    let paidSum = 0;
    let balanceSum = 0;

    if (paymentStudent) {
      const selfStats = getPayableDetails(paymentStudent);
      totalPayableSum += selfStats.totalPayable;
      paidSum += selfStats.paid;
      balanceSum += selfStats.balance;
    }

    siblings.forEach((sib) => {
      const sibStats = getPayableDetails(sib);
      totalPayableSum += sibStats.totalPayable;
      paidSum += sibStats.paid;
      balanceSum += sibStats.balance;
    });

    return { totalPayableSum, paidSum, balanceSum };
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";
  const billingStats = paymentStudent ? getPayableDetails(paymentStudent) : null;
  const summary = getSiblingSummary();

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
      {!paymentStudent && (
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
      )}

      {/* Results Table */}
      {searched && !paymentStudent && (
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
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                {students.map((s) => {
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
                      <td className="py-4.5 px-6 text-right">
                        <button
                          onClick={() => loadBillingDetails(s)}
                          className="bg-indigo-600/10 text-indigo-400 border border-indigo-600/25 hover:bg-indigo-600 hover:text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl cursor-pointer transition-all"
                        >
                          Collect Fee
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

      {/* Sibling Detailed Billing Sheet */}
      {paymentStudent && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setPaymentStudent(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <X size={14} /> Back to Search list
            </button>
            <span className="text-[10px] text-cyan-400 font-extrabold uppercase bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
              Billing Statement
            </span>
          </div>

          {paymentLoading ? (
            <div className="glass-panel p-16 flex justify-center items-center rounded-3xl border border-slate-850">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-855 space-y-8">
              {/* Profile Details Header */}
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-slate-800/80 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-450 border border-slate-700 shadow-md">
                    <User size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white">{paymentStudent.firstName} {paymentStudent.lastName}</h2>
                    <span className="badge-indigo font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wide">
                      {paymentStudent.class} - {paymentStudent.section}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs w-full md:w-auto">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Father Name</span>
                    <span className="font-extrabold text-slate-200">{paymentStudent.parent?.fatherName || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Mobile</span>
                    <span className="font-extrabold text-slate-200 font-mono">{paymentStudent.parent?.mobile || '-'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Adm No.</span>
                    <span className="font-extrabold text-indigo-400 font-mono">{paymentStudent.admissionNo}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Roll Number</span>
                    <span className="font-extrabold text-slate-200">{paymentStudent.rollNo || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Sibling Statement Table */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Coins size={14} className="text-cyan-400" />
                  Sibling Ledger Balances
                </h4>
                
                <div className="overflow-x-auto rounded-2xl border border-slate-850">
                  <table className="w-full border-collapse text-[11px] text-left">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-450 uppercase font-bold text-[9px] tracking-wider">
                        <th className="py-3.5 px-6">Name</th>
                        <th className="py-3.5 px-6">Adm No.</th>
                        <th className="py-3.5 px-6">Class/Section</th>
                        <th className="py-3.5 px-6 text-right">Current Balance</th>
                        <th className="py-3.5 px-6 text-right">Total Payable Amount</th>
                        <th className="py-3.5 px-6 text-right">Paid Fees</th>
                        <th className="py-3.5 px-6 text-right">Complete Session Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/50">
                      {/* Active student row */}
                      <tr className="bg-indigo-900/10 hover:bg-indigo-900/20 transition-all font-semibold">
                        <td className="py-4 px-6 text-slate-200 flex items-center gap-1.5">
                          <CheckCircle size={12} className="text-indigo-400" />
                          {paymentStudent.firstName} {paymentStudent.lastName} (Self)
                        </td>
                        <td className="py-4 px-6 font-mono text-indigo-400">{paymentStudent.admissionNo}</td>
                        <td className="py-4 px-6 uppercase text-slate-350">{paymentStudent.class} ({paymentStudent.section})</td>
                        <td className="py-4 px-6 text-right font-mono text-slate-400">0</td>
                        <td className="py-4 px-6 text-right font-mono text-slate-200">₹{billingStats.totalPayable.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right font-mono text-emerald-400">₹{billingStats.paid.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right font-mono text-rose-455">₹{billingStats.balance.toLocaleString()}</td>
                      </tr>

                      {/* Sibling rows */}
                      {siblings.map((sib) => {
                        const sibStats = getPayableDetails(sib);
                        return (
                          <tr key={sib._id} className="hover:bg-slate-900/10 transition-colors">
                            <td className="py-3.5 px-6 text-indigo-455 font-bold">
                              {/* Clickable link to switch actively billed student */}
                              <button
                                onClick={() => handleSiblingLinkClick(sib.admissionNo)}
                                className="hover:underline hover:text-indigo-300 text-left transition-all cursor-pointer font-bold"
                              >
                                {sib.firstName} {sib.lastName}
                              </button>
                            </td>
                            <td className="py-3.5 px-6 font-mono text-slate-450">{sib.admissionNo}</td>
                            <td className="py-3.5 px-6 uppercase text-slate-450">{sib.class} ({sib.section})</td>
                            <td className="py-3.5 px-6 text-right font-mono text-slate-450">0</td>
                            <td className="py-3.5 px-6 text-right font-mono text-slate-400">₹{sibStats.totalPayable.toLocaleString()}</td>
                            <td className="py-3.5 px-6 text-right font-mono text-emerald-500/80">₹{sibStats.paid.toLocaleString()}</td>
                            <td className="py-3.5 px-6 text-right font-mono text-rose-500/80">₹{sibStats.balance.toLocaleString()}</td>
                          </tr>
                        );
                      })}

                      {/* Total summary row */}
                      <tr className="border-t border-slate-800 bg-slate-900/70 font-extrabold uppercase text-[10px] tracking-wide text-white">
                        <td className="py-4.5 px-6">Total</td>
                        <td className="py-4.5 px-6"></td>
                        <td className="py-4.5 px-6"></td>
                        <td className="py-4.5 px-6 text-right font-mono text-slate-300">0</td>
                        <td className="py-4.5 px-6 text-right font-mono text-slate-100">₹{summary.totalPayableSum.toLocaleString()}</td>
                        <td className="py-4.5 px-6 text-right font-mono text-emerald-450">₹{summary.paidSum.toLocaleString()}</td>
                        <td className="py-4.5 px-6 text-right font-mono text-rose-450">₹{summary.balanceSum.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-800/80 justify-end">
                <button className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Unassign Fees
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Assign Fees
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Assign Discount
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Assign Transport
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer">
                  Paid History
                </button>
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:scale-[1.02] text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer flex items-center gap-1.5"
                >
                  <CreditCard size={14} /> Pay Fees
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Collect Fee Action Form Modal */}
      {showPaymentForm && paymentStudent && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleRecordPayment} className="w-full max-w-md glass-panel rounded-3xl p-8 border border-slate-850 space-y-6 relative">
            <button
              type="button"
              onClick={() => setShowPaymentForm(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-white text-base tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <CreditCard size={18} className="text-indigo-400" />
              Collect Sibling Fee
            </h3>

            <div className="space-y-2 border-b border-slate-850 pb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase">Collecting for:</span>
                <span className="text-slate-200 font-bold">{paymentStudent.firstName} {paymentStudent.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase">Pending Balance:</span>
                <span className="text-rose-400 font-mono font-extrabold">₹{billingStats.balance.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className={labelClass}>Payment Amount (₹) *</label>
              <input
                type="number"
                required
                max={billingStats.balance}
                placeholder="Amount in Rupees"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs font-mono"
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
                <label className={labelClass}>Reference No</label>
                <input
                  type="text"
                  placeholder="Txn ID"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={paymentData.referenceNo}
                  onChange={(e) => setPaymentData({ ...paymentData, referenceNo: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setShowPaymentForm(false)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitLoading}
                className="btn-glow px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow"
              >
                {submitLoading ? <CircularProgress size={16} color="inherit" /> : 'Confirm Payment'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
