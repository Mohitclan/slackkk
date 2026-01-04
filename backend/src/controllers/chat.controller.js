import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const auth = req.auth();
    if (!auth || !auth.userId) {
      return res.status(401).json({ message: "User ID not found in authentication" });
    }
    
    const token = generateStreamToken(auth.userId);
    if (!token) {
      return res.status(500).json({
        message: "Failed to generate Stream token - check Stream API configuration",
      });
    }
    
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).json({
      message: "Failed to generate Stream token",
      error: error.message,
    });
  }
};
