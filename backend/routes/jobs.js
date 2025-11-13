const express = require('express');
const router = express.Router();
const axios = require('axios');

// Service de recherche d'emploi
const jobSearchService = require('../services/jobSearchService');

/**
 * POST /api/jobs/search
 * Recherche des offres d'emploi
 * Body: { domain, city, radius, jobType }
 */
router.post('/search', async (req, res) => {
  try {
    const { domain, city, radius, jobType } = req.body;

    // Validation
    if (!domain || !city) {
      return res.status(400).json({
        error: 'Le domaine et la ville sont requis'
      });
    }

    const jobs = await jobSearchService.searchJobs({
      domain,
      city,
      radius: radius || 10,
      jobType: jobType || 'all'
    });

    res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error('Erreur recherche emploi:', error);
    res.status(500).json({
      error: 'Erreur lors de la recherche d\'emplois',
      details: error.message
    });
  }
});

/**
 * GET /api/jobs/:id
 * Récupère les détails d'une offre
 */
router.get('/:id', async (req, res) => {
  try {
    const job = await jobSearchService.getJobDetails(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Offre non trouvée' });
    }

    res.json({ success: true, job });
  } catch (error) {
    console.error('Erreur récupération offre:', error);
    res.status(500).json({
      error: 'Erreur lors de la récupération de l\'offre'
    });
  }
});

module.exports = router;
