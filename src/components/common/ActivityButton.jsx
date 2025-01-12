import React from 'react';

function ActivityButton({ completed, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full ${
        completed
          ? "bg-[#98FB98] text-[#3CB371]"
          : "bg-[#FFE4E1] text-[#FF62A5]"
      } hover:opacity-80 transition-all duration-300`}
    >
      {completed ? "Done! 🎉" : children}
    </button>
  );
}

export default ActivityButton;
