import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/chat/messages";

// 👉 Fetch messages of a chat room
export const getChatMessages = async (chatRoomId) => {
    const response = await axios.get(`${API_BASE_URL}/${chatRoomId}`);
    return response.data;
};

// 👉 Send a message
export const sendChatMessage = async (payload) => {
    /*
      payload = {
        chatRoomId: number,
        senderExternalUserId: number,
        message: string
      }
    */
    const response = await axios.post(API_BASE_URL, payload);
    return response.data;
};