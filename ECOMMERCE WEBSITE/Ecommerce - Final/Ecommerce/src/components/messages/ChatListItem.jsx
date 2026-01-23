export default function ChatListItem({ chat, active, onClick }) {
  return (
    <div
      className={`chat-list-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {/* AVATAR */}
      <div className="chat-avatar">
        <img src={chat.avatar} alt={chat.name} />
      </div>

      {/* TEXT AREA */}
      <div className="chat-info">
        <p className="chat-name">{chat.name}</p>
        <p className="chat-last">
          {chat.messages[chat.messages.length - 1].text}
        </p>
      </div>
    </div>
  );
}
