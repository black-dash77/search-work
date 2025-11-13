import React, { useState } from 'react';
import axios from 'axios';

function JobSearch({ onJobsFound }) {
  const [searchParams, setSearchParams] = useState({
    domain: '',
    city: '',
    radius: 10,
    jobType: 'all'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/jobs/search', searchParams);

      if (response.data.success) {
        onJobsFound(response.data.jobs);

        if (response.data.jobs.length === 0) {
          setError('Aucune offre trouvée pour ces critères. Essayez d\'élargir votre recherche.');
        }
      }
    } catch (err) {
      setError('Erreur lors de la recherche. Veuillez réessayer.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Rechercher des offres</h2>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="domain">Domaine / Mot-clé *</label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={searchParams.domain}
              onChange={handleChange}
              placeholder="Ex: Développeur, Marketing, Design..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Ville *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={searchParams.city}
              onChange={handleChange}
              placeholder="Ex: Paris, Lyon, Marseille..."
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="radius">Rayon de recherche (km)</label>
            <select
              id="radius"
              name="radius"
              value={searchParams.radius}
              onChange={handleChange}
            >
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="20">20 km</option>
              <option value="50">50 km</option>
              <option value="100">100 km</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jobType">Type de contrat</label>
            <select
              id="jobType"
              name="jobType"
              value={searchParams.jobType}
              onChange={handleChange}
            >
              <option value="all">Tous</option>
              <option value="emploi">Emploi (CDI/CDD)</option>
              <option value="stage">Stage</option>
              <option value="alternance">Alternance</option>
            </select>
          </div>
        </div>

        {error && <div className="message error">{error}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '🔍 Recherche en cours...' : '🔍 Rechercher'}
        </button>
      </form>
    </div>
  );
}

export default JobSearch;
