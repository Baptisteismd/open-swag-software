import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { useNavigate } from 'react-router-dom';

const CoachChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Message history
  const [input, setInput] = useState(''); // Input content
  const chatDisplayRef = useRef(null); // Scroll reference

  //  Automatic scrolling down
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
      //  Add user message
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
            role: 'Coach', // Bot role or context
            prompt: input,
          }),
        });

        const data = await response.json();

        // Add bot response
        if (data.response) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.response, user: false },
          ]);

          // new line: trigger text-to-speech for coach's response
          speakCoachResponse(data.response);

        } else if (data.error) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Error: ' + data.error, user: false },
          ]);
        }
      } catch (error) {
        // Manage connection errors and errorMessage variable added to prevent message repetition.
        const errorMessage = '오류가 발생했습니다: 서버에 연결할 수 없습니다.'//'connexion sans succès' //Error: Unable to connect to the server.
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: errorMessage, user: false }, 
        ]);
        // New line added to test voice in case of error: Speak the error message
        speakCoachResponse(errorMessage); 
      }
    }
  };

  // Use the “Enter” key to send a message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // new functions for text-to-speech
  
  // function to detect the language used by the generated response
  const detectLanguage = (text) => 
  {
    if (/[\u3131-\uD79D]/.test(text)) return 'ko-KR'; // pour reconnaître le coréen
    if (/\b(le|la|les|un|une|des|je|tu|il|elle|nous|vous|ils|elles|et|est|sont|pas|pour|avec|sans|cette|cela|ceci|au|aux|du|de|que|qui|où|quoi|quand|comment|parce|mais|ou|donc|or|ni|car|bientôt|fête|bonjour|merci|ça)\b|[àâçéèêëîïôûùüÿæœ]/i.test(text)) {
      return 'fr-FR';}
  // to recognize French
    return 'en-US'; // if no other languages are configured, default to English
  }
   // text-to-speech (TTS) function for coach's voice
  const speakCoachResponse = (text) => {
    const synth = window.speechSynthesis;
    const lang = detectLanguage(text); // call the detectLanguage function

    const loadAndSpeak = () => {
      const voices = synth.getVoices();

      if (!voices.length) {
          setTimeout(loadAndSpeak, 100); // Retry after 100ms if voices are not loaded
          return;
      }

      // Filter voices by language and characteristics
      const coachVoice = voices.find(
          (voice) => voice.lang === lang && 
                     (voice.name.toLowerCase().includes('coach') || 
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

  // code html
  return (
    <div className="chatbot-wrapper">
      <button onClick={() =>{clearConversations(); navigate('/')}} className="back-button">
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
          onClick={handleSendMessage}
          className="send-button"
          disabled={!input.trim()} // Disable the button if the field is empty
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CoachChatBot;
