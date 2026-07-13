import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
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
  Mail
} from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getMenuItems = () => {
    const common = [{ name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> }];
    
    if (user?.role === 'Super Admin' || user?.role === 'Principal') {
      return [
        ...common,
        { name: 'Front Office', path: '/front-office', icon: <Building size={18} /> },
        { name: 'Student Info', path: '/students', icon: <Users size={18} /> },
        { name: 'Human Resource', path: '/teachers', icon: <Contact size={18} /> },
        { name: 'Academics', path: '/academics', icon: <GraduationCap size={18} /> },
        { name: 'Lesson Planner', path: '/lesson-planner', icon: <BookOpen size={18} /> },
        { name: 'Fees Collection', path: '/collect-fees', icon: <CreditCard size={18} /> },
        { name: 'Income', path: '/income', icon: <TrendingUp size={18} /> },
        { name: 'Expense', path: '/expense', icon: <TrendingDown size={18} /> },
        { name: 'Attendance', path: '/attendance', icon: <CheckCircle size={18} /> },
        { name: 'H.W. / C.W.', path: '/homework', icon: <Edit3 size={18} /> },
        { name: 'Examinations', path: '/exams', icon: <Calendar size={18} /> },
        { name: 'Online Exam', path: '/online-exams', icon: <Laptop size={18} /> },
        { name: 'Question Paper', path: '/question-papers', icon: <FileText size={18} /> },
        { name: 'Primary Evaluation', path: '/primary-evaluation', icon: <Award size={18} /> },
        { name: 'Online Class', path: '/online-classes', icon: <Video size={18} /> },
        { name: 'Communicate', path: '/communicate', icon: <MessageSquare size={18} /> },
        { name: 'Digital Notice Board', path: '/notifications', icon: <Bell size={18} /> },
        { name: 'Consent Letter', path: '/consent-letters', icon: <Mail size={18} /> },
        { name: 'Library', path: '/library', icon: <Book size={18} /> },
        { name: 'Inventory', path: '/inventory', icon: <Package size={18} /> },
        { name: 'Transport', path: '/transport', icon: <Bus size={18} /> },
        { name: 'Hostel', path: '/hostel', icon: <Home size={18} /> },
        { name: 'Disciplinary', path: '/disciplinary', icon: <AlertTriangle size={18} /> },
        { name: 'Download Center', path: '/download-center', icon: <Download size={18} /> },
        { name: 'Certificate', path: '/certificates', icon: <FileBadge size={18} /> }
      ];
    }
    if (user?.role === 'Office Admin') {
      return [
        ...common,
        { name: 'Front Office', path: '/front-office', icon: <Building size={18} /> },
        { name: 'Student Directory', path: '/students', icon: <Users size={18} /> },
        { name: 'Collect Fees', path: '/collect-fees', icon: <CreditCard size={18} /> },
        { name: 'Download Center', path: '/download-center', icon: <Download size={18} /> }
      ];
    }
    if (user?.role === 'Teacher' || user?.role === 'Class Teacher') {
      return [
        ...common,
        { name: 'Mark Attendance', path: '/attendance', icon: <CheckCircle size={18} /> },
        { name: 'H.W. / C.W.', path: '/homework', icon: <Edit3 size={18} /> },
        { name: 'Enter Marks', path: '/marks-entry', icon: <Calendar size={18} /> },
        { name: 'Digital Notice Board', path: '/notifications', icon: <Bell size={18} /> }
      ];
    }
    if (user?.role === 'Student' || user?.role === 'Parent') {
      return [
        ...common,
        { name: 'My Attendance', path: '/my-attendance', icon: <CheckCircle size={18} /> },
        { name: 'My H.W. / C.W.', path: '/my-homework', icon: <Edit3 size={18} /> },
        { name: 'My Results', path: '/my-results', icon: <Calendar size={18} /> },
        { name: 'Fee Status', path: '/fee-status', icon: <CreditCard size={18} /> },
        { name: 'Digital Notice Board', path: '/notifications', icon: <Bell size={18} /> }
      ];
    }
    return common;
  };

  const menuItems = getMenuItems();

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
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
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
          })}
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
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all ${
                      isActive
                        ? 'sidebar-link-active text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/55'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                );
              })}
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

          <div className="hidden md:block">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-850">
              {user?.role} Portal
            </span>
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
