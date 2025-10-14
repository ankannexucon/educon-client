import React from "react";
import EduconChatbot from "./components/EduconChatbot";
import { AuthProvider } from "./contexts/authContext";
import Index from "./routes/Index";

function App() {
  return (
    <AuthProvider>
      
    <div>
      <Index />
      <EduconChatbot />
    </div>
  
    </AuthProvider>
  );
}

export default App;
