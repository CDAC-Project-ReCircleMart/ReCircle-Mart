/**
 * ChatListItem.jsx
 * Single chat row shown on the left side
 * Displays profile image, name, last message & unread count
 */

export default function ChatListItem({ chat, active, onClick }) {
  return (
    <div className={`chat-item ${active ? "active" : ""}`} onClick={onClick}>
      {/* Profile Image */}
      <img src={chat.avatar} alt={chat.name} />

      {/* Chat Info */}
      <div className="chat-info">
        <div className="chat-name">{chat.name}</div>
        <div className="chat-last">
          {chat.messages[chat.messages.length - 1].text}
        </div>
      </div>

      {/* Unread Badge */}
      {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
    </div>
  );
}
