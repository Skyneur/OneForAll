import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Users, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import './ChatPage.css';

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  type: 'user' | 'bot' | 'system';
  userId: string;
}

interface Stats {
  connectedClients: number;
  authenticatedClients: number;
  activeRooms: number;
}

export const ChatPage: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [stats, setStats] = useState<Stats>({ connectedClients: 0, authenticatedClients: 0, activeRooms: 0 });
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Charger les stats périodiquement
    const loadStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/chat/stats');
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const connectToChat = (username: string) => {
    const newSocket = io('http://localhost:3001');
    
    newSocket.on('connect', () => {
      setConnected(true);
      addSystemMessage('✅ Connexion établie avec le serveur');
      newSocket.emit('user:authenticate', { username });
    });

    newSocket.on('user:authenticated', (data) => {
      setAuthenticated(true);
      setUsername(data.username);
      addSystemMessage(`🎉 Authentifié comme ${data.username}`);
      newSocket.emit('room:join', { roomId: 'general' });
    });

    newSocket.on('room:joined', (data) => {
      addSystemMessage(`🏠 Rejoint la room "${data.roomId}"`);
      
      // Afficher les messages récents
      if (data.recentMessages && data.recentMessages.length > 0) {
        data.recentMessages.forEach((msg: Message) => {
          setMessages(prev => [...prev, msg]);
        });
      }
    });

    newSocket.on('chat:message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    newSocket.on('chat:system_message', (data) => {
      addSystemMessage(`🔔 ${data.message}`);
    });

    newSocket.on('user:joined', (data) => {
      addSystemMessage(`👋 ${data.username} a rejoint le chat`);
    });

    newSocket.on('user:left', (data) => {
      addSystemMessage(`👋 ${data.username} a quitté le chat`);
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      setAuthenticated(false);
      addSystemMessage('❌ Connexion perdue');
    });

    newSocket.on('error', (error) => {
      addSystemMessage(`❌ Erreur: ${error.message}`);
    });

    setSocket(newSocket);
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    setConnected(false);
    setAuthenticated(false);
    setUsername('');
  };

  const addSystemMessage = (text: string) => {
    const systemMessage: Message = {
      id: `system_${Date.now()}`,
      username: 'System',
      message: text,
      timestamp: new Date().toISOString(),
      type: 'system',
      userId: 'system'
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !socket || !authenticated) return;

    socket.emit('chat:message', {
      message: messageInput.trim(),
      roomId: 'general'
    });

    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const usernameValue = formData.get('username') as string;
    
    if (usernameValue.trim()) {
      connectToChat(usernameValue.trim());
      setShowUsernameModal(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-page">
      {/* Modal de nom d'utilisateur */}
      {showUsernameModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <MessageCircle size={32} />
              <h2>Rejoindre le Chat</h2>
            </div>
            <form onSubmit={handleUsernameSubmit}>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur :</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Votre nom..."
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowUsernameModal(false)} className="btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-title">
            <MessageCircle size={24} />
            <h1>Chat Survivant</h1>
          </div>
          
          <div className="chat-status">
            <div className="status-indicator">
              {connected ? (
                <>
                  <Wifi size={16} />
                  <span className="status-text connected">Connecté</span>
                </>
              ) : (
                <>
                  <WifiOff size={16} />
                  <span className="status-text disconnected">Déconnecté</span>
                </>
              )}
            </div>
            
            <div className="stats-info">
              <Users size={16} />
              <span>{stats.authenticatedClients} survivants en ligne</span>
            </div>
          </div>
        </div>

        {/* Zone de messages */}
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <AlertCircle size={48} />
              <p>Aucun message pour le moment...</p>
              {!connected && (
                <button 
                  onClick={() => setShowUsernameModal(true)}
                  className="btn-primary"
                >
                  Rejoindre le chat
                </button>
              )}
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.type} ${message.userId === socket?.id ? 'own' : ''}`}
              >
                <div className="message-header">
                  <span className="message-username">{message.username}</span>
                  <span className="message-time">{formatTimestamp(message.timestamp)}</span>
                </div>
                <div className="message-content">{message.message}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <div className="message-input-container">
          {connected && authenticated ? (
            <div className="input-group">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="message-input"
              />
              <button 
                onClick={sendMessage}
                disabled={!messageInput.trim()}
                className="send-button"
              >
                <Send size={18} />
              </button>
            </div>
          ) : (
            <div className="connection-prompt">
              {connected ? (
                <span>Authentification en cours...</span>
              ) : (
                <>
                  <span>Vous devez vous connecter pour envoyer des messages</span>
                  <button 
                    onClick={() => setShowUsernameModal(true)}
                    className="btn-primary"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer avec actions */}
        {connected && (
          <div className="chat-footer">
            <div className="user-info">
              <span>Connecté en tant que <strong>{username}</strong></span>
            </div>
            <button onClick={disconnect} className="btn-danger">
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};