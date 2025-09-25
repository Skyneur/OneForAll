import React from 'react';
import { Link } from 'react-router-dom';
import { Book, MessageCircle, Shield, Users, Zap, Eye } from 'lucide-react';
import './HomePage.css';
import logo from '../assets/images/logo.png';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Book,
      title: 'Documentation Complète',
      description: 'Guide de survie détaillé avec conseils pratiques et techniques éprouvées.',
      link: '/documentation',
      color: '#5d8a3a'
    },
    {
      icon: MessageCircle,
      title: 'Chat Sécurisé',
      description: 'Communication cryptée avec d\'autres survivants. Messages éphémères.',
      link: '/chat',
      color: '#3498db'
    },
    {
      icon: Shield,
      title: 'Sécurité & Anonymat',
      description: 'Protection de vos données et communications. Confidentialité garantie.',
      link: '/settings',
      color: '#27ae60'
    }
  ];

  const stats = [
    { icon: Users, value: '1,247', label: 'Survivants actifs' },
    { icon: Book, value: '156', label: 'Guides disponibles' },
    { icon: Zap, value: '24/7', label: 'Support communautaire' },
    { icon: Eye, value: '0', label: 'Données partagées' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo">
            <img src={logo} alt="OneForAll Logo" />
          </div>
          <h1>OneForAll</h1>
          <p className="hero-subtitle">
            Plateforme de survie et d'entraide pour survivants
          </p>
          <p className="hero-description">
            Accédez à une documentation complète de techniques de survie et 
            communiquez de manière sécurisée avec d'autres survivants.
          </p>
          <div className="hero-actions">
            <Link to="/documentation" className="btn btn-primary">
              <Book size={20} />
              Consulter la Documentation
            </Link>
            <Link to="/chat" className="btn btn-secondary">
              <MessageCircle size={20} />
              Rejoindre le Chat
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Fonctionnalités</h2>
          <div className="features-grid">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Link 
                  key={feature.title}
                  to={feature.link} 
                  className="feature-card"
                  style={{ '--accent': feature.color } as React.CSSProperties}
                >
                  <div className="feature-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2>En chiffres</h2>
          <div className="stats-grid">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="stat-card">
                  <IconComponent size={24} />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Prêt à commencer ?</h2>
          <p>
            Rejoignez notre communauté de survivants et accédez aux ressources 
            essentielles pour votre sécurité et votre survie.
          </p>
          <Link to="/documentation" className="btn btn-primary">
            Commencer maintenant
          </Link>
        </div>
      </section>
    </div>
  );
};