import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AuthRequired from './components/auth/AuthRequired';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <AuthRequired>
        <div className="min-h-screen bg-[#F0FBFF]">
          <Dashboard />
        </div>
      </AuthRequired>
    </AuthProvider>
  );
}

export default App;
