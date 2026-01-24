import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

import ChatListItem from "../../components/messages/ChatListItem";
import ChatBubble from "../../components/messages/ChatBubble";

import "./Messages.css";

export default function Messages() {
  const location = useLocation();
  const chatFromProduct = location.state?.chatId; // 🔴 FROM PRODUCT DETAIL

  const [chats, setChats] = useState([]); // all user chats
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔴 FETCH ALL USER CHATS
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get("/chats"); // backend: get all chats of user
        setChats(res.data);

        // 🔴 IF COMING FROM PRODUCT PAGE → OPEN THAT CHAT
        if (chatFromProduct) {
          const found = res.data.find((c) => c.id === chatFromProduct);
          if (found) {
            setActiveChat(found);
          } else if (res.data.length > 0) {
            setActiveChat(res.data[0]);
          }
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
      setLoading(true);
      try {
        const res = await api.get(`/chats/${activeChat.id}/messages`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [activeChat]);

  // 🔴 SEND MESSAGE
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const res = await api.post(`/chats/${activeChat.id}/messages`, {
        text: newMessage,
      });

      // 🔴 ADD MESSAGE LOCALLY
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="chat-root">
      {/* LEFT PANEL – CHAT LIST */}
      <div className="chat-sidebar">
        {chats.length === 0 ? (
          <p style={{ padding: "10px" }}>No chats yet</p>
        ) : (
          chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              active={activeChat?.id === chat.id}
              onClick={() => setActiveChat(chat)}
            />
          ))
        )}
      </div>

      {/* RIGHT PANEL – CHAT WINDOW */}
      <div className="chat-main">
        {!activeChat ? (
          <div style={{ padding: "20px" }}>Select a chat</div>
        ) : (
          <>
            {/* HEADER */}
            <div className="chat-top">
              <i className="fa-solid fa-circle-user avatar"></i>
              <span>
                {activeChat.otherUser?.name ||
                  activeChat.seller?.name ||
                  "User"}
              </span>
            </div>

            {/* MESSAGES */}
            <div className="chat-body">
              {loading ? (
                <p>Loading...</p>
              ) : messages.length === 0 ? (
                <p style={{ textAlign: "center" }}>No messages yet</p>
              ) : (
                messages.map((msg, index) => (
                  <ChatBubble
                    key={index}
                    message={{
                      from: msg.sender === "ME" ? "me" : "other",
                      text: msg.text,
                      time: new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    }}
                  />
                ))
              )}
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
