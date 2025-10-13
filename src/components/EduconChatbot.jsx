import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const EduconChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Educon AI assistant. I'm here to help you with learning, questions, and educational support! How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageAnimations, setMessageAnimations] = useState({});
  const messagesEndRef = useRef(null);

  // Initialize Google GenAI with your API key
  const ai = new GoogleGenAI({ apiKey: "AIzaSyDXLHQx0mVDaXYVzDF7klzYpF2qdmlOcAE" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isInitialLoad]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message with animation
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Add typing animation
    setMessageAnimations(prev => ({
      ...prev,
      [userMessage.id]: 'slideInRight'
    }));

    try {
      const response = await getGeminiResponse(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Add bot message animation
      setTimeout(() => {
        setMessageAnimations(prev => ({
          ...prev,
          [botMessage.id]: 'slideInLeft'
        }));
      }, 100);
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      setTimeout(() => {
        setMessageAnimations(prev => ({
          ...prev,
          [errorMessage.id]: 'slideInLeft'
        }));
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const getGeminiResponse = async (userMessage) => {
    try {
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
          continue;
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
      text: "Hello! I'm your Educon AI assistant. I'm here to help you with learning, questions, and educational support! How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }]);
    setMessageAnimations({});
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setIsInitialLoad(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  // Inline Styles with Enhanced Animations
  const styles = {
    // Floating Toggle Button
    floatingButton: {
      position: 'fixed',
      bottom: '25px',
      right: '25px',
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      animation: 'pulse 2s infinite, float 6s ease-in-out infinite',
    },

    // Floating Chat Window
    chatWindow: {
      position: 'fixed',
      bottom: '25px',
      right: '25px',
      width: '380px',
      height: isMinimized ? '70px' : '550px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1001,
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      transform: isInitialLoad ? 'scale(0.8) translateY(20px)' : 'scale(1) translateY(0)',
      opacity: isInitialLoad ? 0 : 1,
    },

    // Header
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      cursor: isMinimized ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
    },

    title: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1,
    },

    botAvatar: {
      width: '40px',
      height: '40px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      animation: 'bounce 2s infinite',
    },

    titleText: {
      display: 'flex',
      flexDirection: 'column',
    },

    titleH3: {
      margin: 0,
      fontSize: '15px',
      fontWeight: '600',
      background: 'linear-gradient(45deg, #fff, #e0e7ff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },

    status: {
      fontSize: '11px',
      opacity: 0.9,
      color: isLoading ? '#fbbf24' : '#4ade80',
      animation: isLoading ? 'pulse 1.5s infinite' : 'none',
    },

    headerActions: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },

    actionBtn: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      color: 'white',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      transition: 'all 0.3s ease',
    },

    // Messages Container
    messagesContainer: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: isMinimized ? 'none' : 'block',
    },

    message: {
      marginBottom: '16px',
      display: 'flex',
    },

    userMessage: {
      justifyContent: 'flex-end',
    },

    botMessage: {
      justifyContent: 'flex-start',
    },

    messageBubble: {
      maxWidth: '260px',
      padding: '12px 16px',
      borderRadius: '18px',
      position: 'relative',
      animation: 'messageAppear 0.4s ease-out',
    },

    userBubble: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderBottomRightRadius: '6px',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    },

    botBubble: {
      background: 'white',
      color: '#374151',
      border: '1px solid rgba(229, 231, 235, 0.8)',
      borderBottomLeftRadius: '6px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },

    messageText: {
      fontSize: '14px',
      lineHeight: 1.5,
      marginBottom: '4px',
      whiteSpace: 'pre-wrap',
    },

    messageTime: {
      fontSize: '10px',
      opacity: 0.7,
      textAlign: 'right',
    },

    // Typing Indicator
    typingIndicator: {
      display: 'flex',
      gap: '4px',
      padding: '12px 0',
      alignItems: 'center',
    },

    typingDot: {
      width: '8px',
      height: '8px',
      background: '#9ca3af',
      borderRadius: '50%',
      animation: 'typing 1.4s infinite ease-in-out',
    },

    typingText: {
      fontSize: '12px',
      color: '#6b7280',
      marginLeft: '8px',
    },

    // Input Area
    inputArea: {
      padding: '20px',
      background: 'white',
      borderTop: '1px solid rgba(229, 231, 235, 0.8)',
      display: isMinimized ? 'none' : 'block',
    },

    inputContainer: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      position: 'relative',
    },

    input: {
      flex: 1,
      padding: '14px 18px',
      border: '2px solid #e5e7eb',
      borderRadius: '25px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: 'white',
    },

    sendBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    },

    // Enhanced Keyframes for animations
    keyframes: `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(2deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4); }
        50% { transform: scale(1.05); box-shadow: 0 12px 40px rgba(102, 126, 234, 0.6); }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        60% { transform: translateY(-3px); }
      }
      
      @keyframes typing {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }
      
      @keyframes messageAppear {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes slideInRight {
        0% { transform: translateX(50px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideInLeft {
        0% { transform: translateX(-50px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
        50% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.8); }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
    `,
  };

  const getMessageAnimation = (messageId) => {
    return messageAnimations[messageId] || 'messageAppear';
  };

  return (
    <>
      {/* Enhanced CSS Keyframes */}
      <style>{styles.keyframes}</style>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          style={styles.floatingButton}
          onClick={handleOpen}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.15) rotate(5deg)';
            e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
            e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
          }}
          title="Chat with Educon AI"
        >
          🎓
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div 
            style={styles.header}
            onClick={isMinimized ? toggleMinimize : undefined}
          >
            <div style={styles.title}>
              <div style={styles.botAvatar}>🎓</div>
              <div style={styles.titleText}>
                <h3 style={styles.titleH3}>Educon AI Assistant</h3>
                <span style={styles.status}>
                  {isLoading ? '● Thinking...' : '● Ready to help'}
                </span>
              </div>
            </div>
            <div style={styles.headerActions}>
              {!isMinimized && (
                <button 
                  style={styles.actionBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearChat();
                  }}
                  title="Clear conversation"
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🗑️
                </button>
              )}
              <button 
                style={styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMinimize();
                }}
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {isMinimized ? '＋' : '−'}
              </button>
              <button 
                style={styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                title="Close chat"
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
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
                  ...(message.sender === 'user' ? styles.userMessage : styles.botMessage),
                  animation: `${getMessageAnimation(message.id)} 0.4s ease-out`
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
                    <span style={styles.typingText}>Educon AI is thinking...</span>
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
                placeholder="Ask me anything about education..."
                style={{
                  ...styles.input,
                  borderColor: inputMessage ? '#667eea' : '#e5e7eb',
                  boxShadow: inputMessage ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none'
                }}
                disabled={isLoading}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              />
              <button 
                type="submit" 
                style={{
                  ...styles.sendBtn,
                  opacity: (!inputMessage.trim() || isLoading) ? 0.6 : 1,
                  transform: (!inputMessage.trim() || isLoading) ? 'scale(1)' : 'scale(1)',
                  animation: inputMessage.trim() && !isLoading ? 'pulse 2s infinite' : 'none'
                }}
                disabled={!inputMessage.trim() || isLoading}
                onMouseEnter={(e) => {
                  if (inputMessage.trim() && !isLoading) {
                    e.target.style.transform = 'scale(1.1) rotate(5deg)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputMessage.trim() && !isLoading) {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                  }
                }}
              >
                {isLoading ? '⏳' : '🎯'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EduconChatbot;