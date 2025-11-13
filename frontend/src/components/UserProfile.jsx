import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ profile, onProfileSaved }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    motivation: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Convertir les compétences en tableau
      const profileData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
      };

      const response = await axios.post('/api/profile', profileData);

      if (response.data.success) {
        setMessage('✅ Profil sauvegardé avec succès !');
        onProfileSaved(response.data.profile);
      }
    } catch (error) {
      setMessage('❌ Erreur lors de la sauvegarde du profil');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Mon Profil</h2>
      <p className="section-description">
        Renseignez vos informations pour générer des lettres de motivation personnalisées
      </p>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Prénom *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Nom *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="education">Formation</label>
          <input
            type="text"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Ex: Master en Informatique, Bac+3 Marketing Digital..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Expérience professionnelle</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows="3"
            placeholder="Décrivez brièvement votre expérience professionnelle..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Compétences (séparées par des virgules)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Ex: React, Python, Gestion de projet, Communication..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="motivation">Motivations professionnelles</label>
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows="3"
            placeholder="Qu'est-ce qui vous motive dans votre recherche d'emploi ?"
          />
        </div>

        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Sauvegarde...' : 'Sauvegarder mon profil'}
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
