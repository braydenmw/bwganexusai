/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import type { LiveOpportunityItem } from '../types';
import { CloseIcon, PlusCircleIcon } from './Icons';

const COUNTRIES = ["United States", "Philippines", "Vietnam", "Thailand", "Israel", "Sweden", "Singapore", "Malaysia", "Indonesia", "Japan", "South Korea", "Germany", "United Kingdom", "France", "Canada", "Australia", "India", "Brazil", "Mexico", "South Africa"];
const INDUSTRIES = ["AgriTech", "Manufacturing", "Technology", "Renewable Energy", "Infrastructure", "Healthcare", "Finance", "Tourism", "Logistics", "Biotechnology", "Aquaculture", "Mining", "Semiconductors", "Supply Chain Management"];

interface AddOpportunityModalProps {
    onClose: () => void;
    onSave: (item: LiveOpportunityItem) => void;
}

export const AddOpportunityModal: React.FC<AddOpportunityModalProps> = ({ onClose, onSave }) => {
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.currentTarget);
        
        const projectName = formData.get('projectName') as string;
        const summary = formData.get('summary') as string;

        if (!projectName.trim() || !summary.trim()) {
            setError('Project Name and Summary are required.');
            return;
        }

        const newOpportunity: LiveOpportunityItem = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            type: 'opportunity',
            isUserAdded: true,
            project_name: projectName,
            country: formData.get('country') as string,
            sector: formData.get('sector') as string,
            value: formData.get('value') as string,
            summary: summary,
            source_url: formData.get('sourceUrl') as string,
        };

        onSave(newOpportunity);
    };

    const inputStyles = "w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexus-blue focus:outline-none transition placeholder:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-800";
    const labelStyles = "block text-sm font-medium text-gray-700 mb-2";

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <header className="p-4 flex justify-between items-center border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <PlusCircleIcon className="w-8 h-8 text-green-600" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">List a New Project or Opportunity</h2>
                            <p className="text-sm text-gray-500">Add an initiative to the Nexus Dashboard.</p>
                        </div>
                    </div>
                    <button className="p-1 text-gray-500 hover:text-gray-800" onClick={onClose}><CloseIcon /></button>
                </header>
                <form onSubmit={handleSubmit}>
                    <main className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div>
                            <label htmlFor="projectName" className={labelStyles}>Project Name *</label>
                            <input type="text" id="projectName" name="projectName" className={inputStyles} placeholder="e.g., National Fiber Optic Backbone Expansion" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="country" className={labelStyles}>Country *</label>
                                <select id="country" name="country" className={inputStyles} required defaultValue={COUNTRIES[0]}>
                                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="sector" className={labelStyles}>Sector *</label>
                                <select id="sector" name="sector" className={inputStyles} required defaultValue={INDUSTRIES[0]}>
                                    {INDUSTRIES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="value" className={labelStyles}>Project Value (Optional)</label>
                            <input type="text" id="value" name="value" className={inputStyles} placeholder="e.g., $250 Million" />
                        </div>
                        <div>
                            <label htmlFor="summary" className={labelStyles}>Summary / Project Notes *</label>
                            <textarea id="summary" name="summary" rows={4} className={inputStyles} placeholder="Provide a brief overview of the project, its goals, and current status." required />
                        </div>
                        <div>
                            <label htmlFor="sourceUrl" className={labelStyles}>Source URL (Optional)</label>
                            <input type="url" id="sourceUrl" name="sourceUrl" className={inputStyles} placeholder="https://example.gov/project-details" />
                        </div>
                        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    </main>
                    <footer className="p-4 bg-gray-50 border-t border-gray-200 flex-shrink-0 flex justify-end items-center gap-4">
                        <button type="button" className="nexus-btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="nexus-btn-primary bg-green-600 hover:bg-green-700">Save Project</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};
