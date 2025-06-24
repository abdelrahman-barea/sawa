import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-sawa-dark-blue flex items-center justify-center p-4 ${className}`}>
      {children}
    </div>
  );
};