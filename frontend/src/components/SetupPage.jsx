const SetupPage = () => {
  const missingKeys = [];
  
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const streamKey = import.meta.env.VITE_STREAM_API_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  if (!clerkKey || clerkKey.includes("your_clerk_publishable_key_here")) {
    missingKeys.push("VITE_CLERK_PUBLISHABLE_KEY");
  }
  if (!streamKey || streamKey.includes("your_stream_api_key_here")) {
    missingKeys.push("VITE_STREAM_API_KEY");
  }
  if (!apiUrl || apiUrl.includes("your_api_url")) {
    missingKeys.push("VITE_API_BASE_URL");
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
      backgroundColor: "#1a1a1a",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        maxWidth: "600px",
        backgroundColor: "#2a2a2a",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{ marginTop: 0, color: "#fff" }}>⚠️ Setup Required</h1>
        
        <p style={{ color: "#ccc", lineHeight: "1.6" }}>
          The application requires API keys to function. Please add the following environment variables to your <code style={{ backgroundColor: "#1a1a1a", padding: "2px 6px", borderRadius: "4px" }}>frontend/.env</code> file:
        </p>

        <div style={{
          backgroundColor: "#1a1a1a",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1rem",
          fontFamily: "monospace",
          fontSize: "0.9rem"
        }}>
          {missingKeys.length > 0 ? (
            <ul style={{ margin: 0, paddingLeft: "1.5rem", color: "#ff6b6b" }}>
              {missingKeys.map((key) => (
                <li key={key} style={{ marginBottom: "0.5rem" }}>{key}</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#51cf66", margin: 0 }}>✓ All required keys are present!</p>
          )}
        </div>

        <div style={{
          marginTop: "1.5rem",
          padding: "1rem",
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          fontSize: "0.9rem"
        }}>
          <p style={{ marginTop: 0, color: "#ccc" }}><strong>Example .env file:</strong></p>
          <pre style={{
            margin: 0,
            color: "#51cf66",
            overflowX: "auto"
          }}>{`VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_STREAM_API_KEY=...
VITE_API_BASE_URL=http://localhost:5001/api`}</pre>
        </div>

        <p style={{ color: "#999", fontSize: "0.85rem", marginTop: "1.5rem", marginBottom: 0 }}>
          After adding your keys, restart the development server.
        </p>
      </div>
    </div>
  );
};

export default SetupPage;

