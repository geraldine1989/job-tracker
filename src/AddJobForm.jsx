import React, { useState } from 'react';

export default function AddJobForm({onAddJob}) {
    const [formData, setFormData] = useState({title: '', company: ''});

    const addJob = () => {
        if (formData.title.length === 0 || formData.company.length === 0) {
            return;
        }
        
        const newJob = {
            id: Date.now(),
            title: formData.title,
            company: formData.company,
            status: 0
        };

        onAddJob(newJob);
        setFormData({title: '', company: ''});
    };
    
    return (
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block mb-2.5 text-sm font-medium text-heading">Poste</label>
          <input 
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          />
        </div>
        <div>
          <label htmlFor="company" className="block mb-2.5 text-sm font-medium text-heading">Company</label>
            <input 
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            />
        </div>
        <button 
          onClick={addJob}
          className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700 transition hover:cursor-pointer"
        >
          + Ajouter une offre
        </button>
      </div>
    );
}