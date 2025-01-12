import React from 'react';

export function HeaderBanner({ title, subtitle, imageSrc, icon, children }) {
  return (
    <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 flex-grow">
          <div className="relative">
            <img
              src={imageSrc}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform bg-white"
            />
            <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
              <i className={`fas fa-${icon} text-2xl text-[#FF62A5]`}></i>
            </div>
          </div>
          <div className="text-center md:text-left flex-grow">
            <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
            <p className="text-white text-2xl mb-4">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
