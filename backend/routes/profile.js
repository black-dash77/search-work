const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const PROFILE_FILE = path.join(__dirname, '../data/profile.json');

// Assure que le dossier data existe
async function ensureDataDir() {
  const dataDir = path.dirname(PROFILE_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

/**
 * GET /api/profile
 * Récupère le profil utilisateur
 */
router.get('/', async (req, res) => {
  try {
    await ensureDataDir();

    try {
      const data = await fs.readFile(PROFILE_FILE, 'utf8');
      const profile = JSON.parse(data);
      res.json({ success: true, profile });
    } catch (error) {
      // Si le fichier n'existe pas, renvoyer un profil vide
      res.json({ success: true, profile: null });
    }
  } catch (error) {
    console.error('Erreur lecture profil:', error);
    res.status(500).json({ error: 'Erreur lors de la lecture du profil' });
  }
});

/**
 * POST /api/profile
 * Sauvegarde le profil utilisateur
 */
router.post('/', async (req, res) => {
  try {
    const profile = req.body;

    // Validation basique
    if (!profile.firstName || !profile.lastName) {
      return res.status(400).json({
        error: 'Le prénom et le nom sont requis'
      });
    }

    await ensureDataDir();
    await fs.writeFile(PROFILE_FILE, JSON.stringify(profile, null, 2));

    res.json({
      success: true,
      message: 'Profil sauvegardé avec succès',
      profile
    });
  } catch (error) {
    console.error('Erreur sauvegarde profil:', error);
    res.status(500).json({
      error: 'Erreur lors de la sauvegarde du profil'
    });
  }
});

module.exports = router;
