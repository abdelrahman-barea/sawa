import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface CardProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  showCloseButton = false, 
  onClose,
  title 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md animate-fade-in relative ${className}`}>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-red-500 hover:text-red-700 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      )}
      
      {title && (
        <h1 className="text-2xl font-bold text-sawa-blue text-center mb-6">
          {title}
        </h1>
      )}
      
      {children}
    </div>
  );
};