import json
import os
import ollama
from flask import Flask, request, jsonify

app = Flask(__name__)

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
def charger_conversation(nom_fichier):
    if os.path.exists(nom_fichier):
        with open(nom_fichier, 'r') as fichier:
            return json.load(fichier)
    return []

def sauvegarder_conversation(nom_fichier, conversation):
    with open(nom_fichier, 'w') as fichier:
        json.dump(conversation, fichier, indent=4)

# API Flask pour générer une réponse
@app.route('/generate', methods=['POST'])
def generate_response():
    data = request.get_json()

    # Récupérer les données de la requête
    role = data.get('role', '').lower()
    prompt = data.get('prompt', '')

    # Configuration des rôles et des directives
    roles_directives = {
        "prof de philo": "En tant que professeur de philosophie, vous devez répondre de manière introspective et encourager la réflexion. En 30 mots maximum",
        "conseiller en carrière": "En tant que conseiller en carrière, fournissez des conseils pratiques pour la planification de carrière. En 30 mots maximum",
        "assistant personnel": "En tant qu'assistant personnel, répondez de manière concise pour organiser la vie quotidienne. En 30 mots maximum"
    }

    directive = roles_directives.get(role, "Je suis votre assistant virtuel, prêt à répondre à vos questions.")
    
    # Charger le contexte des conversations précédentes
    nom_fichier = "conversation.json"
    conversation = charger_conversation(nom_fichier)

    # Créer un contexte avec les échanges précédents (dernier 5)
    contexte = "\n".join(
        [f"Question: {e['question']}\nRéponse: {e['response']}" for e in conversation[-5:]]
    )
    texte_complet = f"{directive}\n{contexte}\nQuestion: {prompt}"

    # Générer la réponse
    response_text = generer_texte(texte_complet)

    if response_text:
        # Ajouter l'échange dans la conversation
        conversation.append({"question": prompt, "response": response_text})
        sauvegarder_conversation(nom_fichier, conversation)

        # Retourner la réponse
        return jsonify({"role": role, "response": response_text})
    else:
        return jsonify({"error": "Erreur lors de la génération du texte"}), 500

if __name__ == "__main__":
    app.run(debug=True)
