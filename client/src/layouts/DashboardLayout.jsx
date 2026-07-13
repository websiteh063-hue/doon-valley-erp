import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setAcademicSession } from '../redux/authSlice';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  CreditCard,
  Calendar,
  CheckCircle,
  Bell,
  UserCircle,
  Building,
  TrendingUp,
  TrendingDown,
  Laptop,
  Video,
  Award,
  AlertTriangle,
  Download,
  BookOpen,
  Edit3,
  MessageSquare,
  Contact,
  Package,
  Book,
  Bus,
  Home,
  FileBadge,
  Mail,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const { user, academicSession } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMenu = (name) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const getMenuItems = () => {
    const common = [{ name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> }];
    
    if (user?.role === 'Super Admin' || user?.role === 'Principal') {
      return [
        ...common,
        {
          name: 'Front Office',
          icon: <Building size={18} />,
          children: [
            { name: 'Visitor Book', path: '/front-office' },
            { name: 'Phone Call Log', path: '/front-office' },
            { name: 'Admission Enquiry', path: '/front-office' }
          ]
        },
        {
          name: 'Student Info',
          icon: <Users size={18} />,
          children: [
            { name: 'Student Details', path: '/students' },
            { name: 'Student Admission', path: '/admissions' },
            { name: 'Online Admission', path: '/admissions' },
            { name: 'Disabled Students', path: '/students' },
            { name: 'Multi Class Student', path: '/students' },
            { name: 'Bulk Delete', path: '/students' }
          ]
        },
        {
          name: 'Human Resource',
          icon: <Contact size={18} />,
          children: [
            { name: 'Staff Directory', path: '/teachers' },
            { name: 'Staff Attendance', path: '/teachers' },
            { name: 'Payroll List', path: '/teachers' },
            { name: 'Apply Leave', path: '/teachers' }
          ]
        },
        {
          name: 'Academics',
          icon: <GraduationCap size={18} />,
          children: [
            { name: 'Class Timetable', path: '/academics' },
            { name: 'Assign Class Teacher', path: '/academics' },
            { name: 'Promote Students', path: '/academics' },
            { name: 'Subjects', path: '/academics' },
            { name: 'Classes', path: '/academics' },
            { name: 'Sections', path: '/academics' }
          ]
        },
        {
          name: 'Fees Collection',
          icon: <CreditCard size={18} />,
          children: [
            { name: 'Collect Fee', path: '/collect-fees' },
            { name: 'Payment Receipt', path: '/fee-status' },
            { name: 'Online Admission Fee', path: '/collect-fees' },
            { name: 'Demand Notice', path: '/collect-fees' },
            { name: 'Fees Carry Forward', path: '/collect-fees' },
            { name: 'Fee Discount', path: '/collect-fees' },
            { name: 'Fee Master', path: '/fees-config' },
            { name: 'Fees Group', path: '/fees-config' },
            { name: 'Fees Types', path: '/fees-config' },
            { name: 'Fee Follow Up', path: '/collect-fees' },
            { name: 'Fees Reports', path: '/fees-tracker' }
          ]
        },
        {
          name: 'Income',
          icon: <TrendingUp size={18} />,
          children: [
            { name: 'Add Income', path: '/income' },
            { name: 'Search Income', path: '/income' },
            { name: 'Income Head', path: '/income' }
          ]
        },
        {
          name: 'Expense',
          icon: <TrendingDown size={18} />,
          children: [
            { name: 'Add Expense', path: '/expense' },
            { name: 'Search Expense', path: '/expense' },
            { name: 'Expense Head', path: '/expense' }
          ]
        },
        {
          name: 'Attendance',
          icon: <CheckCircle size={18} />,
          children: [
            { name: 'Student Attendance', path: '/attendance' },
            { name: 'Attendance By Date', path: '/attendance' },
            { name: 'Approve Leave', path: '/attendance' }
          ]
        },
        {
          name: 'H.W. / C.W.',
          icon: <Edit3 size={18} />,
          children: [
            { name: 'Homework Board', path: '/homework' },
            { name: 'Homework Submissions', path: '/homework' }
          ]
        },
        {
          name: 'Examinations',
          icon: <Calendar size={18} />,
          children: [
            { name: 'Exam Group', path: '/exams' },
            { name: 'Exam Schedule', path: '/exams-config' },
            { name: 'Exam Results', path: '/exams' },
            { name: 'Design Marksheet', path: '/exams-config' },
            { name: 'Design Admit Card', path: '/exams-config' }
          ]
        },
        {
          name: 'Online Exam',
          icon: <Laptop size={18} />,
          children: [
            { name: 'Online Exam List', path: '/online-exams' },
            { name: 'Question Bank', path: '/online-exams' }
          ]
        },
        {
          name: 'Question Paper',
          icon: <FileText size={18} />,
          children: [
            { name: 'Question Paper List', path: '/question-papers' },
            { name: 'Print Blueprint', path: '/question-papers' }
          ]
        },
        {
          name: 'Primary Evaluation',
          icon: <Award size={18} />,
          children: [
            { name: 'Assessment Criteria', path: '/primary-evaluation' },
            { name: 'Rubrics Setup', path: '/primary-evaluation' }
          ]
        },
        {
          name: 'Online Class',
          icon: <Video size={18} />,
          children: [
            { name: 'Live Class List', path: '/online-classes' },
            { name: 'Live Meeting Log', path: '/online-classes' }
          ]
        },
        {
          name: 'Communicate',
          icon: <MessageSquare size={18} />,
          children: [
            { name: 'Send SMS / Email', path: '/notifications' },
            { name: 'Notice Board', path: '/notifications' },
            { name: 'Email / SMS Log', path: '/notifications' }
          ]
        },
        {
          name: 'Digital Notice Board',
          icon: <Bell size={18} />,
          children: [
            { name: 'Active Notices', path: '/notifications' },
            { name: 'Post Bulletin', path: '/notifications' }
          ]
        },
        {
          name: 'Consent Letter',
          icon: <Mail size={18} />,
          children: [
            { name: 'Dispatch Consent', path: '/consent-letters' },
            { name: 'Consent Status', path: '/consent-letters' }
          ]
        },
        {
          name: 'Library',
          icon: <Book size={18} />,
          children: [
            { name: 'Book List', path: '/library' },
            { name: 'Issue Return', path: '/library' },
            { name: 'Student Members', path: '/library' }
          ]
        },
        {
          name: 'Inventory',
          icon: <Package size={18} />,
          children: [
            { name: 'Issue Item', path: '/inventory' },
            { name: 'Item Stock', path: '/inventory' },
            { name: 'Item Category', path: '/inventory' }
          ]
        },
        {
          name: 'Transport',
          icon: <Bus size={18} />,
          children: [
            { name: 'Route List', path: '/transport' },
            { name: 'Bus Allocations', path: '/transport' }
          ]
        },
        {
          name: 'Hostel',
          icon: <Home size={18} />,
          children: [
            { name: 'Room List', path: '/hostel' },
            { name: 'Room Type', path: '/hostel' },
            { name: 'Hostel List', path: '/hostel' }
          ]
        },
        {
          name: 'Disciplinary',
          icon: <AlertTriangle size={18} />,
          children: [
            { name: 'Incidents Log', path: '/disciplinary' },
            { name: 'Demerits Tracker', path: '/disciplinary' }
          ]
        },
        {
          name: 'Download Center',
          icon: <Download size={18} />,
          children: [
            { name: 'Upload Content', path: '/download-center' },
            { name: 'Assignment Download', path: '/download-center' },
            { name: 'Study Material', path: '/download-center' },
            { name: 'Syllabus', path: '/download-center' },
            { name: 'Other Downloads', path: '/download-center' }
          ]
        },
        {
          name: 'Certificate',
          icon: <FileBadge size={18} />,
          children: [
            { name: 'Student Certificate', path: '/certificates' },
            { name: 'Generate Certificate', path: '/certificates' }
          ]
        }
      ];
    }
    if (user?.role === 'Office Admin') {
      return [
        ...common,
        {
          name: 'Front Office',
          icon: <Building size={18} />,
          children: [
            { name: 'Visitor Book', path: '/front-office' },
            { name: 'Phone Call Log', path: '/front-office' }
          ]
        },
        {
          name: 'Student Directory',
          icon: <Users size={18} />,
          children: [
            { name: 'Student Details', path: '/students' }
          ]
        },
        {
          name: 'Collect Fees',
          icon: <CreditCard size={18} />,
          children: [
            { name: 'Collect Fee', path: '/collect-fees' }
          ]
        },
        {
          name: 'Download Center',
          icon: <Download size={18} />,
          children: [
            { name: 'Assignment Download', path: '/download-center' }
          ]
        }
      ];
    }
    if (user?.role === 'Teacher' || user?.role === 'Class Teacher') {
      return [
        ...common,
        {
          name: 'Attendance',
          icon: <CheckCircle size={18} />,
          children: [
            { name: 'Student Attendance', path: '/attendance' }
          ]
        },
        {
          name: 'H.W. / C.W.',
          icon: <Edit3 size={18} />,
          children: [
            { name: 'Homework Board', path: '/homework' }
          ]
        },
        {
          name: 'Enter Marks',
          icon: <Calendar size={18} />,
          children: [
            { name: 'Class Marks Sheet', path: '/marks-entry' }
          ]
        },
        {
          name: 'Digital Notice Board',
          icon: <Bell size={18} />,
          children: [
            { name: 'Active Notices', path: '/notifications' }
          ]
        }
      ];
    }
    if (user?.role === 'Student' || user?.role === 'Parent') {
      return [
        ...common,
        {
          name: 'My Attendance',
          icon: <CheckCircle size={18} />,
          children: [
            { name: 'Attendance Journal', path: '/my-attendance' }
          ]
        },
        {
          name: 'My H.W. / C.W.',
          icon: <Edit3 size={18} />,
          children: [
            { name: 'Coursework & Tasks', path: '/my-homework' }
          ]
        },
        {
          name: 'My Results',
          icon: <Calendar size={18} />,
          children: [
            { name: 'Academic Report Card', path: '/my-results' }
          ]
        },
        {
          name: 'Fee Status',
          icon: <CreditCard size={18} />,
          children: [
            { name: 'Billing & Accounts', path: '/fee-status' }
          ]
        },
        {
          name: 'Notice Board',
          icon: <Bell size={18} />,
          children: [
            { name: 'Active Notices', path: '/notifications' }
          ]
        }
      ];
    }
    return common;
  };

  const menuItems = getMenuItems();

  const renderNavItems = (items) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = !!expandedMenus[item.name];

      if (hasChildren) {
        return (
          <div key={item.name} className="space-y-0.5">
            <button
              onClick={() => toggleMenu(item.name)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[10.5px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-500">{item.icon}</span>
                <span>{item.name}</span>
              </div>
              <span className="text-slate-500">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            </button>
            
            {isExpanded && (
              <div className="pl-4 border-l border-slate-800/60 ml-5 py-1 space-y-1">
                {item.children.map((child) => {
                  const isActive = location.pathname === child.path;
                  return (
                    <button
                      key={child.name}
                      onClick={() => {
                        navigate(child.path);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-[9.5px] font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'text-white bg-indigo-600/25 border-l-2 border-indigo-500 pl-2'
                          : 'text-slate-450 hover:text-slate-200 hover:bg-slate-850/20'
                      }`}
                    >
                      <span className="text-slate-600 font-mono">»</span>
                      {child.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      const isActive = location.pathname === item.path;
      return (
        <button
          key={item.name}
          onClick={() => {
            navigate(item.path);
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10.5px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            isActive
              ? 'sidebar-link-active text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>
            {item.icon}
          </span>
          {item.name}
        </button>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900/60 backdrop-blur-md border-r border-slate-800/40 p-5 shrink-0 z-20 h-screen">
        <div className="flex items-center gap-3 mb-6 px-2 shrink-0">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-2xl shadow-md shadow-indigo-500/10">
            <span className="text-xl font-black text-white tracking-wider">DV</span>
          </div>
          <div>
            <h2 className="font-extrabold text-sm tracking-tight text-white leading-tight">Doon Valley</h2>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">High School ERP</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-1.5 scrollbar-thin">
          {renderNavItems(menuItems)}
        </nav>

        <div className="border-t border-slate-800/40 pt-4 mt-auto shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase text-rose-400 hover:bg-rose-500/10 transition-all duration-300 cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Drawer for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 md:hidden transition-all">
          <aside className="w-64 bg-slate-900 h-full p-5 flex flex-col border-r border-slate-800/50">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-xl">
                  <span className="text-lg font-black text-white">DV</span>
                </div>
                <h2 className="font-extrabold text-sm text-white">Doon Valley</h2>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
              {renderNavItems(menuItems)}
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase text-rose-400 hover:bg-rose-500/10 transition-colors w-full mt-auto cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 border-b border-slate-900/60 bg-slate-950/40 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-400 hover:text-white cursor-pointer">
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-850">
              {user?.role} Portal
            </span>
            <div className="flex items-center gap-1.5 bg-slate-900/40 border border-slate-850 rounded-full px-3.5 py-1">
              <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider">Session:</span>
              <select
                value={academicSession}
                onChange={(e) => dispatch(setAcademicSession(e.target.value))}
                className="bg-transparent text-[10px] font-bold text-indigo-400 focus:outline-none cursor-pointer uppercase tracking-wider border-none p-0 select-none"
              >
                <option value="2026-2027" className="bg-slate-900 text-slate-200">2026-2027</option>
                <option value="2027-2028" className="bg-slate-900 text-slate-200">2027-2028</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/30 border border-slate-850 hover:bg-slate-900 transition-colors relative cursor-pointer">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>

            <div className="h-6 w-px bg-slate-800/40"></div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-200 leading-none">
                  {user?.username}
                </p>
                <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">
                  {user?.role}
                </span>
              </div>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold border border-slate-800 shadow">
                <UserCircle size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-mesh bg-fixed">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
