import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
// <-- adjust path to your file
import ChatListItem from "../../components/messages/ChatListItem";
import ChatBubble from "../../components/messages/ChatBubble";
import {
  generateRSAKeyPair,
  exportPublicKeyB64,
  exportPrivateKeyB64,
  importPrivateKeyB64,
  importPublicKeyB64,
  decryptAESGCM,
  rsaDecryptKey,
  encryptAESGCM,
  rsaEncryptKey
} from "../../e2ee/crypto";
import "./Messages.css";

export default function Messages() {
  const location = useLocation();
  const chatFromProduct = location.state?.chatId;

  const user = JSON.parse(localStorage.getItem("user"));

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  // 🔥 MENU STATE
  const [showMenu, setShowMenu] = useState(false);


  const [myPrivateKey, setMyPrivateKey] = useState(null);
  const [myPublicKeyB64, setMyPublicKeyB64] = useState(null);

  // If you don't store encKeyForSender yet, this helps show your own sent messages immediately
  const localPlainCacheRef = useRef(new Map()); // messageId -> plaintext
  const menuRef = useRef(null);


  useEffect(() => {
    const ensureKeys = async () => {
      try {
        const privB64 = localStorage.getItem("e2ee_priv");
        const pubB64 = localStorage.getItem("e2ee_pub");

        if (!privB64 || !pubB64) {
          console.log("E2EE: generating RSA keys...");
          const kp = await generateRSAKeyPair();
          const newPub = await exportPublicKeyB64(kp.publicKey);
          const newPriv = await exportPrivateKeyB64(kp.privateKey);

          localStorage.setItem("e2ee_pub", newPub);
          localStorage.setItem("e2ee_priv", newPriv);

          // upload public key
          await api.post("/e2ee/public-key", { publicKey: newPub });
          console.log("E2EE: public key uploaded");
        } else {
          // optional: upload again (safe) to ensure backend has it
          await api.post("/e2ee/public-key", { publicKey: pubB64 });
          console.log("E2EE: public key ensured on server");
        }

        const finalPriv = localStorage.getItem("e2ee_priv");
        const finalPub = localStorage.getItem("e2ee_pub");

        setMyPublicKeyB64(finalPub);
        setMyPrivateKey(await importPrivateKeyB64(finalPriv));
        console.log("E2EE: private key loaded");
      } catch (err) {
        console.error("E2EE: ensure keys failed:", err);
        toast.error("E2EE key setup failed. Check console logs.");
      }
    };

    ensureKeys();
  }, []);

  /* -------------------- CLOSE MENU WHEN CLICK OUTSIDE -------------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* -------------------- FETCH ALL CHATS -------------------- */
  useEffect(() => {
    const fetchChats = async () => {
      try {
        // 🔥🔥🔥 FIXED ROUTE 🔥🔥🔥
        const res = await api.get("/messages");

        const fixedChats = res.data.map((chat) => {
          const otherId = chat.otherId ?? chat.other_id;
          const otherName = chat.otherName ?? chat.other_name;
          const otherAvatar = chat.otherAvatar ?? chat.other_avatar;

          return {
            ...chat,
            otherId,
            otherUser: {
              id: otherId,
              name: otherName,
              avatar: otherAvatar,
            },
          };
        });

        setChats(fixedChats);

        if (chatFromProduct) {
          const found = fixedChats.find(
            (c) => String(c.id) === String(chatFromProduct),
          );
          if (found) setActiveChat(found);
        } else if (fixedChats.length > 0) {
          setActiveChat(fixedChats[0]);
        }
      } catch (err) {
        console.error("❌ FETCH CHATS ERROR:", err);

        const status = err.response?.status;
        const message = err.response?.data?.message;

        toast.error(
          `Failed to load chats (${status || "NO STATUS"}): ${message || err.message
          }`,
        );
      }
    };

    fetchChats();
  }, [chatFromProduct]);

  /* -------------------- FETCH MESSAGES (POLLING) -------------------- */
  useEffect(() => {
    if (!activeChat?.id) return;
    if (!myPrivateKey) return; // wait until keys ready

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/messages/${activeChat.id}/messages`);

        // Decrypt
        const decrypted = await Promise.all(
          res.data.map(async (m) => {
            // If your backend still returns old plaintext messages sometimes
            if (m.message) return { ...m, _plain: m.message };

            // If I am the receiver, I can decrypt using encKeyForReceiver
            const amReceiver = String(m.receiverId) === String(user.id);

            // If sender-key-wrapping exists, prefer it for my own messages
            const hasEncForSender = !!m.encKeyForSender; // only if you add later
            const amSender = String(m.senderId) === String(user.id);

            try {
              let encKeyB64 = null;

              if (amReceiver) encKeyB64 = m.encKeyForReceiver;
              else if (amSender && hasEncForSender) encKeyB64 = m.encKeyForSender;

              // fallback: show cached plaintext for messages I just sent (no encKeyForSender)
              if (!encKeyB64) {
                const cached = localPlainCacheRef.current.get(m.id);
                return { ...m, _plain: cached ?? "[Encrypted message]" };
              }

              const rawAesKey = await rsaDecryptKey(encKeyB64, myPrivateKey);

              const plain = await decryptAESGCM(
                {
                  ivB64: m.iv,
                  ciphertextB64: m.ciphertext,
                  tagB64: m.tag,
                },
                rawAesKey,
              );

              return { ...m, _plain: plain };
            } catch (e) {
              console.error("E2EE: decrypt failed for message", m?.id, e);
              return { ...m, _plain: "[Decrypt failed]" };
            }
          }),
        );

        setMessages(decrypted);
      } catch (err) {
        console.error("❌ FETCH MESSAGES ERROR:", err);
        const status = err.response?.status;
        const message = err.response?.data?.message;
        toast.error(`Failed to load messages (${status || "NO STATUS"}): ${message || err.message}`);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [activeChat, myPrivateKey]);

  /* -------------------- SEND MESSAGE -------------------- */
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat) return;
    if (!myPrivateKey || !myPublicKeyB64) {
      toast.error("E2EE not ready yet");
      return;
    }

    try {
      const receiverId =
        activeChat.otherUser?.id ??
        activeChat.otherId ??
        activeChat.other_id;

      if (!receiverId) {
        console.log("activeChat object:", activeChat);
        throw new Error("receiverId missing (expected other_id/otherId/otherUser.id)");
      }
      // 1) Get receiver public key
      const keyRes = await api.get(`/e2ee/public-key/${receiverId}`);
      const receiverPubB64 = keyRes.data.publicKey;
      const receiverPublicKey = await importPublicKeyB64(receiverPubB64);

      const myPubB64 = localStorage.getItem("e2ee_pub");
      const myPublicKey = await importPublicKeyB64(myPubB64);

      // 2) AES encrypt message
      const aes = await encryptAESGCM(newMessage);

      // 3) RSA encrypt AES key for receiver
      let encKeyForReceiver = await rsaEncryptKey(aes.aesKeyRaw, receiverPublicKey);

      // OPTIONAL (recommended): encrypt AES key for sender too, so you can decrypt your own history after refresh
      // This requires backend+entity+DTO support for encKeyForSender.
      let encKeyForSender = await rsaEncryptKey(aes.aesKeyRaw, myPublicKey);
      try {
        const myPubKey = await importPublicKeyB64(myPublicKeyB64);
        encKeyForSender = await rsaEncryptKey(aes.aesKeyRaw, myPubKey);
      } catch (e) {
        console.warn("E2EE: encKeyForSender creation skipped:", e);
      }

      // 4) Send encrypted payload
      const payload = {
        receiverId,
        alg: "AES-256-GCM",
        iv: aes.ivB64,
        ciphertext: aes.ciphertextB64,
        tag: aes.tagB64,
        encKeyForReceiver,
        encKeyForSender, // ✅ enable once backend supports it
      };

      const res = await api.post(`/messages/${activeChat.id}/messages`, payload);

      // Cache plaintext so your own message shows immediately even if no encKeyForSender support yet
      localPlainCacheRef.current.set(res.data.id, newMessage);

      setMessages((prev) => [...prev, { ...res.data, _plain: newMessage }]);
      setNewMessage("");
    } catch (err) {
      console.error("❌ SEND MESSAGE ERROR:", err);
      const status = err.response?.status;
      const message = err.response?.data?.message;
      toast.error(`Send failed (${status || "NO STATUS"}): ${message || err.message}`);
    }
  };

  /* -------------------- DELETE CHAT -------------------- */
  const handleDeleteChat = async () => {
    if (!activeChat) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this chat?",
    );
    if (!confirm) return;

    try {
      // 🔥🔥🔥 FIXED ROUTE 🔥🔥🔥
      await api.delete(`/messages/${activeChat.id}`);

      toast.success("Chat deleted");

      // REMOVE FROM SIDEBAR
      setChats((prev) => prev.filter((c) => c.id !== activeChat.id));

      // CLEAR CHAT WINDOW
      setActiveChat(null);
      setMessages([]);
    } catch (err) {
      console.error("❌ DELETE CHAT ERROR:", err);

      const status = err.response?.status;
      const message = err.response?.data?.message;

      toast.error(
        `Delete failed (${status || "NO STATUS"}): ${message || err.message}`,
      );
    }
  };

  return (
    <div className="chat-root">
      {/* ---------------- LEFT SIDEBAR ---------------- */}
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

      {/* ---------------- RIGHT CHAT WINDOW ---------------- */}
      <div className="chat-main">
        {!activeChat ? (
          <div style={{ padding: "20px" }}>Select a chat</div>
        ) : (
          <>
            {/* HEADER */}
            <div className="chat-top">
              {activeChat.otherUser && (
                <div
                  className="chat-user"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {/* LEFT — USER INFO */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={
                        activeChat.otherUser.avatar
                          ? activeChat.otherUser.avatar.startsWith("/uploads")
                            ? `http://localhost:8080${activeChat.otherUser.avatar}`
                            : activeChat.otherUser.avatar
                          : "/profile.png"
                      }
                      alt="user"
                      className="chat-avatar"
                    />
                    <span className="chat-username">
                      {activeChat.otherUser.name}
                    </span>
                  </div>

                  {/* RIGHT — THREE DOT MENU */}
                  <div className="chat-menu" ref={menuRef}>
                    <button onClick={() => setShowMenu((prev) => !prev)}>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    {showMenu && (
                      <div className="chat-menu-box">
                        <button
                          className="delete-btn"
                          onClick={() => {
                            setShowMenu(false);
                            handleDeleteChat();
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                          Delete Chat
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={() => setShowMenu(false)}
                        >
                          <i className="fa-solid fa-xmark"></i>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MESSAGES */}
            <div className="chat-body">
              {messages.map((msg) => {
                const senderId = msg.senderId ?? msg.sender_id;       // support both
                const createdAt = msg.createdAt ?? msg.created_at;    // support both

                return (
                  <ChatBubble
                    key={msg.id}
                    message={{
                      from: String(senderId) === String(user.id) ? "me" : "other",
                      text: msg._plain ?? msg.message ?? msg.text ?? "",
                      time: createdAt
                        ? new Date(createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "",
                    }}
                  />
                );
              })}
            </div>



            {/* INPUT */}
            <div className="chat-bottom">
              <input
                className="chat-input"
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              <button className="send-btn" onClick={handleSend}>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
