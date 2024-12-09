import json
import os
import ollama
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for specific routes
CORS(app, resources={r"/generate": {"origins": "http://localhost:3000"}})

# Function to generate text using ollama
def generer_texte(prompt):
    try:
        reponse = ollama.generate(
            model="llama3.2:3b",
            prompt=prompt
        )
        if isinstance(reponse, dict) and 'response' in reponse:
            return reponse['response']
        else:
            print("Error: 'response' not found in the reply.")
            return None
    except Exception as e:
        print(f"Error during model execution: {str(e)}")
        return None

# Load and save conversations
def charger_conversations():
    nom_fichier = "conversations.json"
    if os.path.exists(nom_fichier):
        with open(nom_fichier, 'r') as fichier:
            try:
                return json.load(fichier)
            except json.JSONDecodeError:
                print(f"Warning: {nom_fichier} is empty or invalid. Initializing as an empty dictionary.")
                return {}  # Return an empty dictionary if the file is empty or invalid
    return {}  # Return an empty dictionary if the file doesn't exist

def sauvegarder_conversations(conversations):
    nom_fichier = "conversations.json"
    with open(nom_fichier, 'w') as fichier:
        json.dump(conversations, fichier, indent=4)

@app.route('/clear_conversations', methods=['POST'])
def clear_conversations():
    try:
        conversations_file = 'conversations.json'
        if os.path.exists(conversations_file):
            with open(conversations_file, 'w') as file:
                file.write('')  # Clear the file content
        return jsonify({'message': 'Conversations cleared successfully.'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# API Flask to generate a response
@app.route('/generate', methods=['POST'])
def generate_response():
    data = request.get_json()

    # Retrieve data from the request
    role = data.get('role', '').lower()
    prompt = data.get('prompt', '')
    discussion_id = str(data.get('discussion_id', 'default'))

    # Role-based instructions (in English)
    roles_directives = {
        "coach": "As a coach, motivate and encourage individuals to achieve their goals. Offer practical and inspiring advice. Limit your response to 30 words.",
        "teacher": "As a teacher, explain concepts clearly and pedagogically while encouraging curiosity and learning. Tailor your responses to the user's level. Limit your response to 30 words.",
        "friend": "As a friend, be empathetic and supportive. Offer advice or emotional support warmly and understandingly. Respond like a close and trusted friend. Limit your response to 30 words."
    }

    directive = roles_directives.get(role, "I am your virtual assistant, ready to answer your questions.")

    # Load existing conversations
    conversations = charger_conversations()

    # Initialize the discussion if it doesn't exist
    if discussion_id not in conversations:
        conversations[discussion_id] = []

    # Create a context with the last 5 exchanges
    conversation = conversations[discussion_id]
    contexte = "\n".join(
        [f"Question: {e['question']}\nAnswer: {e['response']}" for e in conversation[-5:]]
    )
    texte_complet = f"{directive}\n{contexte}\nQuestion: {prompt}"

    # Generate the response
    response_text = generer_texte(texte_complet)

    if response_text:
        # Add the exchange to the conversation
        conversation.append({"question": prompt, "response": response_text})
        conversations[discussion_id] = conversation
        sauvegarder_conversations(conversations)

        # Return the response
        return jsonify({"discussion_id": discussion_id, "role": role, "response": response_text})
    else:
        return jsonify({"error": "Error during text generation"}), 500

if __name__ == "__main__":
    app.run(debug=True)
