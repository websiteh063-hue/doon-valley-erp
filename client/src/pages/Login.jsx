import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';
import api from '../services/api';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative mesh light circle */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-block p-3 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-2xl shadow-lg mb-3">
            <span className="text-3xl font-bold text-white tracking-wider">DV</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Doon Valley ERP</h1>
          <p className="text-sm text-slate-400">High School Management System</p>
        </div>

        {isSessionExpired && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-lg p-3 mb-6 text-center">
            Your session has expired. Please login again.
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg p-3 mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" htmlFor="username">
              Username / Admission No
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                <User size={18} />
              </span>
              <input
                id="username"
                type="text"
                required
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                placeholder="e.g. admin@school.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                <Lock size={18} />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
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
              className="h-4 w-4 rounded bg-slate-900 border-slate-700/50 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
            />
            <label htmlFor="remember" className="ml-2 block text-xs text-slate-400">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 relative z-10 border-t border-slate-800/50 pt-4">
          Demo Accounts:<br />
          Admin: <span className="text-slate-400 font-mono">admin@school.com</span> / <span className="text-slate-400 font-mono">admin123</span>
        </div>
      </div>
    </div>
  );
}
