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
  UserCircle
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
    
    if (user?.role === 'Super Admin') {
      return [
        ...common,
        { name: 'Admissions', path: '/admissions', icon: <GraduationCap size={18} /> },
        { name: 'User Management', path: '/users', icon: <Users size={18} /> },
        { name: 'Fees Config', path: '/fees-config', icon: <CreditCard size={18} /> },
        { name: 'Exams Config', path: '/exams-config', icon: <Calendar size={18} /> },
        { name: 'Notifications', path: '/notifications', icon: <Bell size={18} /> },
      ];
    }
    if (user?.role === 'Principal') {
      return [
        ...common,
        { name: 'Student Directory', path: '/students', icon: <Users size={18} /> },
        { name: 'Teachers Directory', path: '/teachers', icon: <Users size={18} /> },
        { name: 'Fees Tracker', path: '/fees-tracker', icon: <CreditCard size={18} /> },
        { name: 'Exams', path: '/exams', icon: <Calendar size={18} /> },
        { name: 'Notifications', path: '/notifications', icon: <Bell size={18} /> },
      ];
    }
    if (user?.role === 'Office Admin') {
      return [
        ...common,
        { name: 'Admissions Form', path: '/admissions', icon: <GraduationCap size={18} /> },
        { name: 'Student Directory', path: '/students', icon: <Users size={18} /> },
        { name: 'Collect Fees', path: '/collect-fees', icon: <CreditCard size={18} /> },
      ];
    }
    if (user?.role === 'Teacher' || user?.role === 'Class Teacher') {
      return [
        ...common,
        { name: 'Mark Attendance', path: '/attendance', icon: <CheckCircle size={18} /> },
        { name: 'Homework Board', path: '/homework', icon: <FileText size={18} /> },
        { name: 'Enter Marks', path: '/marks-entry', icon: <Calendar size={18} /> },
      ];
    }
    if (user?.role === 'Student') {
      return [
        ...common,
        { name: 'My Attendance', path: '/my-attendance', icon: <CheckCircle size={18} /> },
        { name: 'My Homework', path: '/my-homework', icon: <FileText size={18} /> },
        { name: 'My Results', path: '/my-results', icon: <Calendar size={18} /> },
      ];
    }
    if (user?.role === 'Parent') {
      return [
        ...common,
        { name: 'Child Attendance', path: '/child-attendance', icon: <CheckCircle size={18} /> },
        { name: 'Child Homework', path: '/child-homework', icon: <FileText size={18} /> },
        { name: 'Fee Status', path: '/fee-status', icon: <CreditCard size={18} /> },
        { name: 'Child Results', path: '/child-results', icon: <Calendar size={18} /> },
      ];
    }
    return common;
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900/60 backdrop-blur-md border-r border-slate-800/40 p-5 shrink-0 z-20">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-2xl shadow-md shadow-indigo-500/10">
            <span className="text-xl font-black text-white tracking-wider">DV</span>
          </div>
          <div>
            <h2 className="font-extrabold text-sm tracking-tight text-white leading-tight">Doon Valley</h2>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">High School ERP</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
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

        <div className="border-t border-slate-800/40 pt-4 mt-auto">
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
            <div className="flex justify-between items-center mb-8">
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

            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase transition-all ${
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
