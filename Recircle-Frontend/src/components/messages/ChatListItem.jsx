import "./ChatListItem.css";

export default function ChatListItem({ chat, active, onClick }) {
  return (
    <div
      className={`chat-list-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="chat-avatar">
        <i className="fa-solid fa-circle-user"></i>
      </div>

      <div className="chat-info">
        <div className="chat-name">{chat.otherUserName}</div>

        <div className="chat-last-message">
          {chat.lastMessage || "No messages yet"}
        </div>
      </div>
    </div>
  );
}