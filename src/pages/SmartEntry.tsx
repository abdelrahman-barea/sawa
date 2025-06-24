import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageContainer } from '../components/Layout/PageContainer';

export const SmartEntry: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user has ever registered
    const storedUsers = JSON.parse(localStorage.getItem('sawaUsers') || '[]');
    const hasRegisteredUsers = storedUsers.length > 0;

    if (isAuthenticated) {
      navigate('/sawa', { replace: true });
    } else if (hasRegisteredUsers) {
      navigate('/login', { replace: true });
    } else {
      navigate('/signup', { replace: true });
    }
  }, [navigate, isAuthenticated]);

  return (
    <PageContainer>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sawa-orange mx-auto mb-4"></div>
          <p className="text-sawa-blue">Loading Sawa...</p>
        </div>
      </div>
    </PageContainer>
  );
};