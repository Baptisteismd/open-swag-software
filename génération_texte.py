import pyttsx3
import ollama

def generer_texte(prompt):
    try:
        # Appeler le modèle avec Ollama
        reponse = ollama.generate(
            model="llama3.2:3b",
            prompt=prompt
        )

        # Extraire et retourner uniquement le texte généré
        if isinstance(reponse, dict) and 'response' in reponse:
            return reponse['response']
        else:
            print("Erreur : 'response' introuvable dans la réponse.")
            return None

    except Exception as e:
        # Gestion des erreurs plus détaillée
        print(f"Erreur lors de l'exécution du modèle : {str(e)}")
        return None

def main():
    prompt = input("Bonjour, je suis Victor votre esclave virtuel comment puis je vous aider ?\n entrer 2 si vous voulez quitter :\n\n   ")    
    while prompt != "2":
        text = generer_texte(prompt)
        
        if text:
            print("Texte généré :", text)
        else:
            print("Aucun texte à lire.")


# Exécution du programme principal
if __name__ == "__main__":
    main()
