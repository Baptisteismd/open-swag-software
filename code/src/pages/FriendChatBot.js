import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { useNavigate } from 'react-router-dom';

const FriendChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Message history
  const [input, setInput] = useState(''); // Input field content
  const chatDisplayRef = useRef(null); // Reference for auto-scrolling

  // Automatically scroll to the bottom
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);
  
  const clearConversations = async () => {
    try {
      await fetch('http://127.0.0.1:5000/clear_conversations', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error clearing conversations:', error);
    }
  };
  
  // Function to send a message to the Flask API
  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add the user message
      setMessages([...messages, { text: input, user: true }]);
      setInput(''); // Reset the input field

      try {
        // POST request to Flask
        const response = await fetch('http://127.0.0.1:5000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: 'friend', // Bot's role or context
            prompt: input,
          }),
        });

        const data = await response.json();

        // Add the bot's response
        if (data.response) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.response, user: false },
          ]);

          // New line: Trigger text-to-speech for the coach's response
          speakCoachResponse(data.response);

        } else if (data.error) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Error: ' + data.error, user: false },
          ]);
        }
      } catch (error) {
        // Handle connection errors and avoid repetitive error messages
        const errorMessage = 'Error occurred: Unable to connect to the server.';
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: errorMessage, user: false },
        ]);
        // New line added to test the voice on error: Speak the error message
        speakCoachResponse(errorMessage); 
      }
    }
  };

  // Handle the "Enter" key to send a message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // New functions for text-to-speech (TTS)
  
  // Function to detect the language used in the generated response
  const detectLanguage = (text) => {
    if (/[\u3131-\uD79D]/.test(text)) return 'ko-KR'; // For recognizing Korean
    if (/\b(le|la|les|un|une|des|je|tu|il|elle|nous|vous|ils|elles|et|est|sont|pas|pour|avec|sans|cette|cela|ceci|au|aux|du|de|que|qui|où|quoi|quand|comment|parce|mais|ou|donc|or|ni|car|bientôt|fête|bonjour|merci|ça)\b|[àâçéèêëîïôûùüÿæœ]/i.test(text)) {
      return 'fr-FR'; // For recognizing French
    }
    return 'en-US'; // Default to English if no other languages are detected
  };

  // Text-to-speech (TTS) function for the coach's voice
  const speakCoachResponse = (text) => {
    const synth = window.speechSynthesis;
    const lang = detectLanguage(text); // Call the detectLanguage function

    const loadAndSpeak = () => {
      const voices = synth.getVoices();

      if (!voices.length) {
          setTimeout(loadAndSpeak, 100); // Retry after 100ms if voices are not loaded
          return;
      }

      // Filter voices by language and characteristics
      const coachVoice = voices.find(
          (voice) => voice.lang === lang && 
                     (voice.name.toLowerCase().includes('friend') || 
                      voice.name.toLowerCase().includes('energetic'))
      ) || voices.find(voice => voice.lang === lang) || voices[0]; // Fallback voice

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = coachVoice;
      utterance.pitch = 5.0;  // High pitch for motivation
      utterance.rate = 1.5;   // Faster rate for dynamic tone

      synth.speak(utterance);
    };

    loadAndSpeak();
  };

  // HTML code
  return (
    <div className="chatbot-wrapper">
      <button onClick={() =>{clearConversations(); navigate('/')}} className="back-button">
        Back to Homepage
      </button>
      <h1 className="chatbot-title">FriendChatBot</h1>
      <div className="chat-display" ref={chatDisplayRef}>
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
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
          disabled={!input.trim()} // Disable button if the input field is empty
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default FriendChatBot;
