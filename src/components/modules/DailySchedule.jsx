import React from 'react';
import DashboardCard from '../DashboardCard';
import { HeaderBanner } from '../common/HeaderBanner';

function DailySchedule({ completedTools, toggleActivity }) {
  const scheduleItems = [
    { id: 1, time: "8:00 AM", activity: "Wake Up & Get Ready 🌅" },
    { id: 2, time: "9:00 AM", activity: "Breakfast Time 🥣" },
    { id: 3, time: "10:00 AM", activity: "Learning Time 📚" },
    { id: 4, time: "12:00 PM", activity: "Lunch Break 🍎" },
    { id: 5, time: "2:00 PM", activity: "Creative Play 🎨" },
    { id: 6, time: "4:00 PM", activity: "Outdoor Time 🌳" },
    { id: 7, time: "6:00 PM", activity: "Dinner Time 🍽️" },
    { id: 8, time: "8:00 PM", activity: "Bedtime Routine 🌙" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      <HeaderBanner
        title="Daily Schedule 📅"
        subtitle="Let's have an amazing day together! 🌟"
        imageSrc="https://ucarecdn.com/de5c358e-16a8-43cc-9935-f722898cbbe8/-/format/auto/"
        icon="calendar-day"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scheduleItems.map((activity) => (
          <DashboardCard key={activity.id}>
            <div className="flex items-center justify-between gap-4 p-2">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full ${
                  completedTools.includes(activity.activity)
                    ? "bg-[#98FB98]"
                    : "bg-gradient-to-br from-[#FFE162] to-[#FF9A8C]"
                  } flex items-center justify-center transition-all duration-300`}
                >
                  <span className="text-2xl">
                    {completedTools.includes(activity.activity) ? "✓" : "⏰"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#FF62A5] font-bold text-xl">
                    {activity.time}
                  </span>
                  <span className="text-[#FF9A8C] text-lg">
                    {activity.activity}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleActivity(activity.activity)}
                className={`px-4 py-2 rounded-full ${
                  completedTools.includes(activity.activity)
                    ? "bg-[#98FB98] text-[#3CB371]"
                    : "bg-[#FFE4E1] text-[#FF62A5]"
                } hover:opacity-80 transition-all duration-300`}
              >
                {completedTools.includes(activity.activity)
                  ? "Done! 🎉"
                  : "Mark Done"}
              </button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}

export default DailySchedule;
