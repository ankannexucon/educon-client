import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant powered by Gemini. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Google GenAI with your API key
  const ai = new GoogleGenAI({ apiKey: "AIzaSyDXLHQx0mVDaXYVzDF7klzYpF2qdmlOcAE" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getGeminiResponse = async (userMessage) => {
    try {
      // Try gemini-2.0-flash first, then fallback to other models
      const modelsToTry = [
        "gemini-2.0-flash",
        "gemini-1.5-flash", 
        "gemini-1.5-pro",
        "gemini-1.0-pro"
      ];

      let lastError = null;

      for (const model of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: model,
            contents: userMessage,
          });
          
          if (response.text) {
            return response.text;
          }
        } catch (error) {
          console.log(`Model ${model} failed:`, error.message);
          lastError = error;
          continue; // Try next model
        }
      }

      throw lastError || new Error('All models failed');
      
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "Hello! I'm your AI assistant powered by Gemini. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  // Inline Styles
  const styles = {
    toggleBtn: {
      position: 'fixed', bottom: '20px', right: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white', border: 'none', borderRadius: '25px', padding: '12px 20px',
      cursor: 'pointer', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px',
      fontWeight: '500', zIndex: 1000, transition: 'all 0.3s ease'
    },
    sidebar: {
      position: 'fixed', top: 0, right: isOpen ? 0 : '-400px', width: '380px',
      height: '100vh', background: 'white', boxShadow: '-2px 0 20px rgba(0, 0, 0, 0.1)',
      display: 'flex', flexDirection: 'column', transition: 'right 0.3s ease', zIndex: 1001
    },
    header: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '16px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'
    },
    title: {
      display: 'flex', alignItems: 'center', gap: '12px'
    },
    botAvatar: {
      width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', fontSize: '18px'
    },
    titleText: {
      display: 'flex', flexDirection: 'column'
    },
    titleH3: {
      margin: 0, fontSize: '16px', fontWeight: '600'
    },
    status: {
      fontSize: '12px', opacity: 0.9, color: isLoading ? '#fbbf24' : '#4ade80'
    },
    actions: {
      display: 'flex', gap: '8px'
    },
    actionBtn: {
      background: 'rgba(255, 255, 255, 0.2)', border: 'none', color: 'white',
      width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
      transition: 'background 0.2s ease'
    },
    closeBtn: {
      fontSize: '20px', fontWeight: '300'
    },
    messagesContainer: {
      flex: 1, padding: '20px', overflowY: 'auto', background: '#f8fafc'
    },
    message: {
      marginBottom: '16px', display: 'flex'
    },
    userMessage: {
      justifyContent: 'flex-end'
    },
    botMessage: {
      justifyContent: 'flex-start'
    },
    messageBubble: {
      maxWidth: '280px', padding: '12px 16px', borderRadius: '18px', position: 'relative'
    },
    userBubble: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white', borderBottomRightRadius: '4px'
    },
    botBubble: {
      background: 'white', color: '#374151', border: '1px solid #e5e7eb',
      borderBottomLeftRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    messageText: {
      fontSize: '14px', lineHeight: 1.4, marginBottom: '4px', whiteSpace: 'pre-wrap'
    },
    messageTime: {
      fontSize: '11px', opacity: 0.7, textAlign: 'right'
    },
    typingIndicator: {
      display: 'flex', gap: '4px', padding: '8px 0'
    },
    typingDot: {
      width: '8px', height: '8px', background: '#9ca3af',
      borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out'
    },
    inputArea: {
      padding: '20px', background: 'white', borderTop: '1px solid #e5e7eb'
    },
    inputContainer: {
      display: 'flex', gap: '12px', alignItems: 'center'
    },
    input: {
      flex: 1, padding: '12px 16px', border: '1px solid #d1d5db',
      borderRadius: '24px', fontSize: '14px', outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    sendBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white', border: 'none', width: '40px', height: '40px',
      borderRadius: '50%', cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontSize: '16px',
      transition: 'all 0.2s ease'
    },
    keyframes: `
      @keyframes typing {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }
    `
  };

  return (
    <>
      {/* Add CSS keyframes */}
      <style>{styles.keyframes}</style>

      {/* Chat Toggle Button */}
      {!isOpen && (
        <button 
          style={styles.toggleBtn}
          onClick={() => setIsOpen(true)}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
          }}
        >
          <span>💬</span>
          <span>Chat with AI</span>
        </button>
      )}

      {/* Chat Sidebar */}
      <div style={styles.sidebar}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.title}>
            <div style={styles.botAvatar}>🤖</div>
            <div style={styles.titleText}>
              <h3 style={styles.titleH3}>Gemini AI</h3>
              <span style={styles.status}>
                {isLoading ? '● Typing...' : '● Online'}
              </span>
            </div>
          </div>
          <div style={styles.actions}>
            <button 
              style={styles.actionBtn}
              onClick={clearChat}
              title="Clear chat"
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              🗑️
            </button>
            <button 
              style={{...styles.actionBtn, ...styles.closeBtn}}
              onClick={() => setIsOpen(false)}
              title="Close chat"
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              ×
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div style={styles.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                ...styles.message,
                ...(message.sender === 'user' ? styles.userMessage : styles.botMessage)
              }}
            >
              <div style={{
                ...styles.messageBubble,
                ...(message.sender === 'user' ? styles.userBubble : styles.botBubble)
              }}>
                <div style={styles.messageText}>{message.text}</div>
                <div style={styles.messageTime}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{...styles.message, ...styles.botMessage}}>
              <div style={{...styles.messageBubble, ...styles.botBubble}}>
                <div style={styles.typingIndicator}>
                  <span style={{...styles.typingDot, animationDelay: '-0.32s'}}></span>
                  <span style={{...styles.typingDot, animationDelay: '-0.16s'}}></span>
                  <span style={styles.typingDot}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form style={styles.inputArea} onSubmit={handleSendMessage}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything..."
              style={{
                ...styles.input,
                borderColor: inputMessage ? '#667eea' : '#d1d5db'
              }}
              disabled={isLoading}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            <button 
              type="submit" 
              style={{
                ...styles.sendBtn,
                opacity: (!inputMessage.trim() || isLoading) ? 0.5 : 1,
                transform: (!inputMessage.trim() || isLoading) ? 'none' : 'scale(1)'
              }}
              disabled={!inputMessage.trim() || isLoading}
              onMouseEnter={(e) => {
                if (inputMessage.trim() && !isLoading) {
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (inputMessage.trim() && !isLoading) {
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              {isLoading ? '⏳' : '➤'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;