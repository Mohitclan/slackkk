export const protectRoute = (req, res, next) => {
  try {
    const auth = req.auth();
    console.log("🔐 Auth check - isAuthenticated:", auth?.isAuthenticated, "userId:", auth?.userId);
    
    if (!auth || !auth.isAuthenticated) {
      console.log("❌ Auth failed - headers:", {
        authorization: req.headers.authorization ? "present" : "missing",
        cookie: req.headers.cookie ? "present" : "missing"
      });
      return res.status(401).json({ message: "Unauthorized - you must be logged in" });
    }
    
    console.log("✅ Auth successful for user:", auth.userId);
    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error);
    return res.status(401).json({ message: "Authentication error", error: error.message });
  }
};
