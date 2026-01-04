import { StreamChat } from "stream-chat";
import { ENV } from "../config/env.js";

// Initialize Stream client with error handling
let streamClient = null;

try {
  if (!ENV.STREAM_API_KEY || !ENV.STREAM_API_SECRET) {
    console.warn("⚠️  Stream API keys not configured. Chat features will not work.");
  } else if (ENV.STREAM_API_KEY.includes("your_stream") || ENV.STREAM_API_SECRET.includes("your_stream")) {
    console.warn("⚠️  Stream API keys are placeholders. Chat features will not work.");
  } else {
    streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET);
    console.log("✅ Stream client initialized successfully");
  }
} catch (error) {
  console.error("❌ Error initializing Stream client:", error.message);
}

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted successfully:", userData.name);
    return userData;
  } catch (error) {
    console.log("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted successfully:", userId);
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    if (!streamClient) {
      console.error("Stream client not initialized. Check STREAM_API_KEY and STREAM_API_SECRET in .env");
      return null;
    }
    if (!userId) {
      console.error("User ID is required to generate Stream token");
      return null;
    }
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return null;
  }
};

export const addUserToPublicChannels = async (newUserId) => {
  const publicChannels = await streamClient.queryChannels({ discoverable: true });

  for (const channel of publicChannels) {
    await channel.addMembers([newUserId]);
  }
};
