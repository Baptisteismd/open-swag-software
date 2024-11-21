import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { useNavigate } from 'react-router-dom';

const CoachChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Historique des messages
  const [input, setInput] = useState(''); // Contenu de l'input
  const chatDisplayRef = useRef(null); // Référence pour le défilement

  // Défilement automatique vers le bas
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  // Fonction pour envoyer un message à l'API Flask
  const handleSendMessage = async () => {
    if (input.trim()) {
      // Ajouter le message utilisateur
      setMessages([...messages, { text: input, user: true }]);
      setInput(''); // Réinitialiser le champ input

      try {
        // Requête POST vers Flask
        const response = await fetch('http://127.0.0.1:5000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: 'Coach', // Rôle ou contexte du bot
            prompt: input,
          }),
        });

        const data = await response.json();

        // Ajouter la réponse du bot
        if (data.response) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.response, user: false },
          ]);
        } else if (data.error) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Error: ' + data.error, user: false },
          ]);
        }
      } catch (error) {
        // Gérer les erreurs de connexion
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Unable to connect to the server.', user: false },
        ]);
      }
    }
  };

  // Gestion de la touche "Entrée" pour envoyer un message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      <button onClick={() => navigate('/')} className="back-button">
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
          disabled={!input.trim()} // Désactiver le bouton si le champ est vide
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CoachChatBot;