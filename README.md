# 🏕️ OneForAll - Application de Survie

Application web complète avec documentation de survie et chat temps réel.

## 🚀 Démarrage Rapide

```bash
# Backend (Terminal 1)
cd backend
npm install
npm run dev

# Frontend (Terminal 2)  
cd frontend
npm install
npm run dev
```

**URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📁 Structure du Projet

```
OneForAll/
├── backend/           # API Node.js + Socket.IO
│   ├── src/
│   │   ├── routes/    # API REST
│   │   ├── services/  # WebSocket
│   │   └── server.js  # Point d'entrée
│   └── package.json
│
├── frontend/          # Interface React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

## 🎨 Fonctionnalités

- **🏠 Dashboard** - Vue d'ensemble
- **📚 Documentation** - Guides de survie
- **💬 Chat** - Communication temps réel  
- **⚙️ Paramètres** - Configuration

## 🛠️ Technologies

**Backend:**
- Node.js + Express.js
- Socket.IO (WebSocket)
- Helmet (Sécurité)

**Frontend:**
- React 18 + TypeScript
- Vite (Build tool)
- Socket.IO Client

## 📡 API Externe

Envoyez des messages depuis vos scripts :

```bash
# Python
import requests
requests.post('http://localhost:3001/api/chat/webhook', json={
    'message': 'Hello depuis Python!',
    'username': 'Bot'
})

# PowerShell
$json = '{"message":"Hello!", "username":"Bot"}'
Invoke-WebRequest -Uri "http://localhost:3001/api/chat/webhook" -Method POST -Body $json -ContentType "application/json"
```

## 🎯 Utilisation

1. **Démarrez** les deux serveurs
2. **Ouvrez** http://localhost:5173
3. **Naviguez** vers la page Chat
4. **Connectez-vous** et chattez en temps réel
5. **Testez** les scripts externes pour envoyer des messages

---

**Développé pour la survie 🌱**