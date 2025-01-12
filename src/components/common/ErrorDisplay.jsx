import React from 'react';
import { defaultAvatar } from '../../assets/defaultAvatar';

export function ErrorDisplay({ error, onRetry }) {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F0FBFF]">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <img 
          src={defaultAvatar} 
          alt="Error avatar" 
          className="w-24 h-24 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-[#FF62A5] mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-[#FF9A8C] mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        {error.details && (
          <p className="text-[#FF9A8C] text-sm mb-6">
            Details: {error.details}
          </p>
        )}
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-[#FFE4E1] text-[#FF62A5] rounded-full hover:bg-[#FFD1DC] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
