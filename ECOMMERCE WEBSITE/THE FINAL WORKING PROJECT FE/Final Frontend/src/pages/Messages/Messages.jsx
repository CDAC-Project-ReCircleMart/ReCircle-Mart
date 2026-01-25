import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

import ChatListItem from "../../components/messages/ChatListItem";
import ChatBubble from "../../components/messages/ChatBubble";

import "./Messages.css";

const socket = io("http://localhost:8080");

export default function Messages() {
  const location = useLocation();
  const chatFromProduct = location.state?.chatId;

  const user = JSON.parse(localStorage.getItem("user"));

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // 🔴 JOIN SOCKET WHEN PAGE LOADS
  useEffect(() => {
    if (user) {
      socket.emit("join", user.id);
    }
  }, [user]);

  // 🔴 FETCH ALL CHATS
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get("/chats");
        setChats(res.data);

        if (chatFromProduct) {
          const found = res.data.find((c) => c.id === chatFromProduct);
          if (found) setActiveChat(found);
        } else if (res.data.length > 0) {
          setActiveChat(res.data[0]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load chats");
      }
    };

    fetchChats();
  }, [chatFromProduct]);

  // 🔴 FETCH MESSAGES WHEN CHAT CHANGES
  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chats/${activeChat.id}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load messages");
      }
    };

    fetchMessages();
  }, [activeChat]);

  // 🔥 RECEIVE REALTIME MESSAGE
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      if (activeChat && msg.chat_id === activeChat.id) {
        setMessages((prev) => [...prev, msg]);
      } else {
        // 🔴 MARK CHAT AS UNREAD
        setChats((prev) =>
          prev.map((c) => (c.id === msg.chat_id ? { ...c, unread: true } : c)),
        );
      }
    });

    return () => socket.off("newMessage");
  }, [activeChat]);

  // 🔴 SEND MESSAGE
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const res = await api.post("/chats/send", {
        chatId: activeChat.id,
        message: newMessage, // 🔥 BACKEND EXPECTS "message"
      });

      // ADD TO UI
      setMessages((prev) => [...prev, res.data]);

      // 🔥 SEND REALTIME TO OTHER USER
      socket.emit("sendMessage", {
        receiverId: activeChat.otherUser.id,
        message: res.data,
      });

      setNewMessage("");
    } catch (err) {
      console.error("SEND MESSAGE ERROR:", err.response?.data || err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="chat-root">
      {/* LEFT SIDEBAR */}
      <div className="chat-sidebar">
        {chats.length === 0 ? (
          <p style={{ padding: "10px" }}>No chats yet</p>
        ) : (
          chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              active={activeChat?.id === chat.id}
              onClick={() => {
                setActiveChat(chat);
                setChats((prev) =>
                  prev.map((c) =>
                    c.id === chat.id ? { ...c, unread: false } : c,
                  ),
                );
              }}
            />
          ))
        )}
      </div>

      {/* RIGHT CHAT WINDOW */}
      <div className="chat-main">
        {!activeChat ? (
          <div style={{ padding: "20px" }}>Select a chat</div>
        ) : (
          <>
            {/* HEADER */}
            <div className="chat-top">
              <div className="chat-user">
                <img
                  src={
                    activeChat.otherUser.avatar
                      ? activeChat.otherUser.avatar.startsWith("/uploads")
                        ? `http://localhost:8080${activeChat.otherUser.avatar}`
                        : activeChat.otherUser.avatar
                      : "/profile.png"
                  }
                  alt="user"
                  className="chat-avatar"
                />
                <span className="chat-username">
                  {activeChat.otherUser.name}
                </span>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="chat-body">
              {messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  message={{
                    from: msg.sender_id === user.id ? "me" : "other",
                    text: msg.message,
                    time: new Date(msg.created_at).toLocaleTimeString([], {
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
          </>
        )}
      </div>
    </div>
  );
}
