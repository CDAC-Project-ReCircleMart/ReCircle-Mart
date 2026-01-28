import api from "./api";

// 🔴 GET ALL CHATS OF CURRENT USER
export const getMyChats = async () => {
  const res = await api.get("/chats");
  return res.data;
};

// 🔴 START CHAT (FROM PRODUCT DETAIL)
export const startChat = async (listingId, sellerId) => {
  const res = await api.post("/chats/start", {
    listingId,
    sellerId,
  });

  return res.data; // { chatId }
};

// 🔴 GET MESSAGES OF A CHAT
export const getMessages = async (chatId) => {
  const res = await api.get(`/chats/${chatId}/messages`);
  return res.data;
};

// 🔴 SEND MESSAGE
export const sendMessage = async (chatId, text) => {
  const res = await api.post(`/chats/${chatId}/messages`, {
    text,
  });

  return res.data;
};
