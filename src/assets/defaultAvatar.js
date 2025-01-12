export const defaultAvatar = `data:image/svg+xml,${encodeURIComponent(`
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="#FFE162"/>
  <circle cx="100" cy="80" r="40" fill="#FF62A5"/>
  <path d="M160 160C160 126.863 133.137 100 100 100C66.8629 100 40 126.863 40 160" stroke="#FF62A5" stroke-width="20"/>
</svg>
`)}`;

export const mockData = {
  scheduleItems: [
    { id: 1, title: "Wake Up & Get Ready", time_scheduled: "8:00 AM", emoji: "🌅" },
    { id: 2, title: "Breakfast Time", time_scheduled: "9:00 AM", emoji: "🥣" },
    { id: 3, title: "Learning Time", time_scheduled: "10:00 AM", emoji: "📚" },
    { id: 4, title: "Lunch Break", time_scheduled: "12:00 PM", emoji: "🍎" }
  ],
  messages: [
    { id: 1, from_type: "Parent", content: "Have a great day sweetie! 🌟", created_at: new Date().toISOString() },
    { id: 2, from_type: "Teacher", content: "Great job in class today! 📚", created_at: new Date().toISOString() }
  ]
};
