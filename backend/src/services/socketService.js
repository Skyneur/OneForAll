import { v4 as uuidv4 } from 'uuid';

// Stockage en mémoire des clients connectés
const connectedClients = new Map();
const chatRooms = new Map();

/**
 * Configuration des gestionnaires Socket.IO
 * @param {Server} io - Instance Socket.IO
 */
export function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`👤 Nouveau client connecté: ${socket.id}`);
    
    // Stockage des informations du client
    const clientInfo = {
      id: socket.id,
      userId: null,
      username: null,
      joinedAt: new Date(),
      currentRoom: null
    };
    
    connectedClients.set(socket.id, clientInfo);
    
    // Gestion de l'authentification du client
    socket.on('user:authenticate', (data) => {
      try {
        const { username, userId } = data;
        
        if (!username) {
          socket.emit('error', { message: 'Nom d\'utilisateur requis' });
          return;
        }
        
        // Mise à jour des informations du client
        clientInfo.username = username;
        clientInfo.userId = userId || uuidv4();
        
        connectedClients.set(socket.id, clientInfo);
        
        console.log(`✅ Client authentifié: ${username} (${socket.id})`);
        
        socket.emit('user:authenticated', {
          userId: clientInfo.userId,
          username: clientInfo.username,
          sessionId: socket.id
        });
        
        // Notifier les autres clients
        socket.broadcast.emit('user:joined', {
          userId: clientInfo.userId,
          username: clientInfo.username
        });
        
      } catch (error) {
        console.error('Erreur authentification:', error);
        socket.emit('error', { message: 'Erreur lors de l\'authentification' });
      }
    });
    
    // Gestion de rejoindre une room de chat
    socket.on('room:join', (data) => {
      try {
        const { roomId } = data;
        
        if (!roomId) {
          socket.emit('error', { message: 'ID de room requis' });
          return;
        }
        
        // Quitter la room précédente si applicable
        if (clientInfo.currentRoom) {
          socket.leave(clientInfo.currentRoom);
          socket.to(clientInfo.currentRoom).emit('user:left_room', {
            userId: clientInfo.userId,
            username: clientInfo.username,
            roomId: clientInfo.currentRoom
          });
        }
        
        // Rejoindre la nouvelle room
        socket.join(roomId);
        clientInfo.currentRoom = roomId;
        
        // Initialiser la room si elle n'existe pas
        if (!chatRooms.has(roomId)) {
          chatRooms.set(roomId, {
            id: roomId,
            name: `Room ${roomId}`,
            clients: new Set(),
            messages: [],
            createdAt: new Date()
          });
        }
        
        const room = chatRooms.get(roomId);
        room.clients.add(socket.id);
        
        console.log(`🏠 ${clientInfo.username} a rejoint la room ${roomId}`);
        
        socket.emit('room:joined', {
          roomId: roomId,
          roomInfo: {
            id: room.id,
            name: room.name,
            clientCount: room.clients.size
          },
          recentMessages: room.messages.slice(-50) // Derniers 50 messages
        });
        
        // Notifier les autres clients de la room
        socket.to(roomId).emit('user:joined_room', {
          userId: clientInfo.userId,
          username: clientInfo.username,
          roomId: roomId
        });
        
      } catch (error) {
        console.error('Erreur rejoindre room:', error);
        socket.emit('error', { message: 'Erreur lors de la connexion à la room' });
      }
    });
    
    // Gestion des messages de chat
    socket.on('chat:message', (data) => {
      try {
        const { message, roomId } = data;
        
        if (!clientInfo.username) {
          socket.emit('error', { message: 'Non authentifié' });
          return;
        }
        
        if (!message || message.trim().length === 0) {
          socket.emit('error', { message: 'Message vide' });
          return;
        }
        
        if (message.length > (process.env.MAX_MESSAGE_LENGTH || 1000)) {
          socket.emit('error', { message: 'Message trop long' });
          return;
        }
        
        const targetRoom = roomId || clientInfo.currentRoom;
        
        if (!targetRoom) {
          socket.emit('error', { message: 'Aucune room active' });
          return;
        }
        
        const messageData = {
          id: uuidv4(),
          userId: clientInfo.userId,
          username: clientInfo.username,
          message: message.trim(),
          roomId: targetRoom,
          timestamp: new Date(),
          type: 'user'
        };
        
        // Sauvegarder le message dans la room
        const room = chatRooms.get(targetRoom);
        if (room) {
          room.messages.push(messageData);
          
          // Garder seulement les 100 derniers messages
          if (room.messages.length > 100) {
            room.messages = room.messages.slice(-100);
          }
        }
        
        console.log(`💬 Message de ${clientInfo.username} dans ${targetRoom}: ${message}`);
        
        // Diffuser le message à tous les clients de la room
        io.to(targetRoom).emit('chat:message', messageData);
        
      } catch (error) {
        console.error('Erreur message chat:', error);
        socket.emit('error', { message: 'Erreur lors de l\'envoi du message' });
      }
    });
    
    // Gestion des messages privés
    socket.on('chat:private_message', (data) => {
      try {
        const { message, targetUserId } = data;
        
        if (!clientInfo.username) {
          socket.emit('error', { message: 'Non authentifié' });
          return;
        }
        
        // Trouver le socket du destinataire
        const targetClient = Array.from(connectedClients.values())
          .find(client => client.userId === targetUserId);
        
        if (!targetClient) {
          socket.emit('error', { message: 'Utilisateur non trouvé' });
          return;
        }
        
        const messageData = {
          id: uuidv4(),
          fromUserId: clientInfo.userId,
          fromUsername: clientInfo.username,
          toUserId: targetUserId,
          toUsername: targetClient.username,
          message: message.trim(),
          timestamp: new Date(),
          type: 'private'
        };
        
        // Envoyer le message au destinataire
        io.to(targetClient.id).emit('chat:private_message', messageData);
        
        // Confirmer l'envoi à l'expéditeur
        socket.emit('chat:private_message_sent', messageData);
        
        console.log(`🔒 Message privé de ${clientInfo.username} vers ${targetClient.username}`);
        
      } catch (error) {
        console.error('Erreur message privé:', error);
        socket.emit('error', { message: 'Erreur lors de l\'envoi du message privé' });
      }
    });
    
    // Obtenir la liste des clients connectés
    socket.on('clients:list', () => {
      const clientsList = Array.from(connectedClients.values())
        .filter(client => client.username)
        .map(client => ({
          userId: client.userId,
          username: client.username,
          currentRoom: client.currentRoom,
          joinedAt: client.joinedAt
        }));
      
      socket.emit('clients:list', clientsList);
    });
    
    // Obtenir les informations d'une room
    socket.on('room:info', (data) => {
      const { roomId } = data;
      const room = chatRooms.get(roomId);
      
      if (room) {
        socket.emit('room:info', {
          id: room.id,
          name: room.name,
          clientCount: room.clients.size,
          createdAt: room.createdAt
        });
      } else {
        socket.emit('error', { message: 'Room non trouvée' });
      }
    });
    
    // Gestion de la déconnexion
    socket.on('disconnect', (reason) => {
      console.log(`👋 Client déconnecté: ${socket.id} (${reason})`);
      
      const client = connectedClients.get(socket.id);
      
      if (client) {
        // Retirer de la room actuelle
        if (client.currentRoom) {
          const room = chatRooms.get(client.currentRoom);
          if (room) {
            room.clients.delete(socket.id);
          }
          
          // Notifier les autres clients de la room
          socket.to(client.currentRoom).emit('user:left_room', {
            userId: client.userId,
            username: client.username,
            roomId: client.currentRoom
          });
        }
        
        // Notifier tous les clients
        if (client.username) {
          socket.broadcast.emit('user:left', {
            userId: client.userId,
            username: client.username
          });
        }
        
        // Supprimer le client de la liste
        connectedClients.delete(socket.id);
      }
    });
    
    // Gestion des erreurs socket
    socket.on('error', (error) => {
      console.error(`❌ Erreur socket ${socket.id}:`, error);
    });
  });
  
  // Log périodique des statistiques
  setInterval(() => {
    const totalClients = connectedClients.size;
    const authenticatedClients = Array.from(connectedClients.values())
      .filter(client => client.username).length;
    const totalRooms = chatRooms.size;
    
    console.log(`📊 Stats: ${totalClients} clients connectés (${authenticatedClients} authentifiés), ${totalRooms} rooms actives`);
  }, 300000); // Toutes les 5 minutes
}

/**
 * Obtenir les statistiques du serveur
 */
export function getServerStats() {
  return {
    connectedClients: connectedClients.size,
    authenticatedClients: Array.from(connectedClients.values())
      .filter(client => client.username).length,
    activeRooms: chatRooms.size,
    uptime: process.uptime()
  };
}

/**
 * Diffuser un message système à tous les clients
 */
export function broadcastSystemMessage(message, roomId = null) {
  const messageData = {
    id: uuidv4(),
    message: message,
    timestamp: new Date(),
    type: 'system'
  };
  
  if (roomId && chatRooms.has(roomId)) {
    // Message à une room spécifique
    const room = chatRooms.get(roomId);
    room.messages.push(messageData);
    
    io.to(roomId).emit('chat:message', messageData);
  } else {
    // Message global
    io.emit('chat:system_message', messageData);
  }
}