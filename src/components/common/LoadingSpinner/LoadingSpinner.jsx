import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'blue', 
  message = 'Loading...',
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600'
  };

  const spinnerClass = `
    ${sizeClasses[size]} 
    ${colorClasses[color]} 
    border-2 border-solid border-t-transparent 
    rounded-full animate-spin
    ${className}
  `;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center">
          <div className={spinnerClass}></div>
          {message && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={spinnerClass}></div>
      {message && (
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
          {message}
        </p>
      )}
    </div>
  );
};

// Inline spinner for buttons or small spaces
export const InlineSpinner = ({ size = 'small', color = 'white' }) => {
  const sizeClasses = {
    small: 'h-3 w-3',
    medium: 'h-4 w-4',
  };

  const colorClasses = {
    white: 'border-white',
    blue: 'border-blue-600',
    gray: 'border-gray-600',
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      ${colorClasses[color]} 
      border-2 border-solid border-t-transparent 
      rounded-full animate-spin
    `}></div>
  );
};

export default LoadingSpinner;
