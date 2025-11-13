# 🔍 Job Search AI

Application intelligente de recherche d'emploi avec génération automatique de lettres de motivation par IA.

## 📋 Fonctionnalités

- ✅ **Gestion de profil utilisateur** : Sauvegardez vos informations personnelles, formation, expérience et compétences
- 🔎 **Recherche d'offres avancée** : Filtrez par domaine, ville et rayon de recherche (km)
- 📝 **Types de contrats** : Emploi (CDI/CDD), Stage, Alternance
- 🤖 **Génération IA de lettres de motivation** : Lettres personnalisées basées sur votre profil et l'offre
- 💾 **Export** : Copiez ou téléchargez vos lettres de motivation
- 📱 **Interface responsive** : Fonctionne sur desktop, tablette et mobile

## 🛠️ Technologies utilisées

### Backend
- Node.js + Express
- API REST
- Intégration OpenAI / Anthropic Claude (optionnel)
- Support API Pôle Emploi (optionnel)

### Frontend
- React 18
- Vite (build tool moderne et rapide)
- Axios pour les appels API
- CSS moderne avec design gradient

## 📦 Installation

### Prérequis
- Node.js 16+ et npm

### Installation complète

```bash
# Cloner le repository
git clone <votre-repo>
cd search-work

# Installer toutes les dépendances (root, backend, frontend)
npm run install:all
```

### Installation manuelle

```bash
# 1. Dépendances root
npm install

# 2. Dépendances backend
cd backend
npm install

# 3. Dépendances frontend
cd ../frontend
npm install
```

## ⚙️ Configuration

### Configuration Backend

1. Créez un fichier `.env` dans le dossier `backend/` :

```bash
cd backend
cp .env.example .env
```

2. Éditez `.env` avec vos clés API (optionnel pour IA avancée) :

```env
PORT=3001

# Pour la génération IA avancée (optionnel)
OPENAI_API_KEY=sk-...
# OU
ANTHROPIC_API_KEY=sk-ant-...

# Pour l'API Pôle Emploi (optionnel)
POLE_EMPLOI_CLIENT_ID=votre_client_id
POLE_EMPLOI_CLIENT_SECRET=votre_client_secret
```

**Note importante** : L'application fonctionne **sans clé API** ! Elle utilise des données de démonstration et génère des lettres de motivation de base. Les clés API sont optionnelles pour :
- Génération avancée de lettres par IA (OpenAI/Claude)
- Accès aux vraies offres Pôle Emploi

## 🚀 Lancement

### Développement (tout en un)

```bash
# Depuis la racine du projet
npm run dev
```

Cela démarre :
- Backend sur http://localhost:3001
- Frontend sur http://localhost:3000

### Développement séparé

```bash
# Terminal 1 : Backend
npm run dev:backend

# Terminal 2 : Frontend
npm run dev:frontend
```

### Production

```bash
# Build du frontend
npm run build

# Lancement du serveur
npm start
```

## 📖 Guide d'utilisation

### 1. Créer votre profil

- Accédez à l'onglet "👤 Mon Profil"
- Renseignez vos informations :
  - Nom et prénom
  - Email et téléphone
  - Formation
  - Expérience professionnelle
  - Compétences (séparées par des virgules)
  - Motivations
- Cliquez sur "Sauvegarder mon profil"

### 2. Rechercher des offres

- Accédez à l'onglet "🔎 Recherche"
- Renseignez vos critères :
  - **Domaine** : Développeur, Marketing, Design, etc.
  - **Ville** : Paris, Lyon, Marseille, etc.
  - **Rayon** : 5, 10, 20, 50 ou 100 km
  - **Type de contrat** : Tous, Emploi, Stage ou Alternance
- Cliquez sur "🔍 Rechercher"

### 3. Générer une lettre de motivation

- Parcourez les offres trouvées
- Cliquez sur "📝 Générer une lettre de motivation" sur l'offre qui vous intéresse
- L'IA génère automatiquement une lettre personnalisée
- Actions disponibles :
  - **📋 Copier** : Copiez dans le presse-papier
  - **💾 Télécharger** : Téléchargez en fichier .txt
  - **🔄 Régénérer** : Générez une nouvelle version

## 🏗️ Architecture

```
job-search-ai-app/
├── backend/
│   ├── routes/
│   │   ├── jobs.js           # Routes recherche d'emploi
│   │   ├── profile.js        # Routes profil utilisateur
│   │   └── coverLetter.js    # Routes génération lettres
│   ├── services/
│   │   ├── jobSearchService.js   # Logique recherche emploi
│   │   └── aiService.js          # Logique génération IA
│   ├── data/
│   │   └── profile.json      # Stockage profil utilisateur
│   ├── server.js             # Serveur Express
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserProfile.jsx
│   │   │   ├── JobSearch.jsx
│   │   │   ├── JobList.jsx
│   │   │   └── CoverLetterGenerator.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
├── package.json              # Scripts root
└── README.md
```

## 🔌 API Endpoints

### Profil
- `GET /api/profile` - Récupérer le profil
- `POST /api/profile` - Sauvegarder le profil

### Recherche d'emploi
- `POST /api/jobs/search` - Rechercher des offres
  ```json
  {
    "domain": "Développeur",
    "city": "Paris",
    "radius": 10,
    "jobType": "emploi"
  }
  ```
- `GET /api/jobs/:id` - Détails d'une offre

### Lettre de motivation
- `POST /api/cover-letter/generate` - Générer une lettre
  ```json
  {
    "profile": { ... },
    "job": { ... }
  }
  ```

## 🎨 Personnalisation

### Ajouter des offres d'emploi mock

Éditez `backend/services/jobSearchService.js` et ajoutez des offres dans le tableau `mockJobs`.

### Modifier les styles

Le fichier `frontend/src/styles.css` contient tous les styles. Les couleurs principales sont définies dans les gradients :
- Primaire : `#667eea` → `#764ba2`

### Intégrer une vraie API de recherche d'emploi

Modifiez `backend/services/jobSearchService.js` pour appeler l'API de votre choix :
- API Pôle Emploi (France)
- Indeed API
- LinkedIn Jobs API
- Votre propre API

## 🤝 Contributions

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Forker le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Committer vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pusher vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 🐛 Dépannage

### Le backend ne démarre pas
- Vérifiez que le port 3001 est libre : `lsof -i :3001`
- Vérifiez l'installation des dépendances : `cd backend && npm install`

### Le frontend ne démarre pas
- Vérifiez que le port 3000 est libre : `lsof -i :3000`
- Vérifiez l'installation des dépendances : `cd frontend && npm install`

### Les offres ne s'affichent pas
- Vérifiez que le backend est bien démarré
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez les logs du backend dans le terminal

### La génération de lettre échoue
- **Sans clé API** : L'application génère une lettre de base automatiquement
- **Avec clé API** : Vérifiez que votre clé est valide et que vous avez du crédit
- Vérifiez les logs du backend pour les erreurs détaillées

## 📝 Licence

MIT

## 👨‍💻 Auteur

Développé avec ❤️ pour faciliter la recherche d'emploi

## 🔮 Roadmap / Améliorations futures

- [ ] Authentification utilisateur
- [ ] Base de données (PostgreSQL/MongoDB)
- [ ] Sauvegarde des favoris
- [ ] Historique des lettres générées
- [ ] Notifications par email
- [ ] Support multilingue
- [ ] Export PDF des lettres
- [ ] Analyse de correspondance profil/offre (matching score)
- [ ] Suggestions d'amélioration du profil
- [ ] Intégration calendrier pour suivi des candidatures
