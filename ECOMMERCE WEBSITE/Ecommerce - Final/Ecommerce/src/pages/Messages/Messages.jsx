import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ChatListItem from "../../components/messages/ChatListItem";
import ChatBubble from "../../components/messages/ChatBubble";
import { chats as chatData } from "../../data/messagesData";

import "./Messages.css"; // NEW CSS FILE

export default function Messages() {
  const location = useLocation();
  const sellerFromProduct = location.state?.seller;

  const initialChat =
    chatData.find((c) => c.name === sellerFromProduct) || chatData[0];

  const [activeChat, setActiveChat] = useState(initialChat);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (sellerFromProduct) {
      const chat = chatData.find((c) => c.name === sellerFromProduct);
      if (chat) setActiveChat(chat);
    }
  }, [sellerFromProduct]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const updatedChat = {
      ...activeChat,
      messages: [
        ...activeChat.messages,
        {
          from: "me",
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    };

    setActiveChat(updatedChat);
    setNewMessage("");
  };

  return (
    <div className="chat-root">
      {/* LEFT PANEL */}
      <div className="chat-sidebar">
        {chatData.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            active={chat.id === activeChat.id}
            onClick={() => setActiveChat(chat)}
          />
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="chat-main">
        {/* HEADER */}
        <div className="chat-top">
          <i className="fa-solid fa-circle-user avatar"></i>
          <span>{activeChat.name}</span>
        </div>

        {/* MESSAGES */}
        <div className="chat-body">
          {activeChat.messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
        </div>

        {/* INPUT */}
        <div className="chat-bottom">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button onClick={handleSend}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
