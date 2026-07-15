import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { Search, User, Edit, Eye, X, Contact, Phone, Mail, Award, CheckCircle, Download, FileSpreadsheet, Upload, Copy, FileText, Printer, ChevronDown } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Students() {
  const { academicSession } = useSelector((state) => state.auth);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Criteria search state
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [keyword, setKeyword] = useState('');

  // Bulk Import state
  const [importStatus, setImportStatus] = useState('');
  const [importLoading, setImportLoading] = useState(false);

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    admissionNo: true,
    rollNo: true,
    studentName: true,
    classSection: true,
    fatherName: true,
    parentMobile: true,
    actions: true
  });
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    penNo: '',
    class: '',
    section: '',
    parent: {
      fatherName: '',
      fatherOccupation: '',
      fatherAadhaar: '',
      motherName: '',
      motherOccupation: '',
      motherAadhaar: '',
      mobile: '',
      email: ''
    }
  });

  const [viewingStudent, setViewingStudent] = useState(null);
  const [siblings, setSiblings] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const classes = ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
  const sections = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    fetchStudents();
  }, [academicSession]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/students?currentSession=${academicSession}`);
      setStudents(response.data.students || []);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search by Class / Section Criteria
  const handleCriteriaSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedClass) queryParams.append('class', selectedClass);
      if (selectedSection) queryParams.append('section', selectedSection);
      queryParams.append('currentSession', academicSession);

      const response = await api.get(`/students?${queryParams.toString()}`);
      setStudents(response.data.students || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search by Keyword Criteria
  const handleKeywordSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const response = await api.get(`/students?currentSession=${academicSession}`);
      const list = response.data.students || [];
      const term = keyword.toLowerCase();

      const matched = list.filter((s) => {
        const fullName = s.firstName.toLowerCase();
        const admNo = s.admissionNo.toLowerCase();
        const fatherName = s.parent?.fatherName?.toLowerCase() || '';
        const mobile = s.parent?.mobile || '';
        return fullName.includes(term) || admNo.includes(term) || fatherName.includes(term) || mobile.includes(term);
      });
      setStudents(matched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSVTemplate = () => {
    const headers = "admissionNo,rollNo,penNo,studentName,dob,gender,class,section,currentSession,fatherName,fatherAadhaar,motherName,motherAadhaar,mobile,email\n";
    const sampleRow = "DVHS2026101,15,PEN9876543,Rahul Kumar,2015-05-12,Male,Class I,A,2026-27,Suresh Kumar,123456789012,Sunita Devi,9876543210,suresh@gmail.com\n";
    
    const blob = new Blob([headers + sampleRow], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "student_import_template.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredExportData = () => {
    let list = [...students];
    if (selectedClass) {
      list = list.filter((s) => s.class?.toLowerCase().trim() === selectedClass.toLowerCase().trim());
    }
    if (selectedSection) {
      list = list.filter((s) => s.section?.toLowerCase().trim() === selectedSection.toLowerCase().trim());
    }
    if (keyword) {
      const term = keyword.toLowerCase();
      list = list.filter((s) => {
        const fullName = s.firstName.toLowerCase();
        const admNo = s.admissionNo.toLowerCase();
        const fatherName = s.parent?.fatherName?.toLowerCase() || '';
        const mobile = s.parent?.mobile || '';
        return fullName.includes(term) || admNo.includes(term) || fatherName.includes(term) || mobile.includes(term);
      });
    }
    return list;
  };

  const copyToClipboard = () => {
    const listToExport = getFilteredExportData();
    if (listToExport.length === 0) {
      alert("No student data available to copy.");
      return;
    }
    const text = listToExport.map((s) => 
      `${s.admissionNo}\t${s.rollNo || '-'}\t${s.firstName}\t${s.class} - ${s.section}\t${s.parent?.fatherName || '-'}\t${s.parent?.mobile || '-'}`
    ).join('\n');
    navigator.clipboard.writeText(text);
    alert("Student roster copied to clipboard!");
  };

  const exportStudentsToCSV = (format = 'CSV') => {
    const listToExport = getFilteredExportData();
    if (listToExport.length === 0) {
      alert("No student data available to export.");
      return;
    }
    const headers = "admissionNo,rollNo,penNo,studentName,dob,gender,class,section,fatherName,fatherAadhaar,motherName,motherAadhaar,mobile,email\n";
    
    const rows = listToExport.map((s) => {
      return [
        s.admissionNo,
        s.rollNo || '',
        s.penNo || '',
        s.firstName,
        s.dob ? s.dob.split('T')[0] : '',
        s.gender,
        s.class,
        s.section,
        s.parent?.fatherName || '',
        s.parent?.fatherAadhaar || '',
        s.parent?.motherName || '',
        s.parent?.motherAadhaar || '',
        s.parent?.mobile || '',
        s.parent?.email || ''
      ].map(val => `"${val}"`).join(',');
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Students_Export_${academicSession}.${format === 'Excel' ? 'xls' : 'csv'}`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerPrint = () => {
    window.print();
  };

  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportLoading(true);
    setImportStatus('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n');
        if (lines.length < 2) {
          setImportStatus('CSV template contains no student details.');
          setImportLoading(false);
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
        
        const studentsList = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          const cells = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/^["']|["']$/g, ''));
          
          if (cells.length < headers.length) continue;
          
          const studentObj = {};
          headers.forEach((header, index) => {
            if (header === 'studentName') {
              studentObj['firstName'] = cells[index];
            } else {
              studentObj[header] = cells[index];
            }
          });
          studentsList.push(studentObj);
        }

        if (studentsList.length === 0) {
          setImportStatus('No valid data rows detected.');
          setImportLoading(false);
          return;
        }

        const response = await api.post('/students/bulk-import', { studentsList });
        setImportStatus(response.data.message);
        fetchStudents();
      } catch (err) {
        console.error(err);
        setImportStatus('Failed to import CSV list.');
      } finally {
        setImportLoading(false);
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const openProfileDetails = async (student) => {
    setDetailsLoading(true);
    setViewingStudent(student);
    try {
      const response = await api.get(`/students/${student._id}`);
      setViewingStudent(response.data.student);
      setSiblings(response.data.siblings || []);
    } catch (err) {
      console.error('Failed to load profile details:', err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setEditFormData({
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      rollNo: student.rollNo || '',
      penNo: student.penNo || '',
      class: student.class || 'Class I',
      section: student.section || 'A',
      parent: {
        fatherName: student.parent?.fatherName || '',
        fatherOccupation: student.parent?.fatherOccupation || '',
        fatherAadhaar: student.parent?.fatherAadhaar || '',
        motherName: student.parent?.motherName || '',
        motherOccupation: student.parent?.motherOccupation || '',
        motherAadhaar: student.parent?.motherAadhaar || '',
        mobile: student.parent?.mobile || '',
        email: student.parent?.email || ''
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParentEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      parent: { ...prev.parent, [name]: value }
    }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/students/${editingStudent._id}`, editFormData);
      fetchStudents();
      setEditingStudent(null);
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="space-y-8">
      {/* Dynamic Printing Style Tag */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .printable-table, .printable-table * {
            visibility: visible !important;
          }
          .printable-table {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            color: #000 !important;
            background: #fff !important;
          }
          .printable-table th {
            color: #000 !important;
            background: #f1f5f9 !important;
            border-bottom: 2px solid #000 !important;
          }
          .printable-table td {
            color: #000 !important;
            border-bottom: 1px solid #e2e8f0 !important;
          }
        }
      `}</style>

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">Student Directory</h1>
        <p className="text-slate-400 text-sm">View comprehensive student files, manage parent linkages, audit siblings, and run import/export routines.</p>
      </div>

      {importStatus && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm rounded-2xl p-4 text-center font-medium">
          {importStatus}
        </div>
      )}

      {/* Select Criteria Box */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-850 space-y-6">
        <h3 className="font-extrabold text-white text-xs tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
          <Search size={14} className="text-indigo-400" />
          Select Criteria
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
          
          {/* Left search path (Class & Section) */}
          <form onSubmit={handleCriteriaSearch} className="space-y-4 pr-0 lg:pr-8">
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-750 hover:bg-indigo-650 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
              >
                <Search size={14} /> Search
              </button>
            </div>
          </form>

          {/* Right search path (Keyword search) */}
          <form onSubmit={handleKeywordSearch} className="space-y-4 pt-4 lg:pt-0 pl-0 lg:pl-8 flex flex-col justify-between">
            <div>
              <label className={labelClass}>Search by Keyword</label>
              <input
                type="text"
                placeholder="Search by Admission no, Student Name, Phone, Father Name"
                className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-750 hover:bg-indigo-650 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
              >
                <Search size={14} /> Search
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Datatable Toolbar & Batch Import Actions */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-850 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Side: Datatable Action Buttons (Matching User Reference Image) */}
        <div className="flex flex-wrap items-center bg-[#070b19] border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
          <button
            onClick={copyToClipboard}
            className="p-3 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center border-r border-slate-800 cursor-pointer"
            title="Copy to Clipboard"
          >
            <Copy size={15} />
          </button>
          
          <button
            onClick={() => exportStudentsToCSV('Excel')}
            className="p-3 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center border-r border-slate-800 cursor-pointer"
            title="Export Excel"
          >
            <FileSpreadsheet size={15} />
          </button>
          
          <button
            onClick={() => exportStudentsToCSV('CSV')}
            className="p-3 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center border-r border-slate-800 cursor-pointer"
            title="Export CSV"
          >
            <FileText size={15} />
          </button>
          
          <button
            onClick={triggerPrint}
            className="p-3 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center border-r border-slate-800 cursor-pointer"
            title="Download PDF"
          >
            <FileText size={15} className="text-red-400" />
          </button>
          
          <button
            onClick={triggerPrint}
            className="p-3 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center border-r border-slate-800 cursor-pointer"
            title="Print Table"
          >
            <Printer size={15} />
          </button>

          {/* Column Visibility Trigger Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer text-[10px] font-bold uppercase tracking-wider"
            >
              Column visibility
              <ChevronDown size={12} />
            </button>

            {showColumnDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0b1329] border border-slate-800 rounded-xl shadow-2xl z-40 p-3 space-y-2 text-xs text-slate-200">
                <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 pb-1 border-b border-slate-800">Toggle Columns</p>
                {Object.keys(visibleColumns).map((col) => (
                  <label key={col} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={visibleColumns[col]}
                      onChange={() => toggleColumn(col)}
                      className="rounded accent-indigo-500 border-slate-800 bg-slate-900"
                    />
                    <span className="capitalize">{col.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: CSV Template & Import actions */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={downloadCSVTemplate}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Download size={14} /> CSV Template
          </button>

          <label className="px-4 py-2.5 bg-indigo-650/15 text-indigo-400 hover:bg-indigo-600/20 border border-indigo-600/20 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5">
            {importLoading ? <CircularProgress size={14} color="inherit" /> : <Upload size={14} />}
            <span>Import CSV</span>
            <input
              type="file"
              accept=".csv"
              disabled={importLoading}
              onChange={handleCSVImport}
              className="hidden"
            />
          </label>
        </div>

      </div>

      {/* Directory Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-850 printable-table">
        {loading ? (
          <div className="flex items-center justify-center p-16">
            <CircularProgress size={32} color="inherit" />
          </div>
        ) : students.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-sm font-medium">
            No student records found. Select criteria or use search.
          </div>
        ) : (
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-450 uppercase tracking-widest font-bold bg-slate-900/40 text-[10px]">
                {visibleColumns.admissionNo && <th className="py-4.5 px-6">Admission No</th>}
                {visibleColumns.rollNo && <th className="py-4.5 px-6">Roll No</th>}
                {visibleColumns.studentName && <th className="py-4.5 px-6">Student Name</th>}
                {visibleColumns.classSection && <th className="py-4.5 px-6">Class & Section</th>}
                {visibleColumns.fatherName && <th className="py-4.5 px-6">Father Name</th>}
                {visibleColumns.parentMobile && <th className="py-4.5 px-6">Parent Mobile</th>}
                {visibleColumns.actions && <th className="py-4.5 px-6 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/50">
              {getFilteredExportData().map((s) => (
                <tr key={s._id} className="hover:bg-slate-900/20 transition-all duration-200 group">
                  {visibleColumns.admissionNo && <td className="py-4.5 px-6 font-mono font-bold text-indigo-400">{s.admissionNo}</td>}
                  {visibleColumns.rollNo && <td className="py-4.5 px-6 text-slate-455 font-mono">{s.rollNo || '-'}</td>}
                  {visibleColumns.studentName && (
                    <td className="py-4.5 px-6 font-bold text-slate-200 flex items-center gap-2">
                      <User size={14} className="text-slate-500" />
                      {s.firstName}
                    </td>
                  )}
                  {visibleColumns.classSection && <td className="py-4.5 px-6 text-slate-400">{s.class} - {s.section}</td>}
                  {visibleColumns.fatherName && <td className="py-4.5 px-6 text-slate-400">{s.parent?.fatherName || '-'}</td>}
                  {visibleColumns.parentMobile && <td className="py-4.5 px-6 text-slate-450 font-mono">{s.parent?.mobile || '-'}</td>}
                  {visibleColumns.actions && (
                    <td className="py-4.5 px-6 text-right space-x-2">
                      <button
                        onClick={() => openProfileDetails(s)}
                        className="bg-indigo-600/10 text-indigo-400 border border-indigo-600/25 hover:bg-indigo-600 hover:text-white p-2 rounded-xl cursor-pointer transition-all"
                        title="View Profile Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => openEditModal(s)}
                        className="bg-cyan-600/10 text-cyan-400 border border-cyan-600/25 hover:bg-cyan-600 hover:text-white p-2 rounded-xl cursor-pointer transition-all"
                        title="Edit Profile"
                      >
                        <Edit size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Profile Details Drawer */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-end">
          <div className="w-full max-w-2xl h-full bg-slate-900 border-l border-slate-850 p-6 md:p-8 overflow-y-auto space-y-8 relative shadow-2xl">
            <button
              onClick={() => setViewingStudent(null)}
              className="absolute top-6 right-6 text-slate-455 hover:text-white cursor-pointer"
            >
              <X size={22} />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-450 border border-slate-700">
                <User size={32} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white leading-tight">{viewingStudent.firstName}</h3>
                <span className="badge-indigo mt-1 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                  {viewingStudent.class} - {viewingStudent.section}
                </span>
              </div>
            </div>

            {detailsLoading ? (
              <div className="flex items-center justify-center py-12">
                <CircularProgress size={24} color="inherit" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Academic Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4.5 bg-slate-900/40 border border-slate-850 rounded-2xl">
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Full Name</span>
                    <p className="text-xs font-bold text-slate-200">{viewingStudent.firstName}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Adm No</span>
                    <p className="text-xs font-bold text-indigo-400 font-mono">{viewingStudent.admissionNo}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Class / Section</span>
                    <p className="text-xs font-bold text-slate-200">{viewingStudent.class} - {viewingStudent.section}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Roll No</span>
                    <p className="text-xs font-bold text-slate-200">{viewingStudent.rollNo || '-'}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">PEN Number</span>
                    <p className="text-xs font-bold text-slate-200 font-mono">{viewingStudent.penNo || '-'}</p>
                  </div>
                </div>

                {/* Parent Details Card */}
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Contact size={14} className="text-indigo-400" />
                    Parent Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/20 border border-slate-850 rounded-2xl space-y-2">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">Father details</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Name:</span>
                        <span className="font-bold text-slate-200">{viewingStudent.parent?.fatherName || '-'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Aadhaar:</span>
                        <span className="font-bold text-slate-200 font-mono">{viewingStudent.parent?.fatherAadhaar || '-'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Occupation:</span>
                        <span className="font-bold text-slate-200">{viewingStudent.parent?.fatherOccupation || '-'}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/20 border border-slate-850 rounded-2xl space-y-2">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-800 pb-1">Mother details</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Name:</span>
                        <span className="font-bold text-slate-200">{viewingStudent.parent?.motherName || '-'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Aadhaar:</span>
                        <span className="font-bold text-slate-200 font-mono">{viewingStudent.parent?.motherAadhaar || '-'}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Occupation:</span>
                        <span className="font-bold text-slate-200">{viewingStudent.parent?.motherOccupation || '-'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-slate-900/20 border border-slate-850 rounded-xl">
                      <Phone size={14} className="text-indigo-400" />
                      <div className="text-xs">
                        <span className="block text-[8px] text-slate-500 font-bold uppercase">Mobile Contact</span>
                        <span className="font-bold text-slate-200 font-mono">{viewingStudent.parent?.mobile}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-slate-900/20 border border-slate-850 rounded-xl">
                      <Mail size={14} className="text-indigo-400" />
                      <div className="text-xs">
                        <span className="block text-[8px] text-slate-500 font-bold uppercase">Email Address</span>
                        <span className="font-bold text-slate-200 truncate max-w-[150px] block">{viewingStudent.parent?.email || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sibling Audits */}
                <div className="space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Award size={14} className="text-indigo-400" />
                    Detected Siblings ({siblings.length})
                  </h4>

                  {siblings.length === 0 ? (
                    <p className="text-xs text-slate-500 italic bg-slate-900/25 p-4 rounded-2xl border border-slate-850">
                      No sibling links detected sharing the same parent Aadhaar registry details.
                    </p>
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-850">
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-450 uppercase font-bold tracking-wider">
                            <th className="py-2.5 px-4">Name</th>
                            <th className="py-2.5 px-4">Adm No.</th>
                            <th className="py-2.5 px-4">Class/Sec</th>
                            <th className="py-2.5 px-4">Session</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/50">
                          {siblings.map((sib) => (
                            <tr key={sib._id} className="hover:bg-slate-900/20">
                              <td className="py-2.5 px-4 font-bold text-slate-200">{sib.firstName}</td>
                              <td className="py-2.5 px-4 font-mono text-indigo-400">{sib.admissionNo}</td>
                              <td className="py-2.5 px-4 font-semibold text-slate-355">{sib.class} - {sib.section}</td>
                              <td className="py-2.5 px-4 font-mono text-slate-450">{sib.currentSession}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={saveEdit} className="w-full max-w-xl glass-panel rounded-3xl p-8 border border-slate-850 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingStudent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-extrabold text-white text-base tracking-widest uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <User size={18} className="text-indigo-400" />
              Edit Student Details ({editFormData.firstName})
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name</label>
                <input
                  type="text"
                  required
                  name="firstName"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.firstName}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input
                  type="text"
                  required
                  name="lastName"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.lastName}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Roll Number</label>
                <input
                  type="text"
                  name="rollNo"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                  value={editFormData.rollNo}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>PEN Number</label>
                <input
                  type="text"
                  name="penNo"
                  className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs font-mono"
                  value={editFormData.penNo || ''}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <label className={labelClass}>Class</label>
                <select
                  name="class"
                  className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                  value={editFormData.class}
                  onChange={handleEditChange}
                >
                  {classes.map((c) => (
                    <option key={c} value={c} className="bg-slate-900">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Section</label>
                <select
                  name="section"
                  className="w-full premium-input py-2.5 px-4 text-slate-300 focus:outline-none text-xs cursor-pointer"
                  value={editFormData.section}
                  onChange={handleEditChange}
                >
                  {sections.map((s) => (
                    <option key={s} value={s} className="bg-slate-900">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-800/80 pt-4">
              <h4 className="font-bold text-xs uppercase text-slate-400">Parent Contacts & Aadhaar Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Father Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                    value={editFormData.parent.fatherName}
                    onChange={handleParentEditChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Father Aadhaar</label>
                  <input
                    type="text"
                    name="fatherAadhaar"
                    className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs font-mono"
                    value={editFormData.parent.fatherAadhaar}
                    onChange={handleParentEditChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Mother Name</label>
                  <input
                    type="text"
                    name="motherName"
                    className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                    value={editFormData.parent.motherName}
                    onChange={handleParentEditChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Mother Aadhaar</label>
                  <input
                    type="text"
                    name="motherAadhaar"
                    className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs font-mono"
                    value={editFormData.parent.motherAadhaar}
                    onChange={handleParentEditChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Parent Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs font-mono"
                    value={editFormData.parent.mobile}
                    onChange={handleParentEditChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Parent Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full premium-input py-2.5 px-4 text-slate-200 focus:outline-none text-xs"
                    value={editFormData.parent.email}
                    onChange={handleParentEditChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-glow px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
