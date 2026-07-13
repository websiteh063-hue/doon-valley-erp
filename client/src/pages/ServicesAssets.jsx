import React from 'react';
import { useLocation } from 'react-router-dom';
import { Download, Package, Book, Bus, Home, FileBadge, Mail } from 'lucide-react';

export default function ServicesAssets() {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    if (path.includes('download-center')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">School Download Center</h2>
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-slate-200 text-sm">Academic Calendar 2026-27</h4>
              <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 cursor-pointer">
                <Download size={14} /> Download
              </button>
            </div>
            <div className="flex justify-between items-center border-t border-slate-850/40 pt-4">
              <h4 className="font-extrabold text-slate-200 text-sm">School Leave Application Form</h4>
              <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 cursor-pointer">
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (path.includes('inventory')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Inventory Stock & Items</h2>
          <div className="glass-panel rounded-3xl overflow-hidden border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">Item Code</th>
                  <th className="py-4.5 px-6">Description</th>
                  <th className="py-4.5 px-6">Category</th>
                  <th className="py-4.5 px-6 text-right">Available Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                <tr className="hover:bg-slate-900/20">
                  <td className="py-4 px-6 font-mono font-bold text-indigo-400">DV-INV-2900</td>
                  <td className="py-4 px-6 text-slate-200 font-bold">Scientific Calculators (Casio)</td>
                  <td className="py-4 px-6 text-slate-400 font-semibold">Laboratory</td>
                  <td className="py-4 px-6 text-slate-350 font-bold text-right">45 Units</td>
                </tr>
                <tr className="hover:bg-slate-900/20">
                  <td className="py-4 px-6 font-mono font-bold text-indigo-400">DV-INV-4512</td>
                  <td className="py-4 px-6 text-slate-200 font-bold">Classroom Whiteboards (Magnetic)</td>
                  <td className="py-4 px-6 text-slate-400 font-semibold">Furniture</td>
                  <td className="py-4 px-6 text-slate-350 font-bold text-right">12 Units</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (path.includes('library')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Library Catalog & Books</h2>
          <div className="glass-panel rounded-3xl overflow-hidden border border-slate-850">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                  <th className="py-4.5 px-6">ISBN / Accession No</th>
                  <th className="py-4.5 px-6">Title</th>
                  <th className="py-4.5 px-6">Author</th>
                  <th className="py-4.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50">
                <tr className="hover:bg-slate-900/20">
                  <td className="py-4 px-6 font-mono font-bold text-indigo-400">978-0134093413</td>
                  <td className="py-4 px-6 text-slate-200 font-bold">Introduction to Algorithms</td>
                  <td className="py-4 px-6 text-slate-400 font-semibold">Thomas H. Cormen</td>
                  <td className="py-4 px-6 text-right">
                    <span className="badge-emerald font-bold px-2 py-0.5 rounded-xl text-[9px] uppercase">Available</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/20">
                  <td className="py-4 px-6 font-mono font-bold text-indigo-400">978-0321541819</td>
                  <td className="py-4 px-6 text-slate-200 font-bold">Physics for Scientists and Engineers</td>
                  <td className="py-4 px-6 text-slate-400 font-semibold">Randall D. Knight</td>
                  <td className="py-4 px-6 text-right">
                    <span className="badge-rose font-bold px-2 py-0.5 rounded-xl text-[9px] uppercase">Issued</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (path.includes('transport')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">School Transport Routes</h2>
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-4">
            <div>
              <h4 className="font-extrabold text-slate-200 text-sm">Route 1: Gomti Nagar Express</h4>
              <p className="text-xs text-slate-455">Vehicle: Bus UP-32-T-1234. Driver contact: 9988776655. Driver: Ram Prakash.</p>
              <span className="badge-cyan font-bold px-2 py-0.5 rounded-xl text-[9px] uppercase mt-2 inline-block">18 Students Allocated</span>
            </div>
          </div>
        </div>
      );
    }

    if (path.includes('hostel')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Hostel Rooms Allocation</h2>
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-4">
            <div>
              <h4 className="font-extrabold text-slate-200 text-sm">Tagore Dorm - Room 102</h4>
              <p className="text-xs text-slate-455">Double sharing rooms. Occupants: Class X student. Leave Status: Present.</p>
              <span className="badge-indigo font-bold px-2 py-0.5 rounded-xl text-[9px] uppercase mt-2 inline-block">Boy's Wing</span>
            </div>
          </div>
        </div>
      );
    }

    if (path.includes('certificates')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Certificates & Document Issuance</h2>
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-slate-200 text-sm">School Transfer Certificate (TC) Draft</h4>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow">
                Generate Document
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (path.includes('consent-letters')) {
      return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">Consent Letters & Field Trips</h2>
          <div className="glass-panel rounded-2xl p-5 border border-slate-850 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-extrabold text-slate-200 text-sm">Field Trip to Regional Science City</h4>
                <p className="text-xs text-slate-455">Scheduled on 2026-07-28. Online consent submission mandatory for Class X.</p>
              </div>
              <span className="badge-rose font-bold px-2 py-0.5 rounded-xl text-[9px] uppercase">Pending Parent Consent</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const getPageHeader = () => {
    if (path.includes('download-center')) return { title: 'Download Center', desc: 'Secure repository for administrative letters, printouts, and syllabus sheets.' };
    if (path.includes('inventory')) return { title: 'Inventory Stock Room', desc: 'Monitor active school inventory, lab glassware items, and classroom whiteboards.' };
    if (path.includes('library')) return { title: 'Library Book Directory', desc: 'Access active library catalog directories, borrow statuses, and ISBN lists.' };
    if (path.includes('transport')) return { title: 'School Bus & Transport', desc: 'Review GPS transit routes, passenger logs, and driver details.' };
    if (path.includes('hostel')) return { title: 'Hostel Rooms Registry', desc: 'Monitor dormitory room capacities, allocations, and room logs.' };
    if (path.includes('certificates')) return { title: 'Issuance Center', desc: 'Generate character testimonials, study certificates, and transfer certificates.' };
    if (path.includes('consent-letters')) return { title: 'Field Trips & Consent Letters', desc: 'Publish field trip letters and log parent confirmation receipts.' };
    return { title: 'Assets & Services Portal', desc: 'Manage school service assets.' };
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
