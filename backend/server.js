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

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
