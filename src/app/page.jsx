"use client";
import React from "react";
import DashboardCard from "../components/dashboard-card";

function MainComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [stars, setStars] = useState(0);
  const [currentSong, setCurrentSong] = useState({
    title: "Calming Ocean Sounds",
    progress: 33,
  });
  const [activeModule, setActiveModule] = useState("home");
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [showDialog, setShowDialog] = useState(null);
  const [userResponse, setUserResponse] = useState("");
  const [completedTools, setCompletedTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [message, setMessage] = useState("");
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [readMessages, setReadMessages] = useState([]);
  const [homework, setHomework] = useState({
    title: "Reading Practice - Chapter 3",
    dueDate: "Tomorrow",
    completed: false,
  });
  const [messageHistory, setMessageHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("parent");
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const categories = [
    { id: "all", name: "All Stories", emoji: "📚" },
    { id: "social", name: "Social Skills", emoji: "🤝" },
    { id: "school", name: "School Life", emoji: "🏫" },
    { id: "emotions", name: "Emotions", emoji: "🌈" },
    { id: "daily", name: "Daily Life", emoji: "🌞" },
    { id: "safety", name: "Safety", emoji: "🛡️" },
  ];
  const emotionTools = {
    happy: {
      title: "😊",
      tools: [
        { name: "Dance Party", emoji: "💃", stars: 2 },
        { name: "Share Your Joy", emoji: "🤗", stars: 1 },
        { name: "Gratitude Journal", emoji: "✍️", stars: 2 },
        { name: "Silly Face Contest", emoji: "😝", stars: 1 },
        { name: "High Five Time", emoji: "🖐️", stars: 1 },
        { name: "Victory Dance", emoji: "🕺", stars: 2 },
      ],
    },
    sad: {
      title: "😢",
      tools: [
        { name: "Cozy Corner Time", emoji: "🛋️", stars: 2 },
        { name: "Talk About Feelings", emoji: "💭", stars: 2 },
        { name: "Listen to Music", emoji: "🎵", stars: 1 },
        { name: "Cuddle Buddy", emoji: "🧸", stars: 1 },
        { name: "Comfort Box", emoji: "📦", stars: 2 },
        { name: "Gentle Hugs", emoji: "🤗", stars: 1 },
      ],
    },
    angry: {
      title: "😠",
      tools: [
        { name: "Deep Breaths", emoji: "🫁", stars: 2 },
        { name: "Squeeze Ball", emoji: "🟡", stars: 1 },
        { name: "Count to Ten", emoji: "🔢", stars: 1 },
        { name: "Draw Feelings", emoji: "🎨", stars: 2 },
        { name: "Punch Pillow", emoji: "🛏️", stars: 1 },
        { name: "Calm Down Corner", emoji: "🪑", stars: 2 },
      ],
    },
    worried: {
      title: "😰",
      tools: [
        { name: "Calm Down Jar", emoji: "🌈", stars: 2 },
        { name: "Worry Box", emoji: "📦", stars: 2 },
        { name: "Peaceful Place", emoji: "🌅", stars: 1 },
        { name: "Butterfly Hugs", emoji: "🦋", stars: 1 },
        { name: "Breathing Buddy", emoji: "🧸", stars: 2 },
        { name: "Safe Space Fort", emoji: "🏰", stars: 2 },
      ],
    },
    excited: {
      title: "🤩",
      tools: [
        { name: "Energy Dance", emoji: "💫", stars: 2 },
        { name: "Happy Drawing", emoji: "🎨", stars: 2 },
        { name: "Celebration Song", emoji: "🎵", stars: 1 },
        { name: "Joy Jump", emoji: "🦘", stars: 1 },
        { name: "Rainbow Parade", emoji: "🌈", stars: 2 },
        { name: "Star Wishes", emoji: "⭐", stars: 1 },
      ],
    },
    overwhelmed: {
      title: "😵",
      tools: [
        { name: "Quiet Time", emoji: "🤫", stars: 2 },
        { name: "Sensory Break", emoji: "🎧", stars: 2 },
        { name: "Gentle Rock", emoji: "💫", stars: 1 },
        { name: "Space Bubble", emoji: "🫧", stars: 1 },
        { name: "Slow Counting", emoji: "🔢", stars: 1 },
        { name: "Nature Sounds", emoji: "🌿", stars: 2 },
      ],
    },
    tired: {
      title: "😴",
      tools: [
        { name: "Rest Corner", emoji: "🛋️", stars: 2 },
        { name: "Soft Music", emoji: "🎵", stars: 1 },
        { name: "Cozy Blanket", emoji: "🧶", stars: 1 },
        { name: "Quiet Book", emoji: "📚", stars: 1 },
        { name: "Eye Rest", emoji: "👁️", stars: 2 },
        { name: "Gentle Stretch", emoji: "🧘‍♀️", stars: 2 },
      ],
    },
    silly: {
      title: "🤪",
      tools: [
        { name: "Funny Faces", emoji: "😜", stars: 1 },
        { name: "Joke Time", emoji: "😂", stars: 1 },
        { name: "Silly Dance", emoji: "💃", stars: 2 },
        { name: "Giggle Game", emoji: "😆", stars: 1 },
        { name: "Funny Songs", emoji: "🎵", stars: 2 },
        { name: "Wacky Moves", emoji: "🕺", stars: 2 },
      ],
    },
  };
  const toggleActivity = (activityTitle) => {
    setCompletedTools((prev) =>
      prev.includes(activityTitle)
        ? prev.filter((title) => title !== activityTitle)
        : [...prev, activityTitle]
    );
  };
  const sensoryActivities = [
    {
      title: "Calming Jar",
      description: "Watch glitter swirl in water",
      icon: "fa-water",
      instructions:
        "Shake the jar gently and watch the glitter float down slowly. Take deep breaths as you watch.",
      duration: "5 minutes",
      stars: 2,
    },
    {
      title: "Squish & Squeeze",
      description: "Play with stress balls",
      icon: "fa-circle",
      instructions:
        "Squeeze the stress ball with different amounts of pressure. Notice how it feels in your hands.",
      duration: "3 minutes",
      stars: 1,
    },
    {
      title: "Light Show",
      description: "Play with colorful lights",
      icon: "fa-lightbulb",
      instructions:
        "Watch the changing colors. Name each color you see. Notice how the colors make you feel.",
      duration: "4 minutes",
      stars: 2,
    },
    {
      title: "Sound Machine",
      description: "Listen to calming sounds",
      icon: "fa-volume-up",
      instructions:
        "Close your eyes and listen to nature sounds. Try to identify different sounds you hear.",
      duration: "5 minutes",
      stars: 2,
    },
    {
      title: "Texture Box",
      description: "Feel different textures",
      icon: "fa-box",
      instructions:
        "Reach into the box and feel different textures. Try to guess what each item is without looking.",
      duration: "4 minutes",
      stars: 1,
    },
    {
      title: "Bubble Play",
      description: "Blow and pop bubbles",
      icon: "fa-circle",
      instructions:
        "Blow bubbles slowly. Watch them float. Try to pop them gently with one finger.",
      duration: "3 minutes",
      stars: 1,
    },
  ];
  const cards = [
    {
      title: "Home",
      content: "Return to main dashboard",
      icon: "fa-home",
      module: "home",
      emoji: "🏠",
    },
    {
      title: "Daily Schedule",
      content: "Plan and view your daily activities",
      icon: "fa-calendar-day",
      module: "daily-schedule",
      emoji: "📅",
    },
    {
      title: "Emotion Tools",
      content: "Explore tools for emotional regulation",
      icon: "fa-face-smile",
      module: "emotion-tools",
      emoji: "😊",
    },
    {
      title: "Social Stories",
      content: "Access helpful social narratives",
      icon: "fa-book-open",
      module: "social-stories",
      emoji: "📚",
    },
    {
      title: "Sensory Activities",
      content: "Discover calming sensory exercises",
      icon: "fa-hand-sparkles",
      module: "sensory-activities",
      emoji: "🌈",
    },
    {
      title: "Communication",
      content: "Assist with daily communication",
      icon: "fa-comments",
      module: "communication",
      emoji: "💌",
    },
    {
      title: "My Stars",
      content: "Check your rewards and progress",
      icon: "fa-star",
      module: "my-stars",
      emoji: "⭐",
    },
    {
      title: "Homework",
      content: "View and complete assignments",
      icon: "fa-book",
      module: "homework",
      emoji: "📝",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/db/autismapp", {
          method: "POST",
          body: JSON.stringify({
            query: "SELECT stars FROM `user_data` WHERE `id` = ?",
            values: ["teddy"],
          }),
        });
        const data = await response.json();

        if (data && data.length > 0) {
          setStars(data[0].stars);
        } else {
          await fetch("/api/db/autismapp", {
            method: "POST",
            body: JSON.stringify({
              query:
                "INSERT INTO `user_data` (id, stars, name) VALUES (?, ?, ?)",
              values: ["teddy", 6, "Teddy"],
            }),
          });
          setStars(6);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setStars(0);
      }
    };
    loadData();
  }, []);

  const [filteredStories, setFilteredStories] = useState([
    {
      title: "Making New Friends",
      description: "Learn how to introduce yourself and make new friends",
      emoji: "🤝",
      category: "social",
      steps: [
        {
          title: "Smile and Say Hello",
          description:
            "Greet the other person with a friendly smile and a simple 'hello'.",
          tips: [
            "Make eye contact",
            "Use a warm tone of voice",
            "Introduce yourself",
          ],
        },
        {
          title: "Ask Questions",
          description:
            "Ask the other person questions to get to know them better.",
          tips: [
            "Ask about their interests",
            "Find common interests",
            "Listen attentively",
          ],
        },
        {
          title: "Suggest an Activity",
          description:
            "Propose an activity you could do together to continue the conversation.",
          tips: [
            "Choose an activity you both might enjoy",
            "Be inclusive and welcoming",
            "Suggest taking turns choosing activities",
          ],
        },
      ],
    },
    {
      title: "Dealing with Bullying",
      description: "Learn strategies to handle bullying situations",
      emoji: "🛡️",
      category: "safety",
      steps: [
        {
          title: "Recognize Bullying",
          description: "Understand what bullying is and how to identify it.",
          tips: [
            "Bullying can be physical, verbal, or social",
            "Bullying is repeated and intentional",
            "Bullying makes the target feel unsafe or uncomfortable",
          ],
        },
        {
          title: "Stay Calm and Confident",
          description: "Respond to the bully in a calm and confident manner.",
          tips: [
            "Maintain a neutral facial expression",
            "Use a firm, clear voice",
            "Avoid showing fear or anger",
          ],
        },
        {
          title: "Seek Help",
          description:
            "Tell a trusted adult, such as a teacher or parent, about the bullying.",
          tips: [
            "Explain what happened and how it made you feel",
            "Ask the adult for help in addressing the situation",
            "Work with the adult to find a solution",
          ],
        },
      ],
    },
    {
      title: "Classroom Behavior",
      description: "Understanding how to behave in the classroom",
      emoji: "📚",
      category: "school",
      steps: [
        {
          title: "Listening Time",
          description: "Learn how to be a good listener during class.",
          tips: [
            "Face the teacher",
            "Keep your hands still",
            "Think about what's being said",
          ],
        },
        {
          title: "Raising Your Hand",
          description: "Learn when and how to raise your hand in class.",
          tips: [
            "Wait for the teacher to finish speaking",
            "Raise your hand quietly",
            "Wait to be called on",
          ],
        },
        {
          title: "Working Quietly",
          description: "Learn how to work without disturbing others.",
          tips: [
            "Use your indoor voice",
            "Stay in your seat",
            "Focus on your own work",
          ],
        },
      ],
    },
    {
      title: "Taking Turns",
      description: "Learning to share and take turns with others",
      emoji: "🔄",
      category: "social",
      steps: [
        {
          title: "Wait Patiently",
          description: "Learn how to wait for your turn.",
          tips: [
            "Count to ten",
            "Watch others take their turn",
            "Think about what you'll do on your turn",
          ],
        },
        {
          title: "Share Fairly",
          description: "Learn how to share with others.",
          tips: [
            "Use a timer if needed",
            "Remember everyone gets a turn",
            "Say 'thank you' when it's your turn",
          ],
        },
        {
          title: "Be Kind",
          description: "Show kindness while waiting and sharing.",
          tips: [
            "Use kind words",
            "Encourage others",
            "Celebrate everyone's success",
          ],
        },
      ],
    },
    {
      title: "Handling Changes",
      description: "Dealing with unexpected changes in routine",
      emoji: "🔄",
      category: "daily",
      steps: [
        {
          title: "Notice the Change",
          description: "Recognize when something is different from usual.",
          tips: [
            "Stay calm",
            "Ask what's different",
            "Remember changes are normal",
          ],
        },
        {
          title: "Use Coping Tools",
          description: "Use your favorite calming strategies.",
          tips: [
            "Take deep breaths",
            "Use your fidget toy",
            "Think happy thoughts",
          ],
        },
        {
          title: "Try Something New",
          description: "Be open to new experiences.",
          tips: [
            "Take small steps",
            "Ask for help if needed",
            "Celebrate trying something new",
          ],
        },
      ],
    },
    {
      title: "Lunchtime Rules",
      description: "Learning proper behavior during lunch",
      emoji: "🍱",
      category: "school",
      steps: [
        {
          title: "Getting Ready",
          description: "Prepare for lunchtime properly.",
          tips: [
            "Wash your hands",
            "Get your lunch items ready",
            "Find your seat quietly",
          ],
        },
        {
          title: "Eating Time",
          description: "Learn proper eating habits.",
          tips: [
            "Use inside voice",
            "Stay in your seat",
            "Clean up after yourself",
          ],
        },
        {
          title: "Clean Up",
          description: "Help keep the lunchroom clean.",
          tips: ["Throw away trash", "Wipe your area", "Push in your chair"],
        },
      ],
    },
    {
      title: "Playground Safety",
      description: "Staying safe while playing outside",
      emoji: "🎪",
      category: "safety",
      steps: [
        {
          title: "Equipment Rules",
          description: "Learn how to use playground equipment safely.",
          tips: [
            "Wait your turn",
            "Use equipment properly",
            "Keep hands to yourself",
          ],
        },
        {
          title: "Playing with Others",
          description: "Learn to play safely with friends.",
          tips: ["Share equipment", "Use kind words", "Include others"],
        },
        {
          title: "Getting Help",
          description: "Know when and how to get adult help.",
          tips: [
            "Look for playground supervisor",
            "Report unsafe behavior",
            "Help others who are hurt",
          ],
        },
      ],
    },
    {
      title: "Morning Routine",
      description: "Getting ready for school in the morning",
      emoji: "🌅",
      category: "daily",
      steps: [
        {
          title: "Wake Up Time",
          description: "Start your day with a good routine.",
          tips: [
            "Get up when alarm rings",
            "Stretch your body",
            "Make your bed",
          ],
        },
        {
          title: "Getting Dressed",
          description: "Learn to dress independently.",
          tips: [
            "Choose weather-appropriate clothes",
            "Put dirty clothes in hamper",
            "Ask for help with buttons if needed",
          ],
        },
        {
          title: "Breakfast Time",
          description: "Have a healthy breakfast.",
          tips: [
            "Sit at the table",
            "Use good manners",
            "Clean up after eating",
          ],
        },
      ],
    },
    {
      title: "Using Kind Words",
      description: "Learning to communicate kindly with others",
      emoji: "💭",
      category: "social",
      steps: [
        {
          title: "Choose Nice Words",
          description: "Learn which words make others feel good.",
          tips: [
            "Say please and thank you",
            "Use friendly greetings",
            "Give compliments",
          ],
        },
        {
          title: "Avoid Hurtful Words",
          description: "Understand which words can hurt feelings.",
          tips: [
            "Think before speaking",
            "Use calm voice",
            "Apologize if needed",
          ],
        },
        {
          title: "Express Feelings",
          description: "Share feelings without hurting others.",
          tips: [
            "Use 'I feel' statements",
            "Stay calm when upset",
            "Ask for help expressing yourself",
          ],
        },
      ],
    },
    {
      title: "Fire Safety",
      description: "Learning what to do in case of fire",
      emoji: "🚨",
      category: "safety",
      steps: [
        {
          title: "Stop, Drop, and Roll",
          description: "Learn the basic fire safety technique.",
          tips: [
            "Stop where you are",
            "Drop to the ground",
            "Roll back and forth",
          ],
        },
        {
          title: "Fire Drill Rules",
          description: "Know what to do during a fire drill.",
          tips: [
            "Listen to teacher's instructions",
            "Walk don't run",
            "Stay with your class",
          ],
        },
        {
          title: "Emergency Exit",
          description: "Learn how to exit safely.",
          tips: [
            "Know the escape routes",
            "Stay low under smoke",
            "Meet at designated spot",
          ],
        },
      ],
    },
    {
      title: "Bus Safety",
      description: "Learning how to ride the school bus safely",
      emoji: "🚌",
      category: "school",
      steps: [
        {
          title: "Waiting for the Bus",
          description: "Learn proper behavior at the bus stop.",
          tips: ["Arrive early", "Stand back from road", "Line up quietly"],
        },
        {
          title: "Getting On",
          description: "Board the bus safely.",
          tips: [
            "Wait for bus to stop",
            "Use handrail",
            "Find your seat quickly",
          ],
        },
        {
          title: "Bus Behavior",
          description: "Follow rules while riding.",
          tips: ["Stay seated", "Use quiet voice", "Keep aisle clear"],
        },
      ],
    },
    {
      title: "Library Rules",
      description: "Learning proper behavior in the library",
      emoji: "📚",
      category: "school",
      steps: [
        {
          title: "Quiet Voice",
          description: "Learn to use library-appropriate voice.",
          tips: ["Whisper only", "Raise hand for help", "Walk quietly"],
        },
        {
          title: "Book Care",
          description: "Learn how to handle books properly.",
          tips: ["Clean hands first", "Turn pages carefully", "Use bookmarks"],
        },
        {
          title: "Return Books",
          description: "Learn responsibility with borrowed books.",
          tips: [
            "Remember due dates",
            "Return books to proper place",
            "Tell librarian if book is damaged",
          ],
        },
      ],
    },
    {
      title: "Personal Space",
      description: "Understanding and respecting personal boundaries",
      emoji: "🫂",
      category: "social",
      steps: [
        {
          title: "Body Bubble",
          description: "Learn about personal space boundaries.",
          tips: [
            "Keep arms-length distance",
            "Ask before hugging",
            "Respect others' space",
          ],
        },
        {
          title: "Reading Body Language",
          description: "Understand when others need space.",
          tips: [
            "Watch for uncomfortable signs",
            "Step back if needed",
            "Ask if unsure",
          ],
        },
        {
          title: "Setting Boundaries",
          description: "Learn to communicate your space needs.",
          tips: [
            "Use kind words to ask for space",
            "Tell trusted adult if uncomfortable",
            "Respect when others need space",
          ],
        },
      ],
    },
    {
      title: "Asking for Help",
      description: "Learning when and how to ask for assistance",
      emoji: "🙋",
      category: "daily",
      steps: [
        {
          title: "Recognize Need",
          description: "Know when you need help.",
          tips: [
            "Try on your own first",
            "Identify the problem",
            "Think about who can help",
          ],
        },
        {
          title: "Ask Politely",
          description: "Learn how to ask for help properly.",
          tips: [
            "Use 'please' and 'thank you'",
            "Wait for good timing",
            "Explain what you need",
          ],
        },
        {
          title: "Accept Help",
          description: "Learn to receive help graciously.",
          tips: [
            "Listen to instructions",
            "Show appreciation",
            "Try to learn for next time",
          ],
        },
      ],
    },
  ]);

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
                          onClick={() =>
                            setCompletedTools([...completedTools, tool.name])
                          }
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

            {showDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl">
                  <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">
                    {currentEmotion === "happy" && "Your happiness matters! 🌟"}
                    {currentEmotion === "sad" && "It's okay to feel sad 💙"}
                    {currentEmotion === "angry" && "Your feelings are valid 💫"}
                    {currentEmotion === "worried" &&
                      "Let's work through this together 🌈"}
                    {currentEmotion === "excited" &&
                      "Your excitement is contagious! ✨"}
                    {currentEmotion === "overwhelmed" &&
                      "Let's take it step by step 🌸"}
                    {currentEmotion === "tired" && "Time to recharge 🌙"}
                    {currentEmotion === "silly" && "Let's have some fun! 🎈"}
                  </h3>
                  <p className="text-[#FF9A8C] text-lg mb-6">
                    {currentEmotion === "happy" &&
                      "Happiness is wonderful! Would you like to share what made you happy today?"}
                    {currentEmotion === "sad" &&
                      "Everyone feels sad sometimes. Would you like to talk about what's making you feel this way?"}
                    {currentEmotion === "angry" &&
                      "Being angry is a normal feeling. What happened to make you feel this way?"}
                    {currentEmotion === "worried" &&
                      "Your worries matter. Can you tell me what's on your mind?"}
                    {currentEmotion === "excited" &&
                      "Your energy is amazing! What's got you so excited today?"}
                    {currentEmotion === "overwhelmed" &&
                      "Things can feel like a lot sometimes. What's making you feel overwhelmed?"}
                    {currentEmotion === "tired" &&
                      "It's important to rest when we need it. What kind of rest do you need right now?"}
                    {currentEmotion === "silly" &&
                      "Being silly is so much fun! What makes you feel playful today?"}
                  </p>
                  <textarea
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    className="w-full p-4 border-2 border-[#FFE162] rounded-xl mb-4 h-32 focus:outline-none focus:border-[#FF62A5]"
                    placeholder="Write your thoughts here..."
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setShowDialog(false);
                        setUserResponse("");
                        setCurrentEmotion("");
                      }}
                      className="px-6 py-2 rounded-full bg-[#FFE4E1] text-[#FF62A5] hover:bg-[#FFD1DC] transition-colors"
                    >
                      Maybe Later
                    </button>
                    <button
                      onClick={() => {
                        setShowDialog(false);
                        setUserResponse("");
                      }}
                      className="px-6 py-2 rounded-full bg-[#FF62A5] text-white hover:bg-[#FF4D94] transition-colors"
                    >
                      I'm Ready
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "social-stories":
        return (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/6c5af2a2-157d-4ba4-b47e-beec9b05213a/-/format/auto/"
                      alt="Friendly cartoon character avatar of a smiling child with colorful background"
                      className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
                      <i className="fas fa-book text-2xl text-[#FF62A5]"></i>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Social Stories
                    </h2>
                    <p className="text-white text-2xl mb-4">
                      Let's learn about different situations!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${
                    selectedCategory === category.id
                      ? "bg-[#FF62A5] text-white"
                      : "bg-[#FFE4E1] text-[#FF62A5]"
                  }`}
                >
                  {category.emoji} {category.name}
                </button>
              ))}
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-[#FFE4E1] focus:border-[#FF62A5] outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories
                .filter((story) => {
                  if (selectedCategory === "all") return true;
                  return story.category === selectedCategory;
                })
                .filter((story) =>
                  story.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((story, index) => (
                  <DashboardCard key={index}>
                    <button
                      onClick={() => {
                        setSelectedStory(story);
                        setShowDialog(true);
                      }}
                      className="w-full p-6 rounded-xl transition-all duration-300 hover:bg-[#FFE4E1]"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] flex items-center justify-center text-4xl">
                          {story.emoji}
                        </div>
                        <div className="text-center">
                          <h3 className="text-[#FF62A5] font-bold text-xl mb-2">
                            {story.title}
                          </h3>
                          <p className="text-[#FF9A8C] text-lg">
                            {story.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  </DashboardCard>
                ))}
            </div>

            {showDialog && selectedStory && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] flex items-center justify-center text-3xl">
                      {selectedStory.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-[#FF62A5]">
                      {selectedStory.title}
                    </h3>
                  </div>
                  <div className="relative">
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#FFE4E1] flex items-center justify-center text-xl font-bold text-[#FF62A5]">
                          {currentStep + 1}
                        </div>
                        <h4 className="text-xl font-bold text-[#FF62A5]">
                          {selectedStory.steps[currentStep].title}
                        </h4>
                      </div>
                      <div className="ml-16">
                        <p className="text-[#FF9A8C] text-lg mb-4">
                          {selectedStory.steps[currentStep].description}
                        </p>
                        <div className="bg-[#FFE4E1] p-4 rounded-xl">
                          <p className="text-[#FF62A5] font-bold mb-2">
                            Helpful Tips:
                          </p>
                          <ul className="list-disc list-inside text-[#FF9A8C]">
                            {selectedStory.steps[currentStep].tips.map(
                              (tip, tipIndex) => (
                                <li key={tipIndex}>{tip}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={() =>
                        setCurrentStep(Math.max(0, currentStep - 1))
                      }
                      className={`px-6 py-2 rounded-full ${
                        currentStep === 0
                          ? "bg-[#FFE4E1] text-[#FF9A8C] cursor-not-allowed"
                          : "bg-[#FFE4E1] text-[#FF62A5] hover:bg-[#FFD1DC]"
                      } transition-colors`}
                      disabled={currentStep === 0}
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Previous
                    </button>
                    {currentStep < selectedStory.steps.length - 1 ? (
                      <button
                        onClick={() =>
                          setCurrentStep(
                            Math.min(
                              selectedStory.steps.length - 1,
                              currentStep + 1
                            )
                          )
                        }
                        className="px-6 py-2 rounded-full bg-[#FF62A5] text-white hover:bg-[#FF4D94] transition-colors"
                      >
                        Next
                        <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowDialog(false);
                          setSelectedStory(null);
                          setCurrentStep(0);
                        }}
                        className="px-6 py-2 rounded-full bg-[#FF62A5] text-white hover:bg-[#FF4D94] transition-colors"
                      >
                        I Understand! 🌟
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "daily-schedule":
        return (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/de5c358e-16a8-43cc-9935-f722898cbbe8/-/format/auto/"
                      alt="Child wearing headphones at an event"
                      className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
                      <i className="fas fa-calendar-day text-2xl text-[#FF62A5]"></i>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Daily Schedule 📅
                    </h2>
                    <p className="text-white text-2xl mb-4">
                      Let's have an amazing day together! 🌟
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  id: 1,
                  time: "8:00 AM",
                  activity: "Wake Up & Get Ready 🌅",
                  completed: false,
                },
                {
                  id: 2,
                  time: "9:00 AM",
                  activity: "Breakfast Time 🥣",
                  completed: false,
                },
                {
                  id: 3,
                  time: "10:00 AM",
                  activity: "Learning Time 📚",
                  completed: false,
                },
                {
                  id: 4,
                  time: "12:00 PM",
                  activity: "Lunch Break 🍎",
                  completed: false,
                },
                {
                  id: 5,
                  time: "2:00 PM",
                  activity: "Creative Play 🎨",
                  completed: false,
                },
                {
                  id: 6,
                  time: "4:00 PM",
                  activity: "Outdoor Time 🌳",
                  completed: false,
                },
                {
                  id: 7,
                  time: "6:00 PM",
                  activity: "Dinner Time 🍽️",
                  completed: false,
                },
                {
                  id: 8,
                  time: "8:00 PM",
                  activity: "Bedtime Routine 🌙",
                  completed: false,
                },
              ].map((activity) => (
                <DashboardCard key={activity.id}>
                  <div className="flex items-center justify-between gap-4 p-2">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-full ${
                          completedTools.includes(activity.activity)
                            ? "bg-[#98FB98]"
                            : "bg-gradient-to-br from-[#FFE162] to-[#FF9A8C]"
                        } flex items-center justify-center transition-all duration-300`}
                      >
                        <span className="text-2xl">
                          {completedTools.includes(activity.activity)
                            ? "✓"
                            : "⏰"}
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
      case "homework":
        return (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/6c5af2a2-157d-4ba4-b47e-beec9b05213a/-/format/auto/"
                      alt="Child doing homework"
                      className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
                      <i className="fas fa-book text-2xl text-[#FF62A5]"></i>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      My Homework 📚
                    </h2>
                    <p className="text-white text-2xl mb-4">
                      Let's complete our assignments! ✏️
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DashboardCard>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-book text-[#FF62A5] text-xl"></i>
                  <span className="text-[#FF62A5] font-bold text-lg">
                    Today's Homework
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-[#FF9A8C] text-lg mb-2">
                      {homework.title}
                    </p>
                    <span className="text-[#FF9A8C]">
                      Due: {homework.dueDate}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setHomework({
                        ...homework,
                        completed: !homework.completed,
                      })
                    }
                    className={`px-6 py-3 rounded-full ${
                      homework.completed
                        ? "bg-[#98FB98] text-[#3CB371]"
                        : "bg-[#FFE4E1] text-[#FF62A5]"
                    } hover:opacity-80 transition-all duration-300`}
                  >
                    {homework.completed ? "Done! 🎉" : "Mark Done"}
                  </button>
                </div>
              </div>
            </DashboardCard>
          </div>
        );
      case "communication":
        return (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/056adbc0-2f2f-4ba3-8583-6634706306d6/-/format/auto/"
                      alt="Child wearing headphones at an event"
                      className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
                      <i className="fas fa-comments text-2xl text-[#FF62A5]"></i>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Communication Hub 💌
                    </h2>
                    <p className="text-white text-2xl mb-4">
                      Share your thoughts and feelings! 🌟
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setActiveTab("parent")}
                className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${
                  activeTab === "parent"
                    ? "bg-[#FF62A5] text-white"
                    : "bg-[#FFE4E1] text-[#FF62A5]"
                }`}
              >
                Talk to Parent
              </button>
              <button
                onClick={() => setActiveTab("teacher")}
                className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${
                  activeTab === "teacher"
                    ? "bg-[#FF62A5] text-white"
                    : "bg-[#FFE4E1] text-[#FF62A5]"
                }`}
              >
                Talk to Teacher
              </button>
            </div>

            {activeTab === "parent" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCard>
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {["😊", "😢", "😠", "😰", "🤗", "😴", "🎮", "📚"].map(
                        (emoji) => (
                          <button
                            key={emoji}
                            onClick={() =>
                              setSelectedEmojis([...selectedEmojis, emoji])
                            }
                            className="text-3xl hover:scale-125 transition-transform p-2 bg-[#FFF5F7] rounded-xl"
                          >
                            {emoji}
                          </button>
                        )
                      )}
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-4 border-2 border-[#FFE162] rounded-xl mb-4 h-32 focus:outline-none focus:border-[#FF62A5]"
                      placeholder="Write your message here..."
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (message.trim()) {
                            setMessageHistory([...messageHistory, message]);
                            setMessage("");
                            setSelectedEmojis([]);
                          }
                        }}
                        className="px-6 py-3 rounded-full bg-[#FF62A5] text-white hover:bg-[#FF4D94] transition-colors"
                      >
                        Send to Parent 💌
                      </button>
                    </div>
                  </div>
                </DashboardCard>

                <div className="space-y-4">
                  <DashboardCard>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#FF62A5] mb-4">
                        Messages from Parent
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            message: "Have a great day at school sweetie! 🌟",
                            time: "8:30 AM",
                          },
                          {
                            message:
                              "Remember to use your calm down tools if needed 💫",
                            time: "9:15 AM",
                          },
                          {
                            message: "I'm so proud of you! 💝",
                            time: "12:00 PM",
                          },
                        ].map((msg, index) => (
                          <div
                            key={index}
                            className="bg-[#FFF5F7] p-4 rounded-xl"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#FF62A5] font-bold">
                                Parent
                              </span>
                              <span className="text-[#FF9A8C] text-sm">
                                {msg.time}
                              </span>
                            </div>
                            <p className="text-[#FF9A8C] mb-2">{msg.message}</p>
                            <button
                              onClick={() => {
                                setMessage(`Replying to: "${msg.message}"\n\n`);
                              }}
                              className="text-[#FF62A5] text-sm hover:text-[#FF4D94] transition-colors"
                            >
                              <i className="fas fa-reply mr-1"></i> Reply
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DashboardCard>

                  <DashboardCard>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#FF62A5] mb-4">
                        My Feelings History
                      </h3>
                      <div className="space-y-4">
                        {messageHistory.map((msg) => (
                          <div
                            key={msg.id}
                            className="bg-[#FFF5F7] p-4 rounded-xl"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#FF62A5] font-bold">
                                Me
                              </span>
                              <span className="text-[#FF9A8C] text-sm">
                                {msg.timestamp}
                              </span>
                            </div>
                            <p className="text-[#FF9A8C]">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DashboardCard>
                </div>
              </div>
            )}

            {activeTab === "teacher" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCard>
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {[
                        "😊",
                        "😢",
                        "😠",
                        "😰",
                        "🤗",
                        "😴",
                        "🤔",
                        "🙋‍♂️",
                        "📚",
                        "❓",
                        "🎨",
                        "🏃",
                        "🎮",
                        "🌟",
                        "💡",
                        "✏️",
                      ].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() =>
                            setSelectedEmojis([...selectedEmojis, emoji])
                          }
                          className="text-3xl hover:scale-125 transition-transform p-2 bg-[#FFF5F7] rounded-xl"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-4 border-2 border-[#FFE162] rounded-xl mb-4 h-32 focus:outline-none focus:border-[#FF62A5]"
                      placeholder="Ask your teacher a question..."
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (message.trim()) {
                            setMessageHistory([...messageHistory, message]);
                            setMessage("");
                            setSelectedEmojis([]);
                          }
                        }}
                        className="px-6 py-3 rounded-full bg-[#FF62A5] text-white hover:bg-[#FF4D94] transition-colors"
                      >
                        Send to Teacher 📚
                      </button>
                    </div>
                  </div>
                </DashboardCard>

                <div className="space-y-4">
                  <DashboardCard>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#FF62A5] mb-4">
                        Messages from Teacher
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            message: "Great job on your math homework! 🌟",
                            time: "10:30 AM",
                          },
                          {
                            message:
                              "Remember to raise your hand if you need help 🤚",
                            time: "11:15 AM",
                          },
                          {
                            message: "You're doing amazing in art class! 🎨",
                            time: "2:00 PM",
                          },
                        ].map((msg, index) => (
                          <div
                            key={index}
                            className="bg-[#FFF5F7] p-4 rounded-xl"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#FF62A5] font-bold">
                                Teacher
                              </span>
                              <span className="text-[#FF9A8C] text-sm">
                                {msg.time}
                              </span>
                            </div>
                            <p className="text-[#FF9A8C] mb-2">{msg.message}</p>
                            <button
                              onClick={() => {
                                setMessage(`Replying to: "${msg.message}"\n\n`);
                              }}
                              className="text-[#FF62A5] text-sm hover:text-[#FF4D94] transition-colors"
                            >
                              <i className="fas fa-reply mr-1"></i> Reply
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DashboardCard>

                  <DashboardCard>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#FF62A5] mb-4">
                        My Questions History
                      </h3>
                      <div className="space-y-4">
                        {messageHistory.map((msg) => (
                          <div
                            key={msg.id}
                            className="bg-[#FFF5F7] p-4 rounded-xl"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[#FF62A5] font-bold">
                                Me
                              </span>
                              <span className="text-[#FF9A8C] text-sm">
                                {msg.timestamp}
                              </span>
                            </div>
                            <p className="text-[#FF9A8C]">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DashboardCard>
                </div>
              </div>
            )}
          </div>
        );
      case "sensory-activities":
        return (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/6c5af2a2-157d-4ba4-b47e-beec9b05213a/-/format/auto/"
                      alt="Child wearing headphones at an event"
                      className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
                      <i className="fas fa-star text-2xl text-[#FF62A5]"></i>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Sensory Activities ✨
                    </h2>
                    <p className="text-white text-2xl mb-4">
                      Let's explore with our senses! 🌈
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sensoryActivities.map((activity, index) => (
                <DashboardCard key={index}>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] flex items-center justify-center">
                        <i
                          className={`fas ${activity.icon} text-2xl text-white`}
                        ></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#FF62A5]">
                          {activity.title}
                        </h3>
                        <p className="text-[#FF9A8C]">{activity.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDialog(activity)}
                      className="w-full px-4 py-2 rounded-full bg-[#FFE4E1] text-[#FF62A5] hover:bg-[#FFD1DC] transition-colors"
                    >
                      View Instructions
                    </button>
                    <button
                      onClick={() => toggleActivity(activity.title)}
                      className={`w-full px-4 py-2 rounded-full ${
                        completedTools.includes(activity.title)
                          ? "bg-[#98FB98] text-[#3CB371]"
                          : "bg-[#FFE4E1] text-[#FF62A5]"
                      } hover:opacity-80 transition-all duration-300`}
                    >
                      {completedTools.includes(activity.title)
                        ? "Done! 🎉"
                        : `Mark Done (+${activity.stars} ⭐)`}
                    </button>
                  </div>
                </DashboardCard>
              ))}
            </div>

            {showDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl">
                  <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">
                    {showDialog.title}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[#FF62A5] font-bold">Instructions:</p>
                      <p className="text-[#FF9A8C]">
                        {showDialog.instructions}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#FF62A5] font-bold">Duration:</p>
                      <p className="text-[#FF9A8C]">{showDialog.duration}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setShowDialog(null)}
                      className="px-6 py-2 rounded-full bg-[#FF62A5] text-white hover:bg-[#FF4D94] transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "my-stars":
        return (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/59ba6857-1c09-46c8-8eef-635e84979003/-/format/auto/"
                      alt="Child wearing headphones at an event"
                      className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
                      <i className="fas fa-star text-2xl text-[#FF62A5]"></i>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      My Rewards 🌟
                    </h2>
                    <p className="text-white text-2xl mb-4">
                      Keep earning stars for awesome prizes! ✨
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-[#FF62A5]">
                      My Star Collection ⭐
                    </h3>
                    <button
                      onClick={() => setStars(0)}
                      className="px-4 py-2 rounded-full bg-[#FFE4E1] text-[#FF62A5] hover:bg-[#FFD1DC] transition-colors"
                    >
                      Reset Stars
                    </button>
                  </div>
                  <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 overflow-hidden">
                    {Array.from({ length: stars }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-full pt-[100%] relative bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] rounded-full transform hover:scale-110 transition-all cursor-pointer ${
                          index % 2 === 0 ? "translate-y-2" : ""
                        }`}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-2xl">
                          ⭐
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#FFE4E1] p-4 rounded-xl overflow-hidden">
                    <p className="text-[#FF62A5] text-lg">
                      Total Stars: {stars} 🌟
                    </p>
                    <div className="w-full h-2 bg-white rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-[#FF62A5] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((stars / 20) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-[#FF9A8C] mt-2">
                      {20 - stars} more stars until next reward! 🎉
                    </p>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-[#FF62A5]">
                    Available Rewards 🎁
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: "Extra Screen Time", stars: 5, emoji: "🎮" },
                      { name: "Special Snack", stars: 10, emoji: "🍪" },
                      { name: "Movie Night", stars: 15, emoji: "🎬" },
                      {
                        name: "Choose Weekend Activity",
                        stars: 20,
                        emoji: "🎨",
                      },
                    ].map((reward, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl flex items-center justify-between ${
                          stars >= reward.stars
                            ? "bg-[#98FB98]"
                            : "bg-[#FFE4E1]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{reward.emoji}</span>
                          <div>
                            <p className="font-bold text-[#FF62A5]">
                              {reward.name}
                            </p>
                            <p className="text-[#FF9A8C]">
                              {reward.stars} stars needed
                            </p>
                          </div>
                        </div>
                        {stars >= reward.stars && (
                          <span className="text-[#3CB371]">Unlocked! 🎉</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardCard>
            </div>

            <DashboardCard>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-[#FF62A5]">
                  Earn Stars! 🌟
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Complete Homework", stars: 2, emoji: "📚" },
                    { name: "Clean Room", stars: 2, emoji: "🧹" },
                    { name: "Help with Chores", stars: 3, emoji: "🧺" },
                    { name: "Practice Reading", stars: 2, emoji: "📖" },
                    { name: "Exercise Time", stars: 2, emoji: "🏃" },
                    { name: "Kind to Siblings", stars: 3, emoji: "💝" },
                    { name: "Brush Teeth", stars: 1, emoji: "🦷" },
                    { name: "Make Bed", stars: 1, emoji: "🛏️" },
                    { name: "Eat Vegetables", stars: 2, emoji: "🥕" },
                  ].map((activity, index) => (
                    <button
                      key={index}
                      onClick={() => setStars(stars + activity.stars)}
                      className="p-4 rounded-xl bg-[#FFE4E1] hover:bg-[#FFD1DC] transition-all flex flex-col items-center gap-2"
                    >
                      <span className="text-3xl">{activity.emoji}</span>
                      <p className="font-bold text-[#FF62A5]">
                        {activity.name}
                      </p>
                      <p className="text-[#FF9A8C]">+{activity.stars} stars</p>
                    </button>
                  ))}
                </div>
              </div>
            </DashboardCard>
          </div>
        );
      case "home":
        return (
          <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="bg-gradient-to-r from-[#FFE162] via-[#FF9A8C] to-[#FF62A5] rounded-2xl shadow-lg w-full border-4 border-[#FFA7D1]">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8 flex-grow">
                  <div className="relative">
                    <img
                      src="https://ucarecdn.com/6c5af2a2-157d-4ba4-b47e-beec9b05213a/-/format/auto/"
                      alt="Child wearing headphones at an event"
                      className="w-36 h-36 rounded-full object-cover border-4 border-[#FFE162] shadow-lg transform hover:scale-105 transition-transform"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#FFE162] rounded-full p-2 shadow-lg animate-bounce">
                      <i className="fas fa-crown text-2xl text-[#FF62A5]"></i>
                    </div>
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      Hi Teddy! 🌟
                    </h2>
                    <p className="text-white text-2xl mb-4">
                      Woohoo! Time for some fun activities! 🎨 Let's make today
                      super special! 🌈
                    </p>
                    <div className="flex items-center gap-3 bg-white/90 p-4 rounded-xl shadow-md backdrop-blur-sm">
                      <i className="fas fa-star text-[#FFE162] text-3xl animate-pulse"></i>
                      <div className="flex flex-col">
                        <span className="text-[#FF62A5] font-bold text-2xl">
                          {stars} Stars Collected! 🎉
                        </span>
                        <span className="text-[#FF9A8C] text-lg">
                          Keep going superstar! ⭐
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">
                    Today's Schedule
                  </h3>
                  <div className="space-y-4">
                    {[
                      { time: "8:00 AM", activity: "Wake Up & Get Ready 🌅" },
                      { time: "9:00 AM", activity: "Breakfast Time 🥣" },
                      { time: "10:00 AM", activity: "Learning Time 📚" },
                      { time: "12:00 PM", activity: "Lunch Break 🍎" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#FFE4E1] flex items-center justify-center">
                            <span className="text-xl">⏰</span>
                          </div>
                          <div>
                            <p className="text-[#FF62A5] font-bold">
                              {item.time}
                            </p>
                            <p className="text-[#FF9A8C]">{item.activity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">
                    Star Progress
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {Array.from({ length: Math.min(stars, 10) }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 bg-gradient-to-br from-[#FFE162] to-[#FF9A8C] rounded-full flex items-center justify-center"
                        >
                          <span className="text-2xl">⭐</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className="bg-[#FFE4E1] p-4 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <span className="text-[#FF62A5]">
                        Progress to next reward
                      </span>
                      <span className="text-[#FF62A5]">{stars}/20 stars</span>
                    </div>
                    <div className="w-full h-2 bg-white rounded-full">
                      <div
                        className="h-full bg-[#FF62A5] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((stars / 20) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">
                    Today's Homework
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#FF9A8C] text-lg mb-2">
                        {homework.title}
                      </p>
                      <span className="text-[#FF9A8C]">
                        Due: {homework.dueDate}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setHomework({
                          ...homework,
                          completed: !homework.completed,
                        })
                      }
                      className={`px-6 py-3 rounded-full ${
                        homework.completed
                          ? "bg-[#98FB98] text-[#3CB371]"
                          : "bg-[#FFE4E1] text-[#FF62A5]"
                      } hover:opacity-80 transition-all duration-300`}
                    >
                      {homework.completed ? "Done! 🎉" : "Mark Done"}
                    </button>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#FF62A5] mb-4">
                    Recent Messages
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        from: "Parent",
                        message: "Have a great day sweetie! 🌟",
                        time: "8:30 AM",
                      },
                      {
                        from: "Teacher",
                        message: "Great job in class today! 📚",
                        time: "2:15 PM",
                      },
                    ].map((msg, index) => (
                      <div key={index} className="bg-[#FFF5F7] p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[#FF62A5] font-bold">
                            {msg.from}
                          </span>
                          <span className="text-[#FF9A8C] text-sm">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-[#FF9A8C]">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardCard>
            </div>
          </main>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const updateStars = async () => {
      const totalStars = completedTools.length;
      try {
        await fetch("/api/db/autismapp", {
          method: "POST",
          body: JSON.stringify({
            query: "UPDATE `user_data` SET stars = ? WHERE id = ?",
            values: [totalStars, "teddy"],
          }),
        });
        setStars(totalStars);
      } catch (error) {
        console.error("Error updating stars:", error);
      }
    };
    updateStars();
  }, [completedTools]);

  return (
    <div className="flex h-screen w-full bg-[#F0FBFF] font-roboto overflow-hidden">
      <div
        className={`fixed md:relative md:flex z-50 ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
        onClick={() => setIsOpen(false)}
      >
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
            {cards.map((item) => (
              <button
                key={item.module}
                onClick={() => setActiveModule(item.module)}
                className={`flex items-center gap-4 p-4 hover:bg-[#FFE4E1] rounded-2xl transition-all duration-300 w-full group hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 ${
                  activeModule === item.module ? "bg-[#FFE4E1]" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <span className="text-2xl group-hover:animate-bounce">
                    {item.module === "home" && "🏠"}
                    {item.module === "daily-schedule" && "📅"}
                    {item.module === "emotion-tools" && "😊"}
                    {item.module === "social-stories" && "📚"}
                    {item.module === "communication" && "💌"}
                    {item.module === "sensory-activities" && "🌈"}
                    {item.module === "my-stars" && "⭐"}
                    {item.module === "homework" && "📝"}
                  </span>
                </div>
                <span className="font-roboto font-medium text-lg group-hover:font-bold text-[#FF62A5]">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
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

        .DashboardCard {
          animation: fadeIn 0.5s ease-out;
        }

        .DashboardCard:hover {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
