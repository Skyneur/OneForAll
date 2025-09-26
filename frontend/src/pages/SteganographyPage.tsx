import React, { useState, useRef } from 'react';
import { Upload, Download, Eye, EyeOff, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';
import './SteganographyPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface SteganographyResult {
  success: boolean;
  message?: string;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}

export const SteganographyPage: React.FC = () => {
  const [mode, setMode] = useState<'hide' | 'reveal'>('hide');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<SteganographyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier que c'est une image
      if (!file.type.startsWith('image/')) {
        setResult({
          success: false,
          error: 'Veuillez sélectionner un fichier image (PNG, JPG, etc.)'
        });
        return;
      }

      setSelectedFile(file);
      setResult(null);

      // Créer une URL de prévisualisation
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setResult({
          success: false,
          error: 'Veuillez déposer un fichier image (PNG, JPG, etc.)'
        });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setResult({
        success: false,
        error: 'Veuillez sélectionner une image'
      });
      return;
    }

    if (mode === 'hide' && !message.trim()) {
      setResult({
        success: false,
        error: 'Veuillez entrer un message à cacher'
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('mode', mode);
      
      if (mode === 'hide') {
        formData.append('message', message);
      }

      const response = await fetch(`${API_URL}/api/steganography`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResult(data);

    } catch (error) {
      setResult({
        success: false,
        error: 'Erreur de connexion au serveur'
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = result.filename || 'steganography_result.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setMessage('');
    setResult(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="steganography-page">
      <div className="steganography-container">
        <div className="page-header">
          <h1>
            <ImageIcon size={32} />
            Stéganographie
          </h1>
          <p>Cachez ou révélez des messages secrets dans vos images</p>
        </div>

        {/* Mode Selection */}
        <div className="mode-selector">
          <button
            type="button"
            className={`mode-btn ${mode === 'hide' ? 'active' : ''}`}
            onClick={() => setMode('hide')}
          >
            <EyeOff size={20} />
            Cacher un message
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === 'reveal' ? 'active' : ''}`}
            onClick={() => setMode('reveal')}
          >
            <Eye size={20} />
            Révéler un message
          </button>
        </div>

        <form onSubmit={handleSubmit} className="steganography-form">
          {/* File Upload */}
          <div className="form-section">
            <label className="section-title">
              <ImageIcon size={20} />
              Image {mode === 'hide' ? 'source' : 'à analyser'}
            </label>
            
            <div
              className={`file-drop-zone ${selectedFile ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                required
              />
              
              {selectedFile ? (
                <div className="file-preview">
                  {previewUrl && (
                    <img src={previewUrl} alt="Preview" className="preview-image" />
                  )}
                  <div className="file-info">
                    <p className="file-name">{selectedFile.name}</p>
                    <p className="file-size">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="drop-placeholder">
                  <Upload size={48} />
                  <p>Cliquez ou glissez-déposez votre image ici</p>
                  <small>PNG, JPG, JPEG acceptés</small>
                </div>
              )}
            </div>
          </div>

          {/* Message Input for Hide Mode */}
          {mode === 'hide' && (
            <div className="form-section">
              <label className="section-title">
                <FileText size={20} />
                Message secret
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Entrez le message que vous voulez cacher dans l'image..."
                className="message-input"
                rows={4}
                required
              />
              <small className="input-help">
                {message.length} caractères
              </small>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Traitement...
                </>
              ) : (
                <>
                  {mode === 'hide' ? <EyeOff size={20} /> : <Eye size={20} />}
                  {mode === 'hide' ? 'Cacher le message' : 'Révéler le message'}
                </>
              )}
            </button>
            
            {selectedFile && (
              <button
                type="button"
                onClick={resetForm}
                className="reset-btn"
              >
                Recommencer
              </button>
            )}
          </div>
        </form>

        {/* Results */}
        {result && (
          <div className={`result-section ${result.success ? 'success' : 'error'}`}>
            {result.success ? (
              <div className="success-result">
                <div className="result-header">
                  ✅ Opération réussie !
                </div>
                
                {mode === 'hide' && result.downloadUrl && (
                  <div className="download-section">
                    <p>Votre image avec le message caché est prête.</p>
                    <button
                      onClick={downloadResult}
                      className="download-btn"
                    >
                      <Download size={20} />
                      Télécharger l'image
                    </button>
                  </div>
                )}
                
                {mode === 'reveal' && result.message && (
                  <div className="revealed-message">
                    <h3>Message révélé :</h3>
                    <div className="message-content">
                      {result.message}
                    </div>
                  </div>
                )}
                
                {mode === 'reveal' && !result.message && (
                  <div className="no-message">
                    <AlertCircle size={20} />
                    Aucun message secret trouvé dans cette image.
                  </div>
                )}
              </div>
            ) : (
              <div className="error-result">
                <AlertCircle size={20} />
                <span>{result.error}</span>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="info-section">
          <h3>Comment ça marche ?</h3>
          <div className="info-grid">
            <div className="info-card">
              <EyeOff size={24} />
              <h4>Cacher un message</h4>
              <p>
                Le message est intégré dans les pixels de l'image en utilisant 
                la technique LSB (Least Significant Bit). L'image résultante 
                est visuellement identique à l'originale.
              </p>
            </div>
            <div className="info-card">
              <Eye size={24} />
              <h4>Révéler un message</h4>
              <p>
                L'algorithme analyse les pixels de l'image pour extraire 
                le message caché. Seules les images créées avec notre 
                outil peuvent être décodées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};