import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/authSlice';
import api from '../services/api';
import { KeyRound } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

export default function ChangePasswordFirst() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      return setError('New passwords do not match');
    }

    if (newPassword.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    setLoading(true);
    try {
      await api.put('/auth/change-password', { oldPassword, newPassword });
      setSuccess(true);
      dispatch(updateUser({ isFirstLogin: false }));
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password. Please check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl mb-3 animate-pulse">
            <KeyRound size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Secure Your Account</h1>
          <p className="text-xs text-slate-400">
            This is your first login. You must change your default password to continue.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg p-3 mb-6 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg p-3 mb-6 text-center">
            Password updated successfully! Redirecting to your dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" htmlFor="oldPassword">
              Current / Default Password
            </label>
            <input
              id="oldPassword"
              type="password"
              required
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={loading || success}
            />
            {user?.role === 'Student' && (
              <span className="text-[10px] text-slate-500 mt-1 block">
                Hint: For students, this is the parent's registered mobile number.
              </span>
            )}
            {user?.role === 'Teacher' && (
              <span className="text-[10px] text-slate-500 mt-1 block">
                Hint: For teachers, this is usually 123456.
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              required
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading || success}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              placeholder="Repeat new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading || success}
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Update Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
