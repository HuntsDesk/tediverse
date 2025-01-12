import React from 'react';

export default function DashboardCard({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#FFE4E1]">
      {children}
    </div>
  );
}
