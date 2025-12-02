import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import API from "../api/api";

const socket = io("http://localhost:3000"); // Assuming backend socket server

export default function Chat({ userId, otherUserId, listingId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Join room
    socket.emit("joinRoom", { userId, otherUserId, listingId });

    // Load previous messages
    API.get(`/messages/${listingId}/${userId}/${otherUserId}`)
      .then((r) => setMessages(r.data))
      .catch(() => {});

    // Listen for new messages
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [userId, otherUserId, listingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const msg = { from: userId, to: otherUserId, listingId, text: message };
      socket.emit("sendMessage", msg);
      setMessage("");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 10,
        height: 300,
        overflowY: "auto",
      }}
    >
      <div>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 5 }}>
            <strong>{msg.from === userId ? "You" : "Seller"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1 }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
