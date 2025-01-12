import React from 'react';
import DashboardCard from '../DashboardCard';

export function ScheduleCard({ activities, onToggleComplete }) {
  return (
    <DashboardCard>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">Today's Schedule</h3>
        <div className="space-y-4">
          {activities.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 hover:bg-[#FFE4E1] rounded-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FFE4E1] flex items-center justify-center">
                  <span className="text-xl">{item.emoji || '⏰'}</span>
                </div>
                <div>
                  <p className="text-[#FF62A5] font-bold">{item.time_scheduled}</p>
                  <p className="text-[#FF9A8C]">{item.title}</p>
                </div>
              </div>
              <button
                onClick={() => onToggleComplete(item.id)}
                className="px-4 py-2 rounded-full bg-[#FFE4E1] text-[#FF62A5] hover:opacity-80 transition-all duration-300"
              >
                Mark Done
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
