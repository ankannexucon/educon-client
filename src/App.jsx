import React from 'react';
import Chatbot from './Components/Chatbot';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333', margin: 0 }}>AI Chatbot with Gemini</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>Powered by Google's Gemini AI - Ready to Chat! 🚀</p>
      </header>
      
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>Welcome to Your AI Assistant!</h2>
        <p>Your Gemini API key is integrated and the chatbot is ready to use. Click the chat button in the bottom right to start a conversation with AI!</p>
        
        <div style={{ marginTop: '30px' }}>
          <h3>What you can ask:</h3>
          <ul>
            <li>💡 Explain complex concepts</li>
            <li>✍️ Help with writing and editing</li>
            <li>🔍 Answer questions on various topics</li>
            <li>💭 Brainstorm ideas</li>
            <li>📚 Learn new things</li>
          </ul>
        </div>

        <div style={{ 
          background: '#ecfdf5', 
          padding: '20px', 
          borderRadius: '8px', 
          marginTop: '30px',
          border: '1px solid #d1fae5'
        }}>
          <h4 style={{ color: '#065f46', margin: '0 0 10px 0' }}>✅ Ready to Go!</h4>
          <p style={{ color: '#047857', margin: 0 }}>
            Your Gemini API is connected. The chatbot is fully functional and ready to provide intelligent responses!
          </p>
        </div>
      </main>
      
      {/* Chatbot Component with Gemini AI */}
      <Chatbot />
    </div>
  );
}

export default App;