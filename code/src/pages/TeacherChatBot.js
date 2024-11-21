import React, { useState } from 'react';
import './ChatBot.css';
import { useNavigate } from 'react-router-dom';

const TeacherChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
      
      // Mock response from the chatbot
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "I'm here to help you!", user: false },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <button onClick={() => navigate('/')} className="back-button">
        Back to Homepage
      </button>
      <h1 className="chatbot-title">TeacherChatBot</h1>
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.user ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default TeacherChatBot;
