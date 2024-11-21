import json
import os
import ollama
from flask import Flask, request, jsonify
from flask_cors import CORS  # Importer flask-cors

app = Flask(__name__)

# Activer CORS pour toutes les routes
CORS(app, resources={r"/generate": {"origins": "http://localhost:3000"}})


# Fonction pour générer du texte avec ollama
def generer_texte(prompt):
    try:
        reponse = ollama.generate(
            model="llama3.2:3b",
            prompt=prompt
        )
        if isinstance(reponse, dict) and 'response' in reponse:
            return reponse['response']
        else:
            print("Erreur : 'response' introuvable dans la réponse.")
            return None
    except Exception as e:
        print(f"Erreur lors de l'exécution du modèle : {str(e)}")
        return None

# Charger et sauvegarder les conversations
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

    # Ensure the file is created during initialization
    if not os.path.exists(nom_fichier):
        with open(nom_fichier, 'w') as fichier:
            fichier.write("{}")


# API Flask pour générer une réponse
@app.route('/generate', methods=['POST'])
def generate_response():
    data = request.get_json()

    # Récupérer les données de la requête
    role = data.get('role', '').lower()
    prompt = data.get('prompt', '')
    discussion_id = str(data.get('discussion_id', 'default'))

    # Configuration des rôles et des directives
    roles_directives = {
        "Coach": "As a coach, you must motivate and encourage individuals to achieve their personal or professional goals. Provide practical and inspiring advice. Limit your response to 30 words.",
        "Teacher": "As a teacher, you must explain concepts clearly and pedagogically while encouraging curiosity and learning. Adapt your responses to the user's level of understanding. Limit your response to 30 words.",
        "Friend": "As a friend, be empathetic and supportive. Provide advice or emotional support while remaining warm and understanding. Respond as a close and trusted friend. Limit your response to 30 words."
    }

    directive = roles_directives.get(role, "Je suis votre assistant virtuel, prêt à répondre à vos questions.")
    
    # Charger les conversations existantes
    conversations = charger_conversations()

    # Initialiser la discussion si elle n'existe pas
    if discussion_id not in conversations:
        conversations[discussion_id] = []

    # Créer un contexte avec les échanges précédents (dernier 5)
    conversation = conversations[discussion_id]
    contexte = "\n".join(
        [f"Question: {e['question']}\nRéponse: {e['response']}" for e in conversation[-5:]]
    )
    texte_complet = f"{directive}\n{contexte}\nQuestion: {prompt}"

    # Générer la réponse
    response_text = generer_texte(texte_complet)

    if response_text:
        # Ajouter l'échange dans la conversation
        conversation.append({"question": prompt, "response": response_text})
        conversations[discussion_id] = conversation
        sauvegarder_conversations(conversations)

        # Retourner la réponse
        return jsonify({"discussion_id": discussion_id, "role": role, "response": response_text})
    else:
        return jsonify({"error": "Erreur lors de la génération du texte"}), 500

if __name__ == "__main__":
    app.run(debug=True)