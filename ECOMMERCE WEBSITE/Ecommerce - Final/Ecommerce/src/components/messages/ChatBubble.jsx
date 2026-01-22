/**
 * ChatBubble.jsx
 * Represents a single message bubble
 * "me" → right side
 * "them" → left side
 */

export default function ChatBubble({ message }) {
  return (
    <div className={`message ${message.from === "me" ? "sent" : "received"}`}>
      <p>{message.text}</p>
      <span>{message.time}</span>
    </div>
  );
}
