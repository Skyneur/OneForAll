import express from 'express';
import { getServerStats } from '../services/socketService.js';
import { v4 as uuidv4 } from 'uuid';

// Export une fonction qui prend l'instance io et retourne le router
export default function createChatRoutes(io) {
  const router = express.Router();
  
  // Fonction locale pour diffuser des messages système
  function broadcastSystemMessage(message, roomId = null) {
    const messageData = {
      id: uuidv4(),
      message: message,
      timestamp: new Date(),
      type: 'system'
    };
    
    if (roomId) {
      // Message à une room spécifique
      io.to(roomId).emit('chat:message', messageData);
    } else {
      // Message global
      io.emit('chat:system_message', messageData);
    }
  }

/**
 * GET /api/chat/stats
 * Obtenir les statistiques du serveur de chat
 */
router.get('/stats', (req, res) => {
  try {
    const stats = getServerStats();
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erreur récupération stats:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    });
  }
});

/**
 * POST /api/chat/system-message
 * Envoyer un message système à tous les clients ou à une room spécifique
 */
  router.post('/system', (req, res) => {
  try {
    const { message, roomId } = req.body;
    
    broadcastSystemMessage(message, roomId);
    
    res.json({
      success: true,
      message: 'Message système envoyé',
      data: {
        message,
        roomId: roomId || 'global',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erreur envoi message système:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi du message système'
    });
  }
});

/**
 * GET /api/chat/health
 * Vérifier la santé du service de chat
 */
router.get('/health', (req, res) => {
  try {
    const stats = getServerStats();
    const isHealthy = stats.connectedClients >= 0; // Toujours true, mais extensible
    
    res.status(isHealthy ? 200 : 503).json({
      success: isHealthy,
      status: isHealthy ? 'healthy' : 'unhealthy',
      data: {
        ...stats,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime()
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erreur vérification santé:', error);
    res.status(503).json({
      success: false,
      status: 'error',
      error: 'Impossible de vérifier la santé du service'
    });
  }
});

/**
 * POST /api/chat/webhook
 * Endpoint pour recevoir des messages depuis des scripts externes
 */
router.post('/webhook', (req, res) => {
  try {
    const { 
      message, 
      username = 'Script', 
      roomId = 'general',
      type = 'bot' 
    } = req.body;
    
    // Validation supplémentaire pour les webhooks
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message requis et doit être une chaîne de caractères'
      });
    }
    
    if (message.length > (process.env.MAX_MESSAGE_LENGTH || 1000)) {
      return res.status(400).json({
        success: false,
        error: `Message trop long (max ${process.env.MAX_MESSAGE_LENGTH || 1000} caractères)`
      });
    }
    
    // Créer un faux ID unique pour le webhook
    const webhookId = `webhook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Construire le message
    const messageData = {
      id: webhookId,
      userId: webhookId,
      username: username,
      message: message.trim(),
      roomId: roomId,
      timestamp: new Date(),
      type: type
    };
    
    // Diffuser le message via Socket.IO à tous les clients connectés
    // (pour les webhooks, on diffuse globalement pour s'assurer que tous les clients voient le message)
    io.emit('chat:message', messageData);
    
    res.json({
      success: true,
      message: 'Message envoyé via webhook',
      data: {
        messageId: webhookId,
        username,
        roomId,
        timestamp: messageData.timestamp
      }
    });
    
    console.log(`📨 Webhook reçu de ${username} pour room ${roomId}: ${message}`);
    
  } catch (error) {
    console.error('Erreur webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors du traitement du webhook'
    });
  }
});

/**
 * GET /api/chat/rooms
 * Obtenir la liste des rooms actives (endpoint pour scripts externes)
 */
router.get('/rooms', (req, res) => {
  try {
    // Pour l'instant, on retourne des rooms par défaut
    // Cela peut être étendu pour récupérer les vraies rooms depuis socketService
    const defaultRooms = [
      {
        id: 'general',
        name: 'Général',
        description: 'Chat général pour tous les utilisateurs'
      },
      {
        id: 'support',
        name: 'Support',
        description: 'Room de support technique'
      },
      {
        id: 'dev',
        name: 'Développement',
        description: 'Discussions techniques et développement'
      }
    ];
    
    res.json({
      success: true,
      data: defaultRooms,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erreur récupération rooms:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des rooms'
    });
  }
});

  return router;
}