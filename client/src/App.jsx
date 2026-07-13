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
import Users from './pages/Users';
import FeesConfig from './pages/FeesConfig';
import ExamsConfig from './pages/ExamsConfig';
import NotificationsPage from './pages/NotificationsPage';
import FeesTracker from './pages/FeesTracker';
import Exams from './pages/Exams';
import CollectFees from './pages/CollectFees';
import Attendance from './pages/Attendance';
import Homework from './pages/Homework';
import MarksEntry from './pages/MarksEntry';
import FrontOffice from './pages/FrontOffice';
import IncomeExpense from './pages/IncomeExpense';
import Elearning from './pages/Elearning';
import AcademicsModules from './pages/AcademicsModules';
import ServicesAssets from './pages/ServicesAssets';

import {
  StudentAttendance,
  StudentHomework,
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
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/users" element={<Users />} />
                <Route path="/fees-config" element={<FeesConfig />} />
                <Route path="/exams-config" element={<ExamsConfig />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                
                {/* Principal / Operations Routes */}
                <Route path="/fees-tracker" element={<FeesTracker />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/front-office" element={<FrontOffice />} />
                <Route path="/collect-fees" element={<CollectFees />} />
                
                {/* Financial Ledger Routes */}
                <Route path="/income" element={<IncomeExpense />} />
                <Route path="/expense" element={<IncomeExpense />} />
                
                {/* E-Learning Routes */}
                <Route path="/online-classes" element={<Elearning />} />
                
                {/* Academic Modules Routes */}
                <Route path="/academics" element={<AcademicsModules />} />
                <Route path="/question-papers" element={<AcademicsModules />} />
                <Route path="/primary-evaluation" element={<AcademicsModules />} />
                <Route path="/disciplinary" element={<AcademicsModules />} />
                
                {/* Services & Assets Routes */}
                <Route path="/download-center" element={<ServicesAssets />} />
                <Route path="/inventory" element={<ServicesAssets />} />
                <Route path="/library" element={<ServicesAssets />} />
                <Route path="/transport" element={<ServicesAssets />} />
                <Route path="/hostel" element={<ServicesAssets />} />
                <Route path="/certificates" element={<ServicesAssets />} />
                <Route path="/consent-letters" element={<ServicesAssets />} />
                
                {/* Teacher / Class Teacher Routes */}
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/marks-entry" element={<MarksEntry />} />
                
                {/* Student / Parent Routes */}
                <Route path="/my-attendance" element={<StudentAttendance />} />
                <Route path="/my-results" element={<StudentResults />} />
                <Route path="/child-attendance" element={<StudentAttendance />} />
                <Route path="/fee-status" element={<StudentFees />} />
                <Route path="/child-results" element={<StudentResults />} />

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
