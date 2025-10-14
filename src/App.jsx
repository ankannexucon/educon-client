import React from "react";
import { AuthProvider } from "./contexts/authContext";
import Index from "./routes/Index";

function App() {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
}

export default App;
