import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CoverLetterGenerator({ profile, job, onBack }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateCoverLetter();
  }, []);

  const generateCoverLetter = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/cover-letter/generate', {
        profile,
        job
      });

      if (response.data.success) {
        setCoverLetter(response.data.coverLetter);
      }
    } catch (err) {
      setError('Erreur lors de la génération de la lettre de motivation');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `lettre_motivation_${job.company}_${job.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="cover-letter-container">
      <button className="btn-back" onClick={onBack}>
        ← Retour aux résultats
      </button>

      <div className="job-info">
        <h2>{job.title}</h2>
        <p><strong>{job.company}</strong> - {job.location}</p>
      </div>

      <h3>Lettre de motivation générée</h3>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Génération de votre lettre de motivation personnalisée...</p>
        </div>
      )}

      {error && (
        <div className="message error">
          {error}
          <button onClick={generateCoverLetter} className="btn-secondary">
            Réessayer
          </button>
        </div>
      )}

      {!loading && !error && coverLetter && (
        <div>
          <div className="cover-letter-text">
            <pre>{coverLetter}</pre>
          </div>

          <div className="cover-letter-actions">
            <button onClick={handleCopy} className="btn-primary">
              {copied ? '✅ Copié !' : '📋 Copier'}
            </button>
            <button onClick={handleDownload} className="btn-secondary">
              💾 Télécharger
            </button>
            <button onClick={generateCoverLetter} className="btn-secondary">
              🔄 Régénérer
            </button>
          </div>

          <div className="info-box">
            <strong>💡 Conseil :</strong> N'oubliez pas de relire et personnaliser
            cette lettre selon votre style et les spécificités de l'offre !
          </div>
        </div>
      )}
    </div>
  );
}

export default CoverLetterGenerator;
