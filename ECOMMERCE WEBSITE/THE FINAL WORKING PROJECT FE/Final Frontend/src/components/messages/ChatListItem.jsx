export default function ChatListItem({ chat, active, onClick }) {
  const avatar = chat.otherUserAvatar
    ? chat.otherUserAvatar.startsWith("/uploads")
      ? `http://localhost:8080${chat.otherUserAvatar}`
      : chat.otherUserAvatar
    : "/profile.png";

  return (
    <div
      className={`chat-list-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {/* AVATAR */}
      <img src={avatar} alt="user" className="chat-list-avatar" />

      {/* INFO */}
      <div className="chat-info">
        <p className="chat-name">{chat.otherUserName}</p>
        <p className="chat-last">{chat.title}</p>
      </div>

      {/* RED DOT */}
      {chat.unread && <span className="red-dot"></span>}
    </div>
  );
}
