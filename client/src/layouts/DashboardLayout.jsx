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

  // Define menu items by role
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800/80 p-5 relative shrink-0">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-xl">
            <span className="text-xl font-black text-white">DV</span>
          </div>
          <div>
            <h2 className="font-extrabold text-sm tracking-tight text-white leading-none">Doon Valley</h2>
            <span className="text-[10px] text-slate-400">High School ERP</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/15'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-850 pt-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Drawer for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 md:hidden transition-opacity">
          <aside className="w-64 bg-slate-900 h-full p-5 flex flex-col border-r border-slate-800">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-xl">
                  <span className="text-lg font-black text-white">DV</span>
                </div>
                <h2 className="font-extrabold text-sm text-white">Doon Valley</h2>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
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
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors w-full mt-auto"
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
        <header className="h-16 border-b border-slate-900 bg-slate-950 flex items-center justify-between px-6 shrink-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>

          <div className="hidden md:block">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {user?.role} Workspace
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-900/50 hover:bg-slate-900 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>

            <div className="h-8 w-px bg-slate-900"></div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-200 leading-tight">
                  {user?.username}
                </p>
                <span className="text-[10px] text-indigo-400 font-semibold uppercase">
                  {user?.role}
                </span>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold border border-slate-800 shadow">
                <UserCircle size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 bg-gradient-mesh bg-fixed">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
