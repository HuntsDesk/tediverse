import React from 'react';

function Dialog({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl">
        <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">{title}</h3>
        {children}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#FF62A5] text-white hover:bg-[#FF4D94] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
