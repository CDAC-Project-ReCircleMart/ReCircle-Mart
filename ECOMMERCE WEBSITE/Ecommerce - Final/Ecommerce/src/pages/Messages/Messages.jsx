/**
 * Messages.jsx
 * ----------------------------------------------------
 * Purpose:
 * - Shows OLX / WhatsApp style chat screen
 * - Navbar on top
 * - Left side: list of all chats
 * - Right side: selected chat messages
 * - Bottom: type message & send button
 *
 * Notes:
 * - UI only (no backend yet)
 * - Messages come from static data file
 * - Backend integration will replace data later
 */

import { useState } from "react";

// Navbar (top)
import Navbar from "../../components/navbar/Navbar";

// Chat components
import ChatListItem from "../../components/messages/ChatListItem";
import ChatBubble from "../../components/messages/ChatBubble";

// Temporary data (will be replaced by API later)
import { chats as chatData } from "../../data/messagesData";

// Styles
import "../../components/messages/Messages.css";

export default function Messages() {
  // Currently selected chat (default = first chat)
  const [activeChat, setActiveChat] = useState(chatData[0]);

  // Text typed in message input box
  const [newMessage, setNewMessage] = useState("");

  /**
   * Handles sending a new message
   * - Adds message to current chat (UI only)
   * - Clears input field
   */
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
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MESSAGES PAGE ================= */}
      <div className="container-fluid messages-page">
        <div className="row h-100">
          {/* -------- LEFT PANEL : CHAT LIST -------- */}
          <div className="col-12 col-md-4 chat-list">
            {chatData.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                active={chat.id === activeChat.id}
                onClick={() => setActiveChat(chat)}
              />
            ))}
          </div>

          {/* -------- RIGHT PANEL : CHAT WINDOW -------- */}
          <div className="col-12 col-md-8 chat-window">
            {/* Chat Header */}
            <div className="chat-header">
              <img src={activeChat.avatar} alt={activeChat.name} />
              <span>{activeChat.name}</span>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
              {activeChat.messages.map((msg, index) => (
                <ChatBubble key={index} message={msg} />
              ))}
            </div>

            {/* Message Input */}
            <div className="chat-input">
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
      </div>
    </>
  );
}
