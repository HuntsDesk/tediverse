"use client";
import React from "react";

function DashboardCard({ title, content, children, emoji }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#FFE4E1]">
      {emoji && (
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] flex items-center justify-center mb-4">
          <span className="text-2xl">{emoji}</span>
        </div>
      )}
      {title && (
        <h2 className="text-2xl mb-4 text-[#FF62A5] font-bold">{title}</h2>
      )}
      {content && <p className="text-[#FF9A8C] text-lg">{content}</p>}
      {children}
    </div>
  );
}

function DashboardCardStory() {
  return (
    <div className="p-8 bg-[#F0FBFF] space-y-8">
      <DashboardCard
        emoji="✨"
        title="Fun Activities!"
        content="Let's play and learn together!"
      />

      <DashboardCard emoji="💝" title="Special Message">
        <div className="text-[#FF9A8C] text-lg">
          You're doing amazing today!
        </div>
      </DashboardCard>

      <DashboardCard emoji="🌟" content="Keep up the great work!" />

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) rotate(-2deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0);
          }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        div {
          animation: fadeIn 0.5s ease-out;
        }

        div:hover {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default DashboardCard;
