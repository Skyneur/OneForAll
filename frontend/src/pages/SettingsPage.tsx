import React, { useState, useEffect } from 'react';
import { Settings, Shield, Eye, Database, Moon, Sun, Volume2, VolumeX, Bell, BellOff, Globe, Trash2, Download, Upload, Clock, UserX, Wifi, WifiOff, Languages, Save, Zap, Battery } from 'lucide-react';
import './SettingsPage.css';
import logo from '../assets/images/logo.png';

// Interface pour les paramètres
interface AppSettings {
  security: {
    encryption: boolean;
    autoDestructMessages: boolean;
    anonymousMode: boolean;
    offlineMode: boolean;
  };
  interface: {
    darkMode: boolean;
    soundEnabled: boolean;
    notifications: boolean;
    language: string;
    autoSave: boolean;
  };
  survival: {
    emergencyMode: boolean;
    lowPowerMode: boolean;
    offlineData: boolean;
    locationTracking: boolean;
  };
}

export const SettingsPage: React.FC = () => {
  // État des paramètres avec localStorage
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('survivalAppSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      security: {
        encryption: true,
        autoDestructMessages: true,
        anonymousMode: true,
        offlineMode: false,
      },
      interface: {
        darkMode: true,
        soundEnabled: true,
        notifications: true,
        language: 'fr',
        autoSave: true,
      },
      survival: {
        emergencyMode: false,
        lowPowerMode: false,
        offlineData: true,
        locationTracking: false,
      }
    };
  });

  // Sauvegarder les paramètres dans localStorage
  useEffect(() => {
    localStorage.setItem('survivalAppSettings', JSON.stringify(settings));
    
    // Appliquer le mode sombre
    if (settings.interface.darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [settings]);

  // Fonction pour mettre à jour un paramètre
  const updateSetting = (category: keyof AppSettings, key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  // Fonction pour réinitialiser les paramètres
  const resetSettings = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      localStorage.removeItem('survivalAppSettings');
      window.location.reload();
    }
  };

  // Fonction pour exporter les paramètres
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'survival_app_settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Fonction pour importer les paramètres
  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
        } catch (error) {
          alert('Erreur lors de l\'importation des paramètres');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="settings-page">
      <div className="container">
        <div className="settings-header">
          <Settings size={32} />
          <h1>Centre de Contrôle</h1>
          <p>Configuration avancée pour la survie</p>
        </div>

        <div className="settings-sections">
          {/* Section Sécurité */}
          <section className="setting-section">
            <div className="section-header">
              <Shield size={24} />
              <h2>Sécurité & Protection</h2>
            </div>
            
            <div className="setting-item">
              <div className="setting-icon">
                <Shield size={20} />
              </div>
              <div className="setting-info">
                <h3>Chiffrement des données</h3>
                <p>Protège vos informations sensibles avec un chiffrement AES-256</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.security.encryption}
                  onChange={(e) => updateSetting('security', 'encryption', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Clock size={20} />
              </div>
              <div className="setting-info">
                <h3>Auto-destruction des messages</h3>
                <p>Supprime automatiquement les messages après 24 heures</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.security.autoDestructMessages}
                  onChange={(e) => updateSetting('security', 'autoDestructMessages', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <UserX size={20} />
              </div>
              <div className="setting-info">
                <h3>Mode anonyme</h3>
                <p>Cache votre identité et vos données personnelles</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.security.anonymousMode}
                  onChange={(e) => updateSetting('security', 'anonymousMode', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                {settings.security.offlineMode ? <WifiOff size={20} /> : <Wifi size={20} />}
              </div>
              <div className="setting-info">
                <h3>Mode hors ligne complet</h3>
                <p>Désactive toutes les connexions réseau</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.security.offlineMode}
                  onChange={(e) => updateSetting('security', 'offlineMode', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </section>

          {/* Section Interface */}
          <section className="setting-section">
            <div className="section-header">
              <Eye size={24} />
              <h2>Interface & Expérience</h2>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                {settings.interface.darkMode ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div className="setting-info">
                <h3>Mode sombre</h3>
                <p>Interface adaptée aux environnements peu éclairés</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.interface.darkMode}
                  onChange={(e) => updateSetting('interface', 'darkMode', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                {settings.interface.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </div>
              <div className="setting-info">
                <h3>Sons et alertes</h3>
                <p>Notifications sonores pour les alertes importantes</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.interface.soundEnabled}
                  onChange={(e) => updateSetting('interface', 'soundEnabled', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                {settings.interface.notifications ? <Bell size={20} /> : <BellOff size={20} />}
              </div>
              <div className="setting-info">
                <h3>Notifications push</h3>
                <p>Alertes en temps réel pour les urgences</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.interface.notifications}
                  onChange={(e) => updateSetting('interface', 'notifications', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Languages size={20} />
              </div>
              <div className="setting-info">
                <h3>Langue</h3>
                <p>Langue de l'interface utilisateur</p>
              </div>
              <select
                className="setting-select"
                value={settings.interface.language}
                onChange={(e) => updateSetting('interface', 'language', e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Save size={20} />
              </div>
              <div className="setting-info">
                <h3>Sauvegarde automatique</h3>
                <p>Sauvegarde vos données toutes les 5 minutes</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.interface.autoSave}
                  onChange={(e) => updateSetting('interface', 'autoSave', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </section>

          {/* Section Survie */}
          <section className="setting-section">
            <div className="section-header">
              <Database size={24} />
              <h2>Mode Survie</h2>
            </div>

            <div className="setting-item emergency">
              <div className="setting-icon emergency">
                <Zap size={20} />
              </div>
              <div className="setting-info">
                <h3>Mode d'urgence</h3>
                <p>Active les fonctions critiques de survie uniquement</p>
              </div>
              <label className="toggle-switch emergency">
                <input
                  type="checkbox"
                  checked={settings.survival.emergencyMode}
                  onChange={(e) => updateSetting('survival', 'emergencyMode', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Battery size={20} />
              </div>
              <div className="setting-info">
                <h3>Mode économie d'énergie</h3>
                <p>Réduit la consommation de batterie</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.survival.lowPowerMode}
                  onChange={(e) => updateSetting('survival', 'lowPowerMode', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Database size={20} />
              </div>
              <div className="setting-info">
                <h3>Données hors ligne</h3>
                <p>Télécharge les guides pour utilisation sans connexion</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.survival.offlineData}
                  onChange={(e) => updateSetting('survival', 'offlineData', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-icon">
                <Globe size={20} />
              </div>
              <div className="setting-info">
                <h3>Localisation GPS</h3>
                <p>Utilise votre position pour des conseils adaptés</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.survival.locationTracking}
                  onChange={(e) => updateSetting('survival', 'locationTracking', e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </section>

          {/* Section Actions */}
          <section className="setting-section">
            <div className="section-header">
              <Database size={24} />
              <h2>Gestion des Données</h2>
            </div>

            <div className="setting-actions">
              <button className="action-button export" onClick={exportSettings}>
                <Download size={20} />
                Exporter les paramètres
              </button>

              <label className="action-button import">
                <Upload size={20} />
                Importer les paramètres
                <input
                  type="file"
                  accept=".json"
                  onChange={importSettings}
                  style={{ display: 'none' }}
                />
              </label>

              <button className="action-button danger" onClick={resetSettings}>
                <Trash2 size={20} />
                Réinitialiser tout
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};