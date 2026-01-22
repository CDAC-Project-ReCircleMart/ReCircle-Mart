/**
 * messagesData.js
 * Temporary static data for chat UI
 * Later this will come from backend (MySQL / API)
 */

export const chats = [
  {
    id: 1,
    name: "Krishna Enterprises",
    avatar: "https://i.pravatar.cc/100?img=5",
    unread: 1,
    messages: [
      {
        from: "them",
        text: "Honda City available. Visit today.",
        time: "6:45 PM",
      },
    ],
  },
  {
    id: 2,
    name: "Krishna Enterprises",
    avatar: "https://i.pravatar.cc/100?img=5",
    unread: 1,
    messages: [
      {
        from: "them",
        text: "Honda City available. Visit today.",
        time: "6:45 PM",
      },
    ],
  },
  {
    id: 3,
    name: "Aditi Sharma",
    avatar: "https://i.pravatar.cc/100?img=1",
    unread: 0,
    messages: [
      {
        from: "them",
        text: "Is the bike still available?",
        time: "Yesterday",
      },
      {
        from: "me",
        text: "Yes, it is.",
        time: "Yesterday",
      },
    ],
  },
];
