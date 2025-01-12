import React from 'react';
import DashboardCard from '../../DashboardCard';

export function StarsCard({ stars }) {
  return (
    <DashboardCard>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">Star Progress</h3>
        <div className="flex flex-wrap gap-4 mb-4">
          {Array.from({ length: Math.min(stars, 10) }).map((_, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] rounded-full flex items-center justify-center"
            >
              <span className="text-2xl">⭐</span>
            </div>
          ))}
        </div>
        <div className="bg-[#FFE4E1] p-4 rounded-xl">
          <div className="flex justify-between mb-2">
            <span className="text-[#FF62A5]">Progress to next reward</span>
            <span className="text-[#FF62A5]">{stars}/20 stars</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full">
            <div
              className="h-full bg-[#FF62A5] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((stars / 20) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
