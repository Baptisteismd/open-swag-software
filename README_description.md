# 🌟 Open Source Software Project: MetAI Reader 🌟

---

## 1️⃣ Introduction  

### 1.1. 📖 Presentation of our project  
**IA Reader** is a cutting-edge interactive artificial intelligence application designed to deliver a personalized and immersive user experience.  
Combining:
- 🧠 **Advanced AI for text generation**,  
- 🖥️ **A Java-based graphical user interface**,  
- 🎙️ **Voice synthesis for natural interactions**,  

IA Reader empowers users to engage with AI in a way that feels intuitive and tailored to their needs.  
Its unique twist? Users can **choose a role**, and the AI adjusts its responses and tone accordingly, making the experience dynamic and engaging!  

### 1.2. 🎯 Our Objectives  
Our project aimed to achieve the following:
1. Create an AI that delivers **role-specific, contextually relevant responses**.  
2. **Humanize the interaction** using natural voice synthesis.  
3. Provide users with a **flexible, intuitive interface** to interact seamlessly with the chatbot.  

---

## 2️⃣ Content  

### 2.1. 👥 Tasks for each member  
Each member of our team contributed their expertise to specific aspects of the project:  
- **Hugo Visarak**: 🎙️ Integrated voice synthesis into the chatbot and ensured detailed project documentation.  
- **Baptiste**: 🧑‍💻 Optimized the backend using Flask and configured the AI responses.  
- **Théo Koehler**: 🖥️ Developed the sleek Java-based interface for role selection and user interaction.  
- **Margaux Girona**: 🔗 Bridged the generative AI with the chatbot interface and ensured conversation continuity.  

### 2.2. 🧠 Implementation of the generative AI  
The heart of our system is the **`llama3.2:3b` model**, integrated via the `ollama` library.  
- 🔄 **Flask API** manages user input (role + question) and provides AI-generated responses.  
- 💾 **JSON** stores the last five exchanges for a conversational flow.  
- 🎭 Role-specific directives ensure responses are aligned with the user’s choice.  

### 2.3. 🎙️ Voice Synthesis for Personalities  
We introduced **voice synthesis** to bring each role to life:  
- **Friend** 🤗: Your supportive buddy, always ready to chat casually and make things fun.  
- **Girlfriend** 💕: A caring and empathetic partner for emotional, understanding conversations.  
- **Coach** 🏋️‍♂️: Your motivator, offering practical advice and a push toward your goals!  

Each voice was tailored to match the personality, making the interaction feel natural and relatable.  

### 2.4. 🖥️ User Interface Configuration  
The interface was built in **Java** for:  
- 🎨 A **clean and intuitive design** that lets users select their preferred role effortlessly.  
- 💬 **Interactive chats** where questions are answered in real-time.  
- 🔊 Integration with **voice playback** for auditory responses.  

### 2.5. 🔗 Connecting Generative AI and the Interface  
The integration of the backend AI with the user-facing chatbot involved:  
1. Sending user inputs from the Java interface to the Flask API.  
2. Generating role-specific responses via the AI model.  
3. Returning the response to the interface for display and voice playback.  
4. Updating and storing conversation history in a shared **JSON file**.  

---

## 3️⃣ Technical Features  

### 🚀 Backend  
- **Flask-based API** to handle user requests and manage context.  

### 🤖 AI Model  
- Integration of the `llama3.2:3b` model via `ollama`, with custom role-specific directives.  

### 💾 Conversation Persistence  
- JSON file (`conversation.json`) for storing user exchanges and maintaining context.  

### 🎭 Role-Specific Responses  
- Predefined instructions guide the tone and style of responses for each role.  

### ⚙️ Error Handling  
- Robust mechanisms for smooth execution and debugging.  

---

## 4️⃣ Technologies Used  

### 🐍 Python (Flask)  
- **API Management**: To process user input and interact with the AI.  
- **Conversation History**: Managing user exchanges via JSON for a consistent experience.  

### 🧠 AI Model Integration  
- The `ollama` library integrates **`llama3.2:3b`** for intelligent, context-aware responses.  

### 🔊 Voice Synthesis  
- Adds personality and accessibility by generating **role-specific voices**.  

### ☕ Java  
- Developed a **sleek, responsive interface** for interaction and role selection.  

### 💾 JSON  
- **Stores user conversations** for continuity and context.  

### 🛠️ Collaboration Tools  
- **Git & GitHub**: For seamless version control.  
- **Spyder, PyCharm, IntelliJ/Eclipse**: For debugging and optimizing the backend and UI.  

---

## 5️⃣ Development Process  

### Backend Design  
- Developed a **Flask API** to process user requests and maintain conversation context.  

### Graphical Interface  
- Created an **interactive Java UI** for role selection and chat visualization.  

### Testing & Optimization  
- Tested responses for coherence, continuity, and role accuracy.  

---

## 6️⃣ Meet the Team 👩‍💻👨‍💻  
- **Margaux Girona**  
- **Baptiste**  
- **Hugo Visarak**  
- **Théo Koehler**  

💪 Together, we designed, built, and refined **MetAI Reader** to deliver an innovative experience.  

---

## 7️⃣ Conclusion 💡  
**MetAI Reader** reflects our passion for creating **human-like interactions** with AI.  
By integrating **voice synthesis, customizable personalities**, and **advanced generative AI**, we’ve crafted a system that is both accessible and engaging.  
This project taught us the importance of collaboration, problem-solving, and the power of AI tools to enhance everyday interactions.  

🔗 **Stay curious and keep innovating!**

---

## 8️⃣ Simulation of our Interface 🎥  
👉 *Video demo to be added soon!*




[about pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
