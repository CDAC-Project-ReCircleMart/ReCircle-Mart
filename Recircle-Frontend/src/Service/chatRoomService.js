import axios from "axios";

const API_URL = "http://localhost:8080/api/chat/rooms";

export const getOrCreateChatRoom = async (resourceType, resourceId) => {
    const response = await axios.post(API_URL, null, {
        params: {
            resourceType,
            resourceId,
        },
    });

    return response.data;
};