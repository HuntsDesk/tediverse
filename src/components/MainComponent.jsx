import React, { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import SideMenu from './SideMenu';
import { emotionTools, sensoryActivities, socialStories } from '../data/appData';

function MainComponent() {
  const [isOpen, setIsOpen] = useState(true);
  const [stars, setStars] = useState(6);
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [showDialog, setShowDialog] = useState(null);
  const [userResponse, setUserResponse] = useState("");
  const [completedTools, setCompletedTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("parent");
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [activeModule, setActiveModule] = useState("home");
  const [homework, setHomework] = useState({
    title: "Reading Practice - Chapter 3",
    dueDate: "Tomorrow",
    completed: false,
  });

  const toggleActivity = (activityTitle) => {
    setCompletedTools((prev) =>
      prev.includes(activityTitle)
        ? prev.filter((title) => title !== activityTitle)
        : [...prev, activityTitle]
    );
  };

  // Save stars to localStorage instead of database
  useEffect(() => {
    const savedStars = localStorage.getItem('stars');
    if (savedStars) {
      setStars(parseInt(savedStars));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stars', stars.toString());
  }, [stars]);

  // Update stars based on completed tools
  useEffect(() => {
    const totalStars = completedTools.length;
    setStars(totalStars);
  }, [completedTools]);

  const renderModule = () => {
    switch (activeModule) {
      case "emotion-tools":
        return (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/e1f2f038-c520-4926-bbbc-2486d9645945/-/format/auto/"
                      alt="Child wearing headphones at an event"
                      className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
                      {currentEmotion ? (
                        <span className="text-2xl">
                          {emotionTools[currentEmotion].title}
                        </span>
                      ) : (
                        <i className="fas fa-heart text-2xl text-[#FF62A5]"></i>
                      )}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {currentEmotion
                        ? `Feeling ${currentEmotion} ${emotionTools[currentEmotion].title}`
                        : "Emotion Tools"}
                    </h2>
                    <p className="text-white text-2xl mb-4">
                      {currentEmotion
                        ? "Try these activities!"
                        : "How are you feeling today?"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!currentEmotion && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.entries(emotionTools).map(([emotion, data]) => (
                  <DashboardCard key={emotion}>
                    <button
                      onClick={() => {
                        setCurrentEmotion(emotion);
                        setShowDialog(true);
                      }}
                      className="w-full h-full p-4 rounded-xl transition-all duration-300 hover:bg-[#FFE4E1]"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] flex items-center justify-center text-4xl">
                          {data.title}
                        </div>
                        <span className="text-[#FF62A5] font-bold text-xl capitalize">
                          {emotion}
                        </span>
                      </div>
                    </button>
                  </DashboardCard>
                ))}
              </div>
            )}

            {currentEmotion && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {emotionTools[currentEmotion].tools.map((tool, index) => (
                  <DashboardCard key={index}>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] flex items-center justify-center text-2xl">
                            {tool.emoji}
                          </div>
                          <span className="text-[#FF62A5] font-bold text-xl">
                            {tool.name}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleActivity(tool.name)}
                          className={`px-4 py-2 rounded-full ${
                            completedTools.includes(tool.name)
                              ? "bg-[#98FB98] text-[#3CB371]"
                              : "bg-[#FFE4E1] text-[#FF62A5]"
                          } hover:opacity-80 transition-all duration-300`}
                        >
                          {completedTools.includes(tool.name)
                            ? "Done! 🎉"
                            : "Mark Done"}
                        </button>
                      </div>
                    </div>
                  </DashboardCard>
                ))}
              </div>
            )}

            {/* Dialog component remains the same */}
            {showDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                {/* Dialog content remains the same */}
              </div>
            )}
          </div>
        );
      // ... Other case statements for different modules remain the same
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F0FBFF] font-roboto overflow-hidden">
      <div
        className={`fixed md:relative md:flex z-50 ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <SideMenu activeModule={activeModule} setActiveModule={setActiveModule} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center p-4 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#5B9BD5] hover:text-[#3982C6] p-2 rounded-full hover:bg-[#E8F4FF] transition-colors"
          >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>
        {renderModule()}
      </div>
    </div>
  );
}

export default MainComponent;
