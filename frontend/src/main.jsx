import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router";
import { Toaster } from "react-hot-toast";

import * as Sentry from "@sentry/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider.jsx";
import SetupPage from "./components/SetupPage.jsx";

const queryClient = new QueryClient();

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Check if setup is required
const isSetupRequired = 
  !PUBLISHABLE_KEY || 
  PUBLISHABLE_KEY.includes("your_clerk_publishable_key_here") ||
  !STREAM_API_KEY ||
  STREAM_API_KEY.includes("your_stream_api_key_here") ||
  !API_BASE_URL ||
  API_BASE_URL.includes("your_api_url");

if (isSetupRequired) {
  console.error("⚠️ Missing or invalid environment variables in .env file");
  console.error("Please add your API keys to frontend/.env");
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});

// Show setup page if environment variables are missing
if (isSetupRequired) {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <SetupPage />
    </StrictMode>
  );
} else {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <App />
            </AuthProvider>
            <Toaster position="top-right" />
          </QueryClientProvider>
        </BrowserRouter>
      </ClerkProvider>
    </StrictMode>
  );
}
