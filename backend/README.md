# 🔧 Backend Chat API

API Node.js avec Express et Socket.IO pour le chat temps réel.

## 🚀 Démarrage Rapide

```bash
# Installation
npm install

# Lancement
npm run dev
```

**URL:** http://localhost:3001

## 📡 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/chat/stats` | Statistiques du chat |
| `POST` | `/api/chat/webhook` | Messages depuis scripts externes |
| `POST` | `/api/chat/system` | Messages système |

## 🔌 WebSocket Events

**Client → Serveur:**
- `user:authenticate` - Connexion utilisateur
- `room:join` - Rejoindre salon
- `chat:message` - Envoyer message

**Serveur → Client:**
- `user:authenticated` - Confirmation connexion
- `chat:message` - Nouveau message
- `chat:system_message` - Message système

## 📁 Structure

```
src/
├── routes/         # API REST
├── services/       # Socket.IO
├── controllers/    # Logique métier
└── server.js       # Point d'entrée
```

## 🛠️ Technologies

- **Node.js** + **Express.js**
- **Socket.IO** (WebSocket)
- **Helmet** (Sécurité)