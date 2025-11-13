const axios = require('axios');

/**
 * Service de recherche d'offres d'emploi
 * Utilise plusieurs sources : mock data, Pôle Emploi API, etc.
 */

// Données mock pour démonstration
const mockJobs = [
  {
    id: '1',
    title: 'Développeur Full Stack',
    company: 'Tech Innovations',
    location: 'Paris',
    city: 'Paris',
    type: 'CDI',
    domain: 'Informatique',
    description: 'Nous recherchons un développeur full stack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant React, Node.js et PostgreSQL.',
    requirements: ['3 ans d\'expérience', 'React, Node.js', 'Anglais courant'],
    salary: '40-50K€',
    contractType: 'emploi',
    distance: 5
  },
  {
    id: '2',
    title: 'Data Scientist - Stage',
    company: 'DataCorp',
    location: 'Lyon',
    city: 'Lyon',
    type: 'Stage',
    domain: 'Data Science',
    description: 'Stage de 6 mois en data science. Vous participerez à l\'analyse de données massives et au développement de modèles de machine learning.',
    requirements: ['Bac+4/5', 'Python, ML', 'Curiosité scientifique'],
    salary: '1200€/mois',
    contractType: 'stage',
    distance: 3
  },
  {
    id: '3',
    title: 'Alternance Développeur Web',
    company: 'WebAgency Plus',
    location: 'Marseille',
    city: 'Marseille',
    type: 'Alternance',
    domain: 'Informatique',
    description: 'Alternance de 12 à 24 mois. Développement de sites web et applications pour nos clients. Formation assurée par notre équipe senior.',
    requirements: ['Bac+2 minimum', 'HTML, CSS, JavaScript', 'Motivé et autonome'],
    salary: 'Selon niveau',
    contractType: 'alternance',
    distance: 8
  },
  {
    id: '4',
    title: 'Ingénieur DevOps',
    company: 'Cloud Systems',
    location: 'Paris',
    city: 'Paris',
    type: 'CDI',
    domain: 'Informatique',
    description: 'Rejoignez notre équipe DevOps pour gérer notre infrastructure cloud et mettre en place des pipelines CI/CD modernes.',
    requirements: ['Docker, Kubernetes', 'AWS/Azure', '2+ ans d\'expérience'],
    salary: '45-60K€',
    contractType: 'emploi',
    distance: 2
  },
  {
    id: '5',
    title: 'UX/UI Designer - Stage',
    company: 'Creative Studio',
    location: 'Toulouse',
    city: 'Toulouse',
    type: 'Stage',
    domain: 'Design',
    description: 'Stage de 4-6 mois en design UX/UI. Vous participerez à la conception d\'interfaces pour applications web et mobile.',
    requirements: ['Formation design', 'Figma, Adobe XD', 'Portfolio requis'],
    salary: '800-1000€/mois',
    contractType: 'stage',
    distance: 7
  },
  {
    id: '6',
    title: 'Chef de Projet Digital',
    company: 'Marketing Digital Pro',
    location: 'Paris',
    city: 'Paris',
    type: 'CDI',
    domain: 'Marketing',
    description: 'Gestion de projets digitaux pour nos clients grands comptes. Coordination d\'équipes pluridisciplinaires.',
    requirements: ['5 ans expérience', 'Gestion de projet agile', 'Excellent relationnel'],
    salary: '50-65K€',
    contractType: 'emploi',
    distance: 4
  }
];

class JobSearchService {
  /**
   * Recherche des offres d'emploi selon les critères
   */
  async searchJobs({ domain, city, radius, jobType }) {
    try {
      // Pour une vraie application, on appellerait une API externe
      // Exemple : Pôle Emploi API, Indeed API, etc.

      // Filtrage des données mock
      let results = mockJobs.filter(job => {
        // Filtre par domaine (recherche flexible)
        const domainMatch = job.domain.toLowerCase().includes(domain.toLowerCase()) ||
                           job.title.toLowerCase().includes(domain.toLowerCase());

        // Filtre par ville
        const cityMatch = job.city.toLowerCase().includes(city.toLowerCase());

        // Filtre par distance
        const distanceMatch = job.distance <= radius;

        // Filtre par type de contrat
        const typeMatch = jobType === 'all' || job.contractType === jobType;

        return domainMatch && cityMatch && distanceMatch && typeMatch;
      });

      return results;
    } catch (error) {
      console.error('Erreur recherche emploi:', error);
      throw error;
    }
  }

  /**
   * Récupère les détails d'une offre spécifique
   */
  async getJobDetails(jobId) {
    try {
      const job = mockJobs.find(j => j.id === jobId);
      return job || null;
    } catch (error) {
      console.error('Erreur récupération offre:', error);
      throw error;
    }
  }

  /**
   * Intégration avec l'API Pôle Emploi (optionnel)
   * Nécessite des credentials API
   */
  async searchPoleEmploiAPI({ domain, city, radius }) {
    try {
      // Cette fonction nécessite une authentification OAuth2 avec Pôle Emploi
      // Documentation: https://pole-emploi.io/data/api/offres-emploi

      if (!process.env.POLE_EMPLOI_CLIENT_ID) {
        throw new Error('API Pôle Emploi non configurée');
      }

      // Obtenir un token OAuth2
      const tokenResponse = await axios.post(
        'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token',
        `grant_type=client_credentials&client_id=${process.env.POLE_EMPLOI_CLIENT_ID}&client_secret=${process.env.POLE_EMPLOI_CLIENT_SECRET}&scope=api_offresdemploiv2 o2dsoffre`,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Rechercher des offres
      const response = await axios.get('https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres/search', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          motsCles: domain,
          commune: city,
          distance: radius
        }
      });

      return response.data.resultats || [];
    } catch (error) {
      console.error('Erreur API Pôle Emploi:', error.message);
      // Retourne les données mock en cas d'erreur
      return [];
    }
  }
}

module.exports = new JobSearchService();
