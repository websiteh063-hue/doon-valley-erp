import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';
import api from '../services/api';
import { User, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSessionExpired = searchParams.get('expired') === 'true';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { username, password });
      const { accessToken, refreshToken, user, profile } = response.data;
      
      dispatch(setCredentials({ accessToken, refreshToken, user, profile }));
      
      if (user.isFirstLogin) {
        navigate('/change-password-first');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Premium Floating Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full filter blur-3xl animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-float-reverse pointer-events-none"></div>
      <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-pink-500/5 rounded-full filter blur-2xl animate-float-slow pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 border border-slate-800/35">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl shadow-inner mb-4 relative">
            <ShieldCheck className="text-indigo-400" size={32} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2 leading-none">
            Doon Valley <span className="text-gradient-primary">ERP</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            High School Management System
          </p>
        </div>

        {isSessionExpired && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-xl p-3 mb-6 text-center font-medium">
            Your session has expired. Please login again.
          </div>
        )}

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl p-3 mb-6 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="username">
              Username / Admission No
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                <User size={18} />
              </span>
              <input
                id="username"
                type="text"
                required
                className="w-full premium-input py-3 pl-12 pr-4 text-slate-200 placeholder-slate-650 focus:outline-none text-sm"
                placeholder="e.g. admin@school.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Reset Password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                <Lock size={18} />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full premium-input py-3 pl-12 pr-12 text-slate-200 placeholder-slate-650 focus:outline-none text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
            />
            <label htmlFor="remember" className="ml-2 block text-xs text-slate-400 font-medium select-none cursor-pointer">
              Remember me on this device
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-glow py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-[11px] text-slate-500 border-t border-slate-800/40 pt-5 leading-relaxed">
          Default Admin:<br />
          <span className="text-slate-400 font-mono">admin@school.com</span> / <span className="text-slate-400 font-mono">admin123</span>
        </div>
      </div>
    </div>
  );
}
