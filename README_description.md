
# Open Source Software project : MetAI Reader

# 1. Introduction

## 1.1. Presentation of our project
IA Reader is an interactive artificial intelligence application designed to provide a personalized and immersive user experience. Combining advanced text generation capabilities, a graphical user interface in Java, and voice synthesis, IA Reader enables users to interact naturally with the AI. 

The unique aspect of IA Reader is its ability to adapt responses based on the role chosen by the user, making the interaction more tailored and engaging.

## 1.2. Our objectives
The main objectives of this project are:
1. To create an AI that delivers contextually relevant and role-specific responses.
2. To enhance the naturalness of human-machine interactions using voice synthesis.
3. To provide users with a flexible, easy-to-use interface for selecting roles and interacting with the chatbot.

---

# 2. Content

## 2.1. Tasks for each member
The project was developed by a team of four members, each contributing their expertise to specific aspects:
- **Hugo**: Coordinated the integration of the chatbot's voice synthesis and managed project documentation.
- **Baptiste**: Focused on configuring and optimizing the generative AI backend using Flask.
- **Théo Koehler**: Developed the Java-based user interface for role selection and interaction.
- **Margaux Girona**: Worked on linking the generative AI with the user interface and managing conversation persistence.

## 2.2. Implementation of the generative AI
The backend leverages the `llama3.2:3b` model integrated via the `ollama` library. This model generates coherent and contextually appropriate responses for each query. Key implementation details:
- The Flask API processes user input, including the selected role and question.
- Context is maintained by referencing the last five exchanges stored in a JSON file.
- Role-specific directives guide the tone and content of the AI's responses.

## 2.3. Implementation of the voices for each personality
To enhance the user experience, voice synthesis was added for each personality:
- **Friend**: A friendly, relaxed tone to foster casual conversations.
- **Girlfriend**: A warm, empathetic voice for supportive interactions.
- **Coach**: A motivational and confident tone to inspire and guide.

The voices were configured to align with the personalities, creating a cohesive user experience.

## 2.4. Configuration of the user's interface (chatbot)
The user interface was developed in Java to ensure:
- A clean and intuitive design for selecting roles.
- A seamless interaction process where users can ask questions and receive responses.
- Real-time voice playback of the AI’s answers.

## 2.5. Link between the generative AI's implementation and the chatbot
The connection between the backend (generative AI) and the chatbot interface was established as follows:
- User input from the Java-based interface is sent to the Flask API.
- The API processes the input, queries the AI model, and returns the response.
- The response is displayed on the interface and played back using voice synthesis.
- Previous conversations are retrieved from and stored in a shared JSON file to maintain context.

---

# 3. Technical Features

### 3.1 Flask-based Backend
- Processes user requests and generates responses with role-specific directives.

### 3.2 AI Model Integration
- Integrates the `llama3.2:3b` model using the `ollama` library.

### 3.3 Conversation Persistence
- Stores user conversations in a JSON file (`conversation.json`).

### 3.4 Custom Directives
- Guides the tone and content of responses for each personality.

### 3.5 Error Management
- Ensures smooth execution by handling errors during model interaction.

---

# 4. Technologies Used
- **Python (Flask)**: Backend and API management.
- **`ollama` Library**: AI model integration.
- **Java**: User interface development.
- **JSON**: Conversation history storage.

---

# 5. Development Process

### 5.1 Backend Design and Development
- Created a Flask API to handle user requests and manage context.

### 5.2 Graphical Interface Creation in Java
- Developed an intuitive interface for role selection and interaction.

### 5.3 Testing and Optimization
- Validated the coherence of responses and ensured efficient conversation storage.

---

# 6. Team
This project was developed by:
- **Margaux**
- **Baptiste**
- **Hugo**
- **Théo**

Each member contributed to the project's design, development, and optimization.

---

# 7. Conclusion
IA Reader exemplifies a collaborative effort to innovate human-machine interactions. By integrating voice synthesis, role-specific directives, and advanced AI technology, we created a system that is both accessible and user-centric.
We learned many things and saw the real power of tools like ChatGPT 😄

We hope this project inspires others to explore new possibilities in AI-powered conversational systems.


# 8. Simulation of our interface
- Video to do of our chatbot simlulation
  


[about pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
