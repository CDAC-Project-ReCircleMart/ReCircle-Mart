import "./ChatBubble.css";

export default function ChatBubble({ message }) {
  const loggedInUserId = Number(localStorage.getItem("userId"));

  const isMe = message.senderExternalUserId === loggedInUserId;

  return (
    <div className={`chat-bubble-row ${isMe ? "me" : "other"}`}>
      <div className={`chat-bubble ${isMe ? "me" : "other"}`}>
        <div className="chat-text">{message.message}</div>

        <div className="chat-time">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}