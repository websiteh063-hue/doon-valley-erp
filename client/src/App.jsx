import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store';
import { ProtectedRoute, PublicRoute } from './components/RouteGuards';

import Login from './pages/Login';
import ChangePasswordFirst from './pages/ChangePasswordFirst';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layouts/DashboardLayout';
import Admissions from './pages/Admissions';
import Students from './pages/Students';
import Teachers from './pages/Teachers';

// Create a client for React Query
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes (Guest Only) */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* First Login Password Reset (Protected but before normal layout) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/change-password-first" element={<ChangePasswordFirst />} />
            </Route>

            {/* Core Protected App Layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/students" element={<Students />} />
                <Route path="/teachers" element={<Teachers />} />
                
                {/* Fallbacks */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Route>

            {/* Root Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
