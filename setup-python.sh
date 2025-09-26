#!/bin/bash
# setup-python.sh - Script d'installation des dépendances Python

echo "🐍 Configuration de l'environnement Python pour la stéganographie..."

# Détecter l'OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "📋 Système détecté: Linux"
    PYTHON_CMD="python3"
    PIP_CMD="pip3"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    echo "📋 Système détecté: Windows"
    PYTHON_CMD="python"
    PIP_CMD="pip"
else
    echo "📋 Système détecté: Autre ($OSTYPE)"
    PYTHON_CMD="python3"
    PIP_CMD="pip3"
fi

# Vérifier que Python est installé
if ! command -v $PYTHON_CMD &> /dev/null; then
    echo "❌ Python n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Python trouvé: $($PYTHON_CMD --version)"

# Option 1: Installation globale
echo "🔧 Installation des dépendances Python..."
$PIP_CMD install stegano pillow

if [ $? -eq 0 ]; then
    echo "✅ Dépendances installées avec succès!"
    echo "🐍 Python executable: $(which $PYTHON_CMD)"
    
    # Créer le fichier de configuration
    echo "PYTHON_EXECUTABLE=$PYTHON_CMD" > .env.python
    echo "📝 Configuration sauvegardée dans .env.python"
else
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo "🎉 Configuration Python terminée!"