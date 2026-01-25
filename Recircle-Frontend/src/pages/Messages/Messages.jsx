import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ChatListItem from "../../components/messages/ChatListItem";
import ChatBubble from "../../components/messages/ChatBubble";
import { getChatMessages, sendChatMessage } from "../../Service/chatService";

import "./Messages.css";

export default function Messages() {
  const location = useLocation();

  // passed from ProductDetail
  const chatRoomId = location.state?.chatRoomId || 1;
  const sellerName = location.state?.seller || "Seller";

  const loggedInUserId = 101; // 🔴 replace with auth user id

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // ✅ Load messages
  useEffect(() => {
    getChatMessages(chatRoomId)
      .then(setMessages)
      .catch(console.error);
  }, [chatRoomId]);

  // ✅ Send message
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const payload = {
      chatRoomId,
      senderExternalUserId: loggedInUserId,
      message: newMessage,
    };

    try {
      const savedMessage = await sendChatMessage(payload);
      setMessages((prev) => [...prev, savedMessage]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-root">
      {/* LEFT SIDE (chat list placeholder) */}
      <div className="chat-sidebar">
        <ChatListItem
          chat={{ name: sellerName }}
          active={true}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="chat-main">
        {/* HEADER */}
        <div className="chat-top">
          <i className="fa-solid fa-circle-user avatar"></i>
          <span>{sellerName}</span>
        </div>

        {/* MESSAGES */}
        <div className="chat-body">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.messageId}
              message={{
                from:
                  msg.senderExternalUserId === loggedInUserId
                    ? "me"
                    : "other",
                text: msg.message,
                time: new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }}
            />
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