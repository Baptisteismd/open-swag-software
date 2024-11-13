import json
import os
import ollama

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

def charger_conversation(nom_fichier):
    if os.path.exists(nom_fichier):
        with open(nom_fichier, 'r') as fichier:
            return json.load(fichier)
    return []

def sauvegarder_conversation(nom_fichier, conversation):
    with open(nom_fichier, 'w') as fichier:
        json.dump(conversation, fichier, indent=4)

def configurer_role():
    roles_directives = {
        "prof de philo": "En tant que professeur de philosophie, vous devez répondre de manière introspective et encourager la réflexion.En 30 mots maximum",
        "conseiller en carrière": "En tant que conseiller en carrière, fournissez des conseils pratiques pour la planification de carrière.En 30 mots maximum",
        "assistant personnel": "En tant qu'assistant personnel, répondez de manière concise pour organiser la vie quotidienne.En 30 mots maximum"
    }
    
    print("Choisissez un rôle :")
    for role in roles_directives.keys():
        print(f" - {role}")
    
    role = input("Entrez le rôle souhaité : ").strip().lower()
    directive = roles_directives.get(role, "Je suis votre assistant virtuel, prêt à répondre à vos questions.")
    
    return role, directive

# Fonction de génération avec le contexte des échanges précédents
def génération(role, directive, conversation):
    print(f"Bonjour, je suis votre {role} virtuel. {directive}")
    prompt = input("Comment puis-je vous aider ? Entrez '2' pour quitter.\n\n")

    while prompt != "2":
        # Créer un contexte avec les échanges précédents (dernier 5)
        contexte = "\n".join(
            [f"Question: {e['question']}\nRéponse: {e['response']}" for e in conversation[-5:]]
        )
        texte_complet = f"{directive}\n{contexte}\nQuestion: {prompt}"

        # Générer la réponse en utilisant le contexte
        text = generer_texte(texte_complet)
        
        if text:
            print("Texte généré :", text)
            # Ajouter l'échange dans la conversation
            conversation.append({"question": prompt, "response": text})
        else:
            print("Aucun texte à lire.")
        
        prompt = input("Entrez votre prochain message ou '2' pour quitter :\n")

if __name__ == "__main__":
    nom_fichier = "conversation.json"
    conversation = charger_conversation(nom_fichier)
    if conversation:
        print("Reprise de la conversation précédente :")
        for exchange in conversation:
            print(f"Question: {exchange['question']}")
            print(f"Réponse: {exchange['response']}\n")

    role, directive = configurer_role()
    génération(role, directive, conversation)
    sauvegarder_conversation(nom_fichier, conversation)
