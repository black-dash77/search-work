import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './components/UserProfile';
import JobSearch from './components/JobSearch';
import JobList from './components/JobList';
import CoverLetterGenerator from './components/CoverLetterGenerator';

function App() {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Charger le profil au démarrage
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      if (response.data.profile) {
        setProfile(response.data.profile);
        setActiveTab('search');
      }
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    }
  };

  const handleProfileSaved = (savedProfile) => {
    setProfile(savedProfile);
    setActiveTab('search');
  };

  const handleJobsFound = (foundJobs) => {
    setJobs(foundJobs);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setShowCoverLetter(true);
  };

  const handleBackToJobs = () => {
    setShowCoverLetter(false);
    setSelectedJob(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔍 Job Search AI</h1>
        <p>Recherche d'emploi intelligente avec génération de lettres de motivation</p>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Mon Profil
        </button>
        <button
          className={`tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
          disabled={!profile}
        >
          🔎 Recherche
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'profile' && (
          <UserProfile
            profile={profile}
            onProfileSaved={handleProfileSaved}
          />
        )}

        {activeTab === 'search' && !showCoverLetter && (
          <div>
            <JobSearch onJobsFound={handleJobsFound} />
            {jobs.length > 0 && (
              <JobList
                jobs={jobs}
                onJobSelect={handleJobSelect}
              />
            )}
          </div>
        )}

        {showCoverLetter && selectedJob && (
          <CoverLetterGenerator
            profile={profile}
            job={selectedJob}
            onBack={handleBackToJobs}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Job Search AI - Propulsé par l'intelligence artificielle</p>
      </footer>
    </div>
  );
}

export default App;
