import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  profile: localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null,
  isAuthenticated: !!localStorage.getItem('token'),
  academicSession: localStorage.getItem('academicSession') || '2026-2027',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { accessToken, refreshToken, user, profile } = action.payload;
      state.token = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      state.profile = profile;
      state.isAuthenticated = true;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
      } else {
        localStorage.removeItem('profile');
      }
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    updateProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
      localStorage.setItem('profile', JSON.stringify(state.profile));
    },
    setAcademicSession(state, action) {
      state.academicSession = action.payload;
      localStorage.setItem('academicSession', action.payload);
    }
  },
});

export const { setCredentials, logout, updateUser, updateProfile, setAcademicSession } = authSlice.actions;
export default authSlice.reducer;
