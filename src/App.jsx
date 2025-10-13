import React from 'react';
import Chatbot from './components/EduconChatbot';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333', margin: 0 }}>Your Website</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>With Floating AI Chatbot</p>
      </header>
      
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Welcome!</h2>
        <p>Look for the floating chat button in the bottom-right corner to start a conversation with our AI assistant!</p>
        
        <div style={{ marginTop: '30px' }}>
          <h3>Features:</h3>
          <ul>
            <li>💬 Floating chat interface</li>
            <li>🤖 Gemini AI powered</li>
            <li>📱 Minimize/maximize functionality</li>
            <li>🎨 Beautiful design</li>
          </ul>
        </div>
      </main>
      
      {/* Floating Chatbot Component */}
      <Chatbot />
    </div>
  );
}

export default App;