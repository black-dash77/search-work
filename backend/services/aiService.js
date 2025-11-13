const axios = require('axios');

/**
 * Service de génération de lettres de motivation par IA
 * Supporte OpenAI et Anthropic Claude
 */

class AIService {
  /**
   * Génère une lettre de motivation personnalisée
   */
  async generateCoverLetter(profile, job) {
    try {
      // Construire le prompt pour l'IA
      const prompt = this.buildPrompt(profile, job);

      // Choisir le service IA disponible
      if (process.env.ANTHROPIC_API_KEY) {
        return await this.generateWithClaude(prompt);
      } else if (process.env.OPENAI_API_KEY) {
        return await this.generateWithOpenAI(prompt);
      } else {
        // Génération mock si pas de clé API
        return this.generateMockCoverLetter(profile, job);
      }
    } catch (error) {
      console.error('Erreur génération lettre:', error);
      // Fallback vers mock en cas d'erreur
      return this.generateMockCoverLetter(profile, job);
    }
  }

  /**
   * Construit le prompt pour l'IA
   */
  buildPrompt(profile, job) {
    return `Tu es un expert en rédaction de lettres de motivation professionnelles.

Génère une lettre de motivation personnalisée et convaincante en français pour l'offre d'emploi suivante.

PROFIL DU CANDIDAT:
- Nom: ${profile.firstName} ${profile.lastName}
- Email: ${profile.email}
- Téléphone: ${profile.phone || 'Non renseigné'}
- Formation: ${profile.education || 'Non renseignée'}
- Expérience: ${profile.experience || 'Non renseignée'}
- Compétences: ${profile.skills ? profile.skills.join(', ') : 'Non renseignées'}
- Motivations: ${profile.motivation || 'Non renseignées'}

OFFRE D'EMPLOI:
- Poste: ${job.title}
- Entreprise: ${job.company}
- Localisation: ${job.location}
- Type de contrat: ${job.type}
- Description: ${job.description}
- Compétences requises: ${job.requirements ? job.requirements.join(', ') : 'Non spécifiées'}

INSTRUCTIONS:
1. Commence par l'adresse et les coordonnées du candidat
2. Utilise une formule de politesse appropriée
3. Introduction accrocheuse montrant l'intérêt pour le poste
4. Mets en valeur les compétences et expériences pertinentes du candidat en lien avec l'offre
5. Explique pourquoi le candidat est motivé par ce poste et cette entreprise
6. Conclusion positive avec appel à l'action
7. Formule de politesse finale
8. Signature

La lettre doit être professionnelle, convaincante et personnalisée. Longueur: environ 300-400 mots.`;
  }

  /**
   * Génère avec Claude (Anthropic)
   */
  async generateWithClaude(prompt) {
    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          }
        }
      );

      return response.data.content[0].text;
    } catch (error) {
      console.error('Erreur Claude API:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Génère avec OpenAI
   */
  async generateWithOpenAI(prompt) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{
            role: 'user',
            content: prompt
          }],
          max_tokens: 1500,
          temperature: 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Erreur OpenAI API:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Génère une lettre mock pour démonstration
   */
  generateMockCoverLetter(profile, job) {
    const today = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `${profile.firstName} ${profile.lastName}
${profile.email}
${profile.phone || ''}

${job.company}
${job.location}

Objet : Candidature pour le poste de ${job.title}

${job.location}, le ${today}

Madame, Monsieur,

Vivement intéressé(e) par votre offre pour le poste de ${job.title} au sein de ${job.company}, je me permets de vous adresser ma candidature.

${profile.education ? `Titulaire d'un diplôme en ${profile.education}, ` : ''}${profile.experience ? `avec ${profile.experience} d'expérience, ` : ''}je possède les compétences nécessaires pour contribuer efficacement à votre équipe.

Votre offre a particulièrement retenu mon attention car elle correspond parfaitement à mes aspirations professionnelles. ${job.description.substring(0, 150)}...

Mes compétences en ${profile.skills ? profile.skills.slice(0, 3).join(', ') : 'développement'} me permettront de répondre aux exigences du poste. Je suis particulièrement motivé(e) par ${profile.motivation || 'les défis techniques et l\'apprentissage continu'}.

Ma capacité d'adaptation, mon esprit d'équipe et ma rigueur professionnelle sont des atouts que je souhaiterais mettre au service de ${job.company}. Je suis convaincu(e) que mon profil correspond aux attentes de votre entreprise pour ce poste de ${job.title}.

Je reste à votre disposition pour un entretien afin de vous exposer plus en détail mes motivations et mes compétences.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${profile.firstName} ${profile.lastName}

---
Note : Cette lettre a été générée automatiquement. Pour une version personnalisée avec IA, configurez une clé API (OpenAI ou Anthropic) dans le fichier .env du backend.`;
  }
}

module.exports = new AIService();
