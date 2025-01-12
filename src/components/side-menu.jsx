"use client";
import React from "react";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState("/dashboard");
  const [activeModule, setActiveModule] = useState("dashboard");

  const menuItems = [
    {
      title: "Home",
      emoji: "🏠",
      bgColor: "bg-[#FFE4E1]",
      hoverBg: "hover:bg-[#FFD1DC]",
      textColor: "text-[#FF62A5]",
      module: "dashboard",
    },
    {
      title: "Daily Schedule",
      emoji: "📅",
      bgColor: "bg-[#FFE4E1]",
      hoverBg: "hover:bg-[#FFD1DC]",
      textColor: "text-[#FF62A5]",
      module: "daily-schedule",
    },
    {
      title: "Emotion Tools",
      emoji: "😊",
      bgColor: "bg-[#FFE4E1]",
      hoverBg: "hover:bg-[#FFD1DC]",
      textColor: "text-[#FF62A5]",
      module: "emotion-tools",
    },
    {
      title: "Social Stories",
      emoji: "📚",
      bgColor: "bg-[#FFE4E1]",
      hoverBg: "hover:bg-[#FFD1DC]",
      textColor: "text-[#FF62A5]",
      module: "social-stories",
    },
    {
      title: "Communication",
      emoji: "💭",
      bgColor: "bg-[#FFE4E1]",
      hoverBg: "hover:bg-[#FFD1DC]",
      textColor: "text-[#FF62A5]",
      module: "communication",
    },
    {
      title: "Sensory Activities",
      emoji: "🌈",
      bgColor: "bg-[#FFE4E1]",
      hoverBg: "hover:bg-[#FFD1DC]",
      textColor: "text-[#FF62A5]",
      module: "sensory-activities",
    },
    {
      title: "My Stars",
      emoji: "🌟",
      bgColor: "bg-[#FFE4E1]",
      hoverBg: "hover:bg-[#FFD1DC]",
      textColor: "text-[#FF62A5]",
      module: "my-stars",
    },
  ];

  return (
    <div className="bg-[#FFF9F0] w-[280px] min-h-screen p-6 flex flex-col gap-8 border-r-4 border-[#FFE4E1] shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFE162] to-[#FF62A5] flex items-center justify-center">
            <span className="text-white text-lg font-bold">CD</span>
          </div>
          <span className="text-[#FF69B4] font-roboto text-xl font-bold">
            Child Dashboard
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#FF69B4] hover:text-[#FF1493] rounded-full p-2 hover:bg-[#FFE4E1] transition-all"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentPath(item.module);
                setActiveModule(item.module);
              }}
              className={`flex items-center gap-4 p-4 ${item.textColor} ${
                item.hoverBg
              } rounded-2xl transition-all duration-300 w-full group hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 ${
                currentPath === item.module ? "bg-[#FFD1DC]" : ""
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg flex-shrink-0`}
              >
                <span className="text-xl group-hover:animate-bounce">
                  {item.emoji}
                </span>
              </div>
              <span className="font-roboto font-medium text-lg group-hover:font-bold text-left flex-1">
                {item.title}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SideMenuStory() {
  return (
    <div className="w-full h-full">
      <SideMenu />
    </div>
  );
}

export default SideMenu;
