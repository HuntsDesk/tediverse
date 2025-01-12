import React from 'react';
import DashboardCard from '../DashboardCard';

export function MessagesCard({ messages }) {
  return (
    <DashboardCard>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">Recent Messages</h3>
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="bg-[#FFF5F7] p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#FF62A5] font-bold">
                  {msg.from_type}
                </span>
                <span className="text-[#FF9A8C] text-sm">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-[#FF9A8C]">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
