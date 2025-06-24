import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SmartEntry } from './pages/SmartEntry';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { SawaHome } from './pages/SawaHome';
import { CameraSelection } from './pages/CameraSelection';
import { Connection } from './pages/Connection';
import { Rating } from './pages/Rating';
import { Premium } from './pages/Premium';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SmartEntry />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes */}
      <Route path="/sawa" element={
        <ProtectedRoute>
          <SawaHome />
        </ProtectedRoute>
      } />
      <Route path="/camera-selection" element={
        <ProtectedRoute>
          <CameraSelection />
        </ProtectedRoute>
      } />
      <Route path="/connection" element={
        <ProtectedRoute>
          <Connection />
        </ProtectedRoute>
      } />
      <Route path="/rating" element={
        <ProtectedRoute>
          <Rating />
        </ProtectedRoute>
      } />
      <Route path="/premium" element={
        <ProtectedRoute>
          <Premium />
        </ProtectedRoute>
      } />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;