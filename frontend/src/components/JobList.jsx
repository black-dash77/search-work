import React from 'react';

function JobList({ jobs, onJobSelect }) {
  return (
    <div className="job-list-container">
      <h2>Résultats ({jobs.length} offre{jobs.length > 1 ? 's' : ''})</h2>

      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className={`job-type ${job.contractType}`}>
                {job.type}
              </span>
            </div>

            <div className="job-company">
              <strong>{job.company}</strong>
            </div>

            <div className="job-location">
              📍 {job.location} ({job.distance} km)
            </div>

            {job.salary && (
              <div className="job-salary">
                💰 {job.salary}
              </div>
            )}

            <div className="job-description">
              {job.description.substring(0, 150)}...
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div className="job-requirements">
                <strong>Compétences :</strong>
                <div className="skills">
                  {job.requirements.map((req, index) => (
                    <span key={index} className="skill-tag">{req}</span>
                  ))}
                </div>
              </div>
            )}

            <button
              className="btn-secondary"
              onClick={() => onJobSelect(job)}
            >
              📝 Générer une lettre de motivation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
