import React from 'react';
import { defaultAvatar } from '../../assets/defaultAvatar';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F0FBFF] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <img 
              src={defaultAvatar} 
              alt="Sad avatar" 
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-[#FF62A5] mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-[#FF9A8C] mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#FFE4E1] text-[#FF62A5] rounded-full hover:bg-[#FFD1DC] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
