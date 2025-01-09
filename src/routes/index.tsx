import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import PhysicalExam from '../pages/PhysicalExam';
import Emergency from '../pages/Emergency';
import PharmacologyPage from '../pages/PharmacologyPage';
import Calculators from '../pages/Calculators';
import Register from '../pages/Register';

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Main routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/chat/:specialtyId" element={<Chat />} />
          <Route path="/physical-exam" element={<PhysicalExam />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/pharmacy" element={<PharmacologyPage />} />
          <Route path="/calculators" element={<Calculators />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}