require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const jobRoutes = require('./routes/jobs');
const profileRoutes = require('./routes/profile');
const coverLetterRoutes = require('./routes/coverLetter');

app.use('/api/jobs', jobRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/cover-letter', coverLetterRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur opérationnel' });
});

// Route racine du backend - message d'information
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Backend Job Search AI',
    info: 'Ceci est l\'API backend. Pour utiliser l\'application, allez sur http://localhost:3000',
    endpoints: {
      health: '/api/health',
      profile: '/api/profile',
      jobs: '/api/jobs/search',
      coverLetter: '/api/cover-letter/generate'
    }
  });
});

// 404 handler pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    path: req.path,
    message: 'Cette route n\'existe pas. Consultez la documentation de l\'API.'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
