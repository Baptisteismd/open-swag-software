import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { useNavigate } from 'react-router-dom';

const CoachChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Message history
  const [input, setInput] = useState(''); // Input content
  const chatDisplayRef = useRef(null); // Scroll reference
  const [listening, setListening] = useState(false); // Listening status for speech-to-text

  // Automatic scrolling down
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
      setInput(''); // Reset input field

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

        if (data.response) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.response, user: false },
          ]);
          speakCoachResponse(data.response);
        } else if (data.error) {
          const errorMessage = `Error: ${data.error}`;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: errorMessage, user: false },
          ]);
          speakCoachResponse(errorMessage);
        }
      } catch (error) {
        const errorMessage = 'Error: Unable to connect to the server. 오류가 발생했습니다: 서버에 연결할 수 없습니다.'; //error
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: errorMessage, user: false },
        ]);
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

    // Function to detect the language used in the generated response
  const detectLanguage = (text) => {
    if (/[\u3131-\uD79D]/.test(text)) return 'ko-KR';
    if (/\b(le|la|les|un|une|des|je|tu|il|elle|nous|vous|ils|elles|et|est|sont|pas|pour|avec|sans|cette|cela|ceci|au|aux|du|de|que|qui|où|quoi|quand|comment|parce|mais|ou|donc|or|ni|car|bientôt|fête|bonjour|merci|ça)\b|[àâçéèêëîïôûùüÿæœ]/i.test(text)) {
      return 'fr-FR'; // for recognizing French
    }
    return 'en-US'; // Default to English if no other languages are detected
  };

  const speakCoachResponse = (text) => {
    const synth = window.speechSynthesis;
    const lang = detectLanguage(text);

    const loadAndSpeak = () => {
      const voices = synth.getVoices();

      if (!voices.length) {
        setTimeout(loadAndSpeak, 100);
        return;
      }

      const coachVoice =
        voices.find(
          (voice) =>
            voice.lang === lang &&
            (voice.name.toLowerCase().includes('coach') ||
              voice.name.toLowerCase().includes('energetic'))
        ) ||
        voices.find((voice) => voice.lang === lang) ||
        voices[0];

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = coachVoice;
      utterance.pitch = 5.0;
      utterance.rate = 1.5;

      synth.speak(utterance);
    };

    loadAndSpeak();
  };

  // Speech-to-text functionality
  const handleSpeechToText = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    
    // Automatically set the language based on user's preference or detected language
    const preferredLanguage = detectLanguage(input || ''); // Use detected language from input or default to English
    recognition.lang = preferredLanguage; // Set language dynamically (en-US, fr-FR, or ko-KR)
    recognition.interimResults = false;
  
    recognition.onstart = () => {
      setListening(true);
    };
  
    recognition.onend = () => {
      setListening(false);
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); // Update the input field with the recognized text
    };
  
    recognition.start();
  };
  
  // HTML code
  return (
    <div className="chatbot-wrapper">
      <button onClick={() => { clearConversations(); navigate('/'); }} className="back-button">
        Back to Homepage
      </button>
      <h1 className="chatbot-title">CoachChatBot</h1>
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
          onClick={handleSpeechToText}
          className="microphone-button"
          disabled={listening} // Disable if already listening
        >
          🎤
        </button>
        <button
          onClick={handleSendMessage}
          className="send-button"
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CoachChatBot;
