const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

/**
 * POST /api/cover-letter/generate
 * Génère une lettre de motivation
 * Body: { profile, job }
 */
router.post('/generate', async (req, res) => {
  try {
    const { profile, job } = req.body;

    // Validation
    if (!profile || !job) {
      return res.status(400).json({
        error: 'Le profil et l\'offre d\'emploi sont requis'
      });
    }

    const coverLetter = await aiService.generateCoverLetter(profile, job);

    res.json({
      success: true,
      coverLetter
    });
  } catch (error) {
    console.error('Erreur génération lettre:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération de la lettre de motivation',
      details: error.message
    });
  }
});

module.exports = router;
