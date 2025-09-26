import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, MessageCircle, Shield, Settings, Image } from 'lucide-react';
import './Navigation.css';
import logo from '../assets/images/logo.png';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Shield, label: 'Accueil' },
    { path: '/documentation', icon: Book, label: 'Documentation' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/steganography', icon: Image, label: 'Stéganographie' },
    { path: '/settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <img src={logo} alt="OneForAll Logo" className="nav-logo" />
          <h1>OneForAll</h1>
        </div>
        
        <ul className="nav-menu">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};