import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4" role="status">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF62A5] border-t-transparent"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
