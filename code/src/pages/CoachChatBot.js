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

          // nouvelle ligne : déclencher le text-to-speech pour la réponse du coach
          speakCoachResponse(data.response);

        } else if (data.error) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Error: ' + data.error, user: false },
          ]);
        }
      } catch (error) {
        // Gérer les erreurs de connexion et variable errorMessage ajouté pour éviter la répétition du message.
        const errorMessage = '오류가 발생했습니다: 서버에 연결할 수 없습니다.'//'connexion sans succès' //Error: Unable to connect to the server.
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: errorMessage, user: false }, 
        ]);
        // Nouvelle ligne ajoutée pour tester la voix en cas d'erreur : Speak the error message
        speakCoachResponse(errorMessage); 
      }
    }
  };

  // Gestion de la touche "Entrée" pour envoyer un message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // nouvelles fonctions pour le text-to-speech
  
  // fonction pour détecter la langue utilisée par la réponse générée
  const detectLanguage = (text) => 
  {
    if (/[\u3131-\uD79D]/.test(text)) return 'ko-KR'; // pour reconnaître le coréen
    if (/\b(le|la|les|un|une|des|je|tu|il|elle|nous|vous|ils|elles|et|est|sont|pas|pour|avec|sans|cette|cela|ceci|au|aux|du|de|que|qui|où|quoi|quand|comment|parce|mais|ou|donc|or|ni|car|bientôt|fête|bonjour|merci|ça)\b|[àâçéèêëîïôûùüÿæœ]/i.test(text)) {
      return 'fr-FR';}
  // pour reconnaître le français
    return 'en-US'; // s'il n'y a d'autres langues configurées, mettons l'anglais par défaut
  }
  // fonction text-to-speech (TTS) pour la voix du coach
  const speakCoachResponse = (text) => {
    const synth = window.speechSynthesis;
    const lang = detectLanguage(text); // appel de la fonction detectLanguage

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
