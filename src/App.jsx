import React, { useState } from 'react';
import AddJobForm from './AddJobForm';
import { useEffect } from 'react';

const STATUS_MAP = {
  0: { label: "En attente", color: "bg-gray-100 text-gray-700" },
  1: { label: "Entretien", color: "bg-blue-100 text-blue-700" },
  2: { label: "Refusé", color: "bg-red-100 text-red-700" }
};

export default function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('my-jobs');

    if (savedJobs) {
      return JSON.parse(savedJobs);
    } else {
      return [{ id: 1, title: 'Développeuse Front', company: 'TechCorp', status: 0}];
    }
  });

  useEffect(() => {
    localStorage.setItem('my-jobs', JSON.stringify(jobs));
  }, [jobs]);

  const onAddJob = (newJobData) => {
    setJobs([...jobs, newJobData]);
  }

  const deleteJob = (jobId) => {
    const newJobsList = jobs.filter((job) => job.id !== jobId);
    setJobs(newJobsList);
  }

  const updateJobStatus = (jobId, newStatus) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId) {
        return {...job, status: newStatus};
      } else {
        return job;
      }
    })

    setJobs(updatedJobs);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Job Tracker</h1>
      </header>
      <AddJobForm onAddJob={onAddJob}/>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-wrap justify-between items-center gap-y-2">
            <div className="w-full">
              <h2 className="font-semibold text-lg flex justify-between">
                <span className="mr-2">{job.title} </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_MAP[job.status]?.color || 'bg-white text-black'}`}>
                  {STATUS_MAP[job.status]?.label || 'undefined'}
                </span>
              </h2>
              <p className="text-slate-500">{job.company}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <select 
                name="status"
                id="status"
                value={job.status}
                onChange={(e) => updateJobStatus(job.id, parseInt(e.target.value))}
                className="mr-4 p-1 text-sm border rounded bg-white"
              >
                <option value={0}>En attente</option>
                <option value={1}>Entretien</option>
                <option value={2}>Refusé</option>
              </select>
              <button 
                onClick={() => deleteJob(job.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition font-medium text-sm hover:cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}