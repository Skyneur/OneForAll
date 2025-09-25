import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import { setupSocketHandlers } from './services/socketService.js';

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const server = createServer(app);

// Configuration Socket.IO avec CORS
const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;

// Middleware de sécurité avec CSP ajusté pour la page de test
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", // Permet les scripts inline pour la page de test
        "https://cdn.socket.io" // Permet Socket.IO CDN
      ],
      scriptSrcAttr: ["'unsafe-inline'"], // Permet les gestionnaires d'événements inline
      styleSrc: ["'self'", "'unsafe-inline'"], // Permet les styles inline
      connectSrc: [
        "'self'", 
        "ws://localhost:3001", 
        "http://localhost:3001",
        "https://cdn.socket.io" // Permet les source maps de Socket.IO
      ],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "https:", "data:"],
    },
  },
}));

// Configuration CORS pour les routes HTTP
console.log('🔧 Environment variables check:');
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  ALLOWED_ORIGINS from env:', process.env.ALLOWED_ORIGINS);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || ["http://localhost:5173"];
console.log('🔧 Parsed allowed origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    console.log('🔍 CORS Request - Origin:', origin);
    // Permettre les requêtes sans origin (ex: Postman, apps mobiles)
    if (!origin) {
      console.log('✅ No origin - allowing request');
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ Origin autorisée:', origin);
      callback(null, true);
    } else {
      console.log('❌ Origin refusée:', origin);
      console.log('❌ Allowed origins are:', allowedOrigins);
      callback(new Error('Non autorisé par CORS'), false);
    }
  },
  credentials: true
}));

// Middleware pour parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Configuration des gestionnaires Socket.IO
setupSocketHandlers(io);

// Routes API (avec accès à io)
app.use('/api/chat', chatRoutes(io));

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'OneForAll Backend API', 
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat',
      websocket: 'ws://localhost:' + PORT
    }
  });
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 API accessible sur http://localhost:${PORT}`);
  console.log(`🔌 WebSocket accessible sur ws://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

// Gestion propre de l'arrêt du serveur
process.on('SIGTERM', () => {
  console.log('⏹️  Arrêt du serveur...');
  server.close(() => {
    console.log('✅ Serveur arrêté proprement');
    process.exit(0);
  });
});

export { io };