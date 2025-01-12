import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FBFF]">
      <div className="card-base max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-[#FF62A5] mb-4">
          Oops! Something went wrong 😢
        </h2>
        <p className="text-[#FF9A8C] mb-4">
          {error.message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="button-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
