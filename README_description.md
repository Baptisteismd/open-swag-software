# **Open source software project : MetAI Reader**  
### **An Interactive and Immersive AI Application**  

MetAI Reader is an innovative artificial intelligence application designed to offer a personalized and engaging user experience. It leverages cutting-edge technologies to allow users to interact with the AI naturally. Through a user-friendly interface and immersive voice synthesis, MetAI Reader adapts its responses based on the role chosen by the user, making every interaction unique and dynamic.  

---

## **Objectives**  
MetAI Reader aims to redefine human-AI interactions by creating a system that provides contextually relevant and role-adapted responses. By adding a human touch with voice synthesis, it enhances user accessibility while ensuring a simple and intuitive interface.  

---

## **Project Structure**  
MetAI Reader consists of several interconnected modules:  

### **Team Contributions**  
- **Hugo Virasak**: Integrated voice synthesis and detailed project documentation.  
- **Baptiste**: Optimized the backend with Flask and response generation.  
- **Théo Koehler**: Designed the Java interface for seamless interaction.  
- **Margaux Girona**: Worked on bridging the AI responses with the user interface for smooth conversational flow.  

---

## **AI Functionality**  
At its core, MetAI Reader uses the **llama3.2:3b** model via the Ollama library to handle user input and generate role-aligned responses.  

A Flask API acts as a central hub, managing communication between the graphical interface and the AI model while maintaining a JSON-based record of the last five exchanges to ensure contextual continuity.  

Each role (friend, girlfriend, coach) comes with predefined directives, allowing the AI to adopt the appropriate tone and style for each interaction.  

---

## **Voice Synthesis**  
Voice synthesis adds an auditory dimension to the user experience, with tailored voices for each role:  
- **Friend**: Warm and casual, ideal for friendly chats.  
- **Girlfriend**: Empathetic and caring, suited for personal conversations.  
- **Coach**: Motivational and direct, offering encouragement and advice.  

---

## **User Interface**  
The Java-based graphical user interface (GUI) enables users to:  
- Select roles easily.  
- View conversations in real time.  
- Listen to AI responses through voice synthesis.  

Its clean, intuitive design ensures a smooth and enjoyable experience.  

---

## **Technical Architecture**  
MetAI Reader is built on a robust and modular architecture to ensure extensibility and easy maintenance.  

- **Flask Backend**: A lightweight Python framework that handles user requests, model interactions, and conversation context.  
- **Ollama Library**: Simplifies interaction with the **llama3.2:3b** language model, enabling efficient and contextually relevant response generation.  
- **JSON Conversation History**: Maintains a lightweight, easily manageable log of the last five exchanges to provide continuity.  
- **Voice Synthesis**: Converts text responses into audio, making interactions more natural and accessible.  
- **Java GUI**: Offers an interactive and intuitive platform for users to interact with the AI in real time.  

---

## **Technologies Used**  
MetAI Reader combines several modern and proven technologies:  

### **Python (Flask)**  
Flask, a lightweight web framework, powers the backend. It manages user requests, AI interactions, and conversation continuity, making it ideal for rapid development and integration.  

### **Java**  
Java powers the GUI, ensuring a stable and interactive user experience. Its robustness and extensive library support make it perfect for creating intuitive interfaces.  

### **Ollama**  
The Ollama library integrates advanced language models like **llama3.2:3b** seamlessly, generating accurate and context-aware responses efficiently.  

### **JSON**  
JSON stores conversation history, ensuring continuity between exchanges while maintaining a lightweight and fast data format.  

### **Voice Synthesis**  
This feature converts text into speech, enriching user interaction with personalized voices for each role.  

### **Git & GitHub**  
Git and GitHub manage source code, track changes, and facilitate team collaboration, ensuring version control and project transparency.  

### **Development Environments**  
Tools like Spyder and PyCharm support Python backend development, while IntelliJ and Eclipse streamline Java interface design and debugging.  

---

## **Development & Testing**  
Development was divided into key phases:  
1. Building the Flask backend for centralized interactions.  
2. Designing the intuitive Java GUI.  
3. Integrating the AI and UI for seamless two-way communication.  
4. Testing and optimizing response relevance and interaction fluidity.  

---

## **Conclusion**  
MetAI Reader demonstrates our vision for more human-like AI interactions. By combining personalized voice synthesis, an intuitive interface, and generative intelligence, this project illustrates how AI can enhance everyday life.  

We hope MetAI Reader opens new possibilities for immersive and personalized AI interactions.



[about pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
