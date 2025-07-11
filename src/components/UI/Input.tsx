import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-sawa-blue mb-2">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-3 py-2 bg-sawa-light-gray border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sawa-orange focus:border-sawa-orange transition-colors ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';