import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'blue', 
  message = 'Loading...',
  fullScreen = false,
  className = '',
  variant = 'spinner' // 'spinner', 'dots', 'pulse'
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-slate-600',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600'
  };

  const Spinner = () => (
    <div className={`
      ${sizeClasses[size]} 
      ${colorClasses[color]} 
      border-2 border-solid border-t-transparent 
      rounded-full animate-spin
      ${className}
    `}></div>
  );

  const DotsLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`
            ${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : size === 'large' ? 'w-4 h-4' : 'w-5 h-5'}
            bg-blue-600 rounded-full animate-bounce
          `}
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  );

  const PulseLoader = () => (
    <div className={`
      ${sizeClasses[size]}
      bg-gradient-to-r from-blue-400 to-purple-500 
      rounded-full animate-pulse
      ${className}
    `}></div>
  );

  const getLoader = () => {
    switch (variant) {
      case 'dots': return <DotsLoader />;
      case 'pulse': return <PulseLoader />;
      default: return <Spinner />;
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-sm mx-4 border border-slate-200 dark:border-slate-700">
          <div className="relative">
            {getLoader()}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-ping"></div>
          </div>
          {message && (
            <div className="mt-6 text-center">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {message}
              </p>
              <div className="mt-2 flex justify-center">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-slate-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {getLoader()}
        {variant === 'spinner' && (
          <div className="absolute inset-0 border-2 border-slate-200 dark:border-slate-700 rounded-full"></div>
        )}
      </div>
      {message && (
        <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium text-center">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
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
