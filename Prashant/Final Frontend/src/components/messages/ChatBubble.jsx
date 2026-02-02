export default function ChatBubble({ message }) {
  return (
    <div className={`chat-bubble ${message.from === "me" ? "me" : "seller"}`}>
      <p>{message.text}</p>
      <span className="time">{message.time}</span>
    </div>
  );
}
// export default function ChatBubble({ message, currentUserId }) {
//   const isMine = String(message.senderId) === String(currentUserId);

//   return (
//     <div className={`chat-bubble ${isMine ? "me" : "seller"}`}>
//       <p>{message._plain}</p> {/* decrypted text */}
//       <span className="time">
//         {/* {new Date(message.createdAt).toLocaleTimeString()} */}
//       </span>
//     </div>
//   );
// }
