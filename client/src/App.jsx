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
import ClassesConfig from './pages/ClassesConfig';
import FeesConfig from './pages/FeesConfig';
import Attendance from './pages/Attendance';
import HrCategories from './pages/HrCategories';
import Employees from './pages/Employees';
import ReportsPage from './pages/ReportsPage';

import {
  StudentAttendance,
  StudentResults,
  StudentFees
} from './pages/StudentParentViews';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* First Login Password Reset */}
            <Route element={<ProtectedRoute />}>
              <Route path="/change-password-first" element={<ChangePasswordFirst />} />
            </Route>

            {/* Core Protected App Layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/students" element={<Students />} />
                <Route path="/classes-config" element={<ClassesConfig />} />
                <Route path="/fees-config" element={<FeesConfig />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/hr-categories" element={<HrCategories />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/reports" element={<ReportsPage />} />
                
                {/* Student / Parent Portal Routes */}
                <Route path="/my-attendance" element={<StudentAttendance />} />
                <Route path="/my-results" element={<StudentResults />} />
                <Route path="/fee-status" element={<StudentFees />} />

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
