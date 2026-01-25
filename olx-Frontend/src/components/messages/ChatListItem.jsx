export default function ChatListItem({ chat, active, onClick }) {
  // 🔴 OTHER USER (SELLER / BUYER)
  const name = chat.otherUser?.name || chat.seller?.name || "User";

  const avatar =
    chat.otherUser?.avatar || chat.seller?.avatar || "/default-user.png"; // keep default icon

  const lastMessage = chat.lastMessage || "No messages yet";

  return (
    <div
      className={`chat-list-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {/* AVATAR */}
      <div className="chat-avatar">
        <img src={avatar} alt={name} />
      </div>

      {/* TEXT AREA */}
      <div className="chat-info">
        <p className="chat-name">{name}</p>
        <p className="chat-last">{lastMessage}</p>
      </div>
    </div>
  );
}
