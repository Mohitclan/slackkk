import "../instrument.mjs";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";

import cors from "cors";

import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Configure Clerk middleware
// Clerk Express automatically reads CLERK_SECRET_KEY from environment variables
// But we can also pass it explicitly for clarity
app.use(clerkMiddleware());
console.log("✅ Clerk middleware configured");

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

// Only setup Sentry error handler if Sentry is initialized
if (process.env.SENTRY_DSN && !process.env.SENTRY_DSN.includes("your_sentry_dsn_here")) {
  Sentry.setupExpressErrorHandler(app);
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("✅ Server started on port:", ENV.PORT);
      console.log("📍 Backend URL: http://localhost:" + ENV.PORT);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

export default app;
