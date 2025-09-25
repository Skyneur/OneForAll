import React from 'react';
import { MessageCircle, Shield, Clock, Users } from 'lucide-react';
import './ChatPage.css';

export const ChatPage: React.FC = () => {
  return (
    <div className="chat-page">
      <div className="container">
        <div className="chat-placeholder">
          <div className="placeholder-icon">
            <MessageCircle size={64} />
          </div>
          
          <h1>Chat Sécurisé</h1>
          <p className="placeholder-description">
            Le système de chat crypté sera bientôt disponible. 
            Cette fonctionnalité permettra de communiquer de manière sécurisée 
            avec d'autres survivants.
          </p>

          <div className="features-preview">
            <div className="feature-item">
              <Shield size={24} />
              <div>
                <h3>Chiffrement End-to-End</h3>
                <p>Messages cryptés de bout en bout</p>
              </div>
            </div>
            
            <div className="feature-item">
              <Clock size={24} />
              <div>
                <h3>Messages Éphémères</h3>
                <p>Auto-destruction après 24h</p>
              </div>
            </div>
            
            <div className="feature-item">
              <Users size={24} />
              <div>
                <h3>Anonymat</h3>
                <p>Communication semi-anonyme</p>
              </div>
            </div>
          </div>

          <div className="coming-soon">
            <span className="badge">Bientôt disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
};