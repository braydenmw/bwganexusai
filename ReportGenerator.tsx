/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import type { ReportParameters, ReportTemplate } from '../types';
import { Spinner, NexusLogo, CheckCircleIcon, XCircleIcon, SparklesIcon } from './Icons';
import { LetterGeneratorModal } from './LetterGeneratorModal';
import { REPORT_TEMPLATES, REPORT_OPTIONS, BUSINESS_TIERS, GOVERNMENT_TIERS, COUNTRIES, PERSONAS, INDUSTRIES, COMPANY_SIZES, KEY_TECHNOLOGIES, TARGET_MARKETS } from '../content';
import { fetchRegionalCities } from '../services/nexusService';
import { nidlToHtml } from '../utils';


const ProgressIndicator: React.FC<{ current: number; labels: string[] }> = ({ current, labels }) => (
    <div className="w-full mb-10 px-4">
        <ol className="flex items-center w-full">
            {labels.map((label, index) => {
                const step = index + 1;
                const isCompleted = current > step;
                const isCurrent = current === step;
                return (
                    <li key={label} className={`flex items-center text-sm md:text-base ${index < labels.length - 1 ? 'w-full' : ''}`}>
                        <div className="flex flex-col md:flex-row items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-all duration-300
                                ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-600 scale-110 shadow-lg' : 'bg-gray-200'}`}>
                                {isCompleted ? (
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                    <span className={`font-bold ${isCurrent ? 'text-white' : 'text-gray-500'}`}>{step}</span>
                                )}
                            </div>
                            <div className="mt-2 md:mt-0 md:ml-4 text-center md:text-left">
                                <h3 className={`font-medium ${isCurrent ? 'text-gray-800' : 'text-gray-500'}`}>{label}</h3>
                            </div>
                        </div>
                        {index < labels.length - 1 && (
                            <div className={`flex-auto border-t-2 transition-all duration-500 mx-4 ${isCompleted ? 'border-green-500' : 'border-gray-200'}`}></div>
                        )}
                    </li>
                );
            })}
        </ol>
    </div>
);

const StepHeader: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{children}</p>
    </div>
);

const CheckboxGroup: React.FC<{
    label: string;
    options: readonly string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}> = ({ label, options, selected, onChange }) => {
    
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked ? [...options] : []);
    };

    const handleOptionChange = (option: string) => {
        const newSelection = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onChange(newSelection);
    };

    const isAllSelected = options.length > 0 && selected.length === options.length;

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="form-label">{label}</label>
                <label className="text-xs flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                    />
                    Select All
                </label>
            </div>
            <div className="p-3 border rounded-lg bg-white max-h-48 overflow-y-auto space-y-2">
                {options.map(option => (
                    <label key={option} className="flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selected.includes(option)}
                            onChange={() => handleOptionChange(option)}
                        />
                        <span className="ml-3 text-sm text-gray-700">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

const ReportGenerationLoader: React.FC = () => {
    const messages = [
        "Initializing Nexus Cortex™ engine...",
        "Sourcing real-time data via Google Search...",
        "Applying regional science methodologies...",
        "Running competitive landscape analysis...",
        "Generating economic impact models...",
        "Assessing supply chain and logistical vectors...",
        "Compiling strategic recommendations...",
        "Finalizing NIDL document structure..."
    ];
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setMessage(messages[i]);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 sm:p-16 min-h-[500px]">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <NexusLogo className="w-10 h-10 text-blue-600" />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-8">Activating Nexus AI...</h2>
            <p className="text-gray-600 mt-2 text-center transition-opacity duration-500">{message}</p>
        </div>
    );
};


const ReportGenerator: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [params, setParams] = useState<Partial<ReportParameters>>({
        selectedOptions: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLetterModalOpen, setLetterModalOpen] = useState(false);
    const [dynamicTierInfo, setDynamicTierInfo] = useState<{ [key: string]: { description?: string; isLoading: boolean; } }>({});


    // State for manual entry toggles
    const [isManualCity, setIsManualCity] = useState(false);
    const [isManualIndustry, setIsManualIndustry] = useState(false);

    // State for dynamic city loading
    const [regionalCities, setRegionalCities] = useState<string[]>([]);
    const [isCityLoading, setIsCityLoading] = useState(false);
    const [cityError, setCityError] = useState('');

    const wizardLabels = ['Mode', 'Template', 'Profile', 'Persona', 'Scope', 'Partner Profile', 'Depth & Intent'];
    const conditionalWizardLabels = params.analysisMode === 'market_analysis' ? wizardLabels.filter(l => l !== 'Partner Profile') : wizardLabels;

    useEffect(() => {
        if (currentStep !== 5 || !params.targetCountry || isManualCity) return;
        
        let isCancelled = false;
        setIsCityLoading(true);
        setCityError('');
        fetchRegionalCities(params.targetCountry)
            .then(cities => {
                if (isCancelled) return;
                setRegionalCities(cities);
                if (cities.length === 0) {
                    setCityError('No cities found for this country. Please enter manually.');
                    setIsManualCity(true);
                }
            })
            .catch(err => {
                if (isCancelled) return;
                setCityError(err.message);
                setIsManualCity(true);
            })
            .finally(() => {
                if (!isCancelled) setIsCityLoading(false);
            });
        
        return () => { isCancelled = true };
    }, [params.targetCountry, isManualCity, currentStep]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);

    const handleParamChange = (field: keyof ReportParameters, value: any) => {
        setParams(prev => ({ ...prev, [field]: value }));
    };
    
    const handleTemplateSelection = (template: ReportTemplate) => {
        const objective = template.defaultObjective;
    
        setParams(prev => ({
            ...prev,
            reportTemplateId: template.id,
            selectedOptions: [...new Set([...(prev.selectedOptions || []), ...template.preselectedOptions])],
            objective: prev.objective || objective,
        }));
        
        handleNext();
    };

    const getLiveTierDescription = async (tier: any) => {
        setDynamicTierInfo(prev => ({...prev, [tier.name]: { isLoading: true }}));
        try {
            const res = await fetch('/api/generate-tier-description', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tierName: tier.name,
                    originalDescription: tier.description,
                    features: tier.features,
                })
            });
            if (!res.ok) throw new Error("API failed");
            const newDescription = await res.text();
            setDynamicTierInfo(prev => ({...prev, [tier.name]: { description: newDescription, isLoading: false }}));
        } catch (e) {
            // Simply reset loading on error to allow retry
            setDynamicTierInfo(prev => ({...prev, [tier.name]: { isLoading: false }})); 
        }
    };


    const handleCheckboxChange = (optionId: string) => {
        const currentOptions = params.selectedOptions || [];
        const newOptions = currentOptions.includes(optionId)
            ? currentOptions.filter(id => id !== optionId)
            : [...currentOptions, optionId];
        handleParamChange('selectedOptions', newOptions);
    };

    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handleBack = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentStep(9); // Go directly to final report/streaming step
        setIsLoading(true);
        setParams(p => ({ ...p, generatedReportXml: '', error: undefined }));

        try {
            const finalParams = params as ReportParameters;
            
            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalParams)
            });

            if (!response.ok || !response.body) {
                const errorText = await response.text();
                throw new Error(`Failed to generate report: ${response.statusText} - ${errorText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                setParams(p => ({ ...p, generatedReportXml: (p.generatedReportXml || '') + chunk }));
            }
            
        } catch (err) {
            console.error(err);
            setParams(p => ({ ...p, error: 'An error occurred during report generation.' }));
        } finally {
            setIsLoading(false);
        }
    };

    const optionsByCategory = useMemo(() => {
        const personaType = params.analysisMode === 'market_analysis' ? 'business' : 'government';
        
        const availableOptions = REPORT_OPTIONS.filter(opt => 
            opt.availableTo === 'all' || opt.availableTo === personaType
        );

        return availableOptions.reduce((acc, option) => {
            const category = option.category || 'General';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(option);
            return acc;
        }, {} as Record<string, typeof REPORT_OPTIONS>);
    }, [params.analysisMode]);
    
    const renderStepContent = () => {
        // Since step 8 (loader) is skipped, we go straight to step 9 for streaming/final view
        if (currentStep >= 9) {
            if (params.error) {
                 return (
                    <div className="p-8 text-center">
                        <XCircleIcon className="w-16 h-16 mx-auto text-red-500" />
                        <h2 className="text-2xl font-bold text-red-700 mt-4">Report Generation Failed</h2>
                        <p className="mt-2 text-gray-600">{params.error}</p>
                        <p className="text-sm text-gray-500 mt-1">Please try again or adjust your query.</p>
                         <button onClick={() => setCurrentStep(7)} className="btn btn-secondary mt-6">
                            &#8592; Back to Final Step
                        </button>
                    </div>
                );
            }
            return (
                <div className="p-4 sm:p-8">
                    {/* The header shows while streaming and when complete */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-green-700 flex items-center justify-center gap-2">
                            {isLoading ? <Spinner dark /> : <CheckCircleIcon className="!w-8 !h-8 !mt-0"/>}
                            {isLoading ? 'Your Intelligence Report is Generating...' : 'Your Intelligence Report is Ready!'}
                        </h2>
                        <p className="mt-2 text-gray-600">
                           {isLoading 
                            ? 'The report is streaming live from the Nexus AI engine.'
                            : 'This is the complete, multi-page report generated by the Nexus AI based on your strategic brief.'
                           } 
                        </p>
                    </div>
                    
                    {!isLoading && (
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => setLetterModalOpen(true)} 
                            className="btn btn-secondary border-blue-600 text-blue-700 hover:bg-blue-100"
                            disabled={!params.generatedReportXml}
                        >
                            Generate Outreach Letter
                        </button>
                         <button onClick={() => { setParams({}); setCurrentStep(1); }} className="btn btn-primary">
                            &#8592; Start New Report
                        </button>
                    </div>
                    )}

                    <div className="mt-8">
                         <div
                            dangerouslySetInnerHTML={{ __html: nidlToHtml(params.generatedReportXml || '') }}
                         />
                    </div>
                </div>
            );
        }

        switch (currentStep) {
            case 1: // Mode Selection
                return (
                    <div className="p-8">
                        <StepHeader title="Step 1: Choose Your Analysis Mode">This initial choice frames the entire analysis. Are you looking to attract investment to your region, or evaluate a region for a new investment?</StepHeader>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div onClick={() => { handleParamChange('analysisMode', 'partner_matchmaking'); handleNext(); }} className="wizard-role-card">
                                <p className="font-semibold text-lg">Attract Investment</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <strong className="text-gray-700">For Government & Development Agencies.</strong><br/>
                                    The AI will generate a prospectus to attract ideal foreign partners to your region.
                                </p>
                            </div>
                            <div onClick={() => { handleParamChange('analysisMode', 'market_analysis'); handleNext(); }} className="wizard-role-card">
                                <p className="font-semibold text-lg">Evaluate a Region</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <strong className="text-gray-700">For Corporate & Financial Sectors.</strong><br/>
                                    The AI will analyze a target region's viability for your next investment or expansion.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            
            case 2: // Template Selection
                const templates = params.analysisMode ? REPORT_TEMPLATES[params.analysisMode] : [];
                if (!params.analysisMode) {
                    setCurrentStep(1); // Should not happen with normal flow
                    return null;
                }
                return (
                    <div className="p-8">
                        <StepHeader title="Step 2: Choose Your Report Template">Select a template to guide the AI and structure the report's focus. You can customize the details in later steps.</StepHeader>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {templates.map((template: ReportTemplate) => (
                                <div key={template.id} onClick={() => handleTemplateSelection(template)} className="wizard-role-card flex flex-col items-start h-full p-6 text-left">
                                    <p className="font-semibold text-lg">{template.name}</p>
                                    <p className="text-sm text-gray-500 mt-1 flex-grow">
                                        {template.description}
                                    </p>
                                    {template.preselectedOptions.length > 0 && (
                                        <div className="mt-4 pt-4 border-t w-full">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Includes:</p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {template.preselectedOptions.map(opt => (
                                                    <span key={opt} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">{REPORT_OPTIONS.find(o => o.id === opt)?.title || opt}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 3: // Profile Information
                return (
                    <div className="p-8">
                        <StepHeader title="Step 3: Your Profile">This information appears on the report cover to formalize the document and provide context for the AI.</StepHeader>
                        <div className="space-y-6 max-w-lg mx-auto">
                           <div><label htmlFor="userName" className="form-label">Full Name</label><input type="text" id="userName" name="userName" required className="form-input" value={params.userName || ''} onChange={e => handleParamChange('userName', e.target.value)} /></div>
                           <div><label htmlFor="organization" className="form-label">Department/Agency/Organization</label><input type="text" id="organization" name="organization" required className="form-input" value={params.organization || ''} onChange={e => handleParamChange('organization', e.target.value)} /></div>
                           <div><label htmlFor="country" className="form-label">Country</label><select id="country" name="country" required className="form-select" value={params.country || ''} onChange={e => handleParamChange('country', e.target.value)}><option value="">Select Country...</option>{COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                        </div>
                    </div>
                );

            case 4: // Persona Selection
                return (
                    <div className="p-8">
                        <StepHeader title="Step 4: Select Your Persona">Your persona helps the AI understand your perspective and priorities, ensuring the analysis is framed correctly.</StepHeader>
                        <div className="space-y-4 max-w-lg mx-auto">
                            {PERSONAS.map(p => (
                                <div key={p} onClick={() => { handleParamChange('persona', p); handleNext(); }} className={`wizard-role-card text-left flex items-center ${params.persona === p ? 'active' : ''}`}>
                                    <span className="text-lg font-semibold">{p}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            case 5: // Scope Definition
                 return (
                    <div className="p-8">
                        <StepHeader title="Step 5: Define Report Scope">Specify the 'where' and 'what' for the analysis. Precise scope ensures highly relevant intelligence.</StepHeader>
                        <div className="space-y-6 max-w-lg mx-auto">
                            <div><label htmlFor="targetCountry" className="form-label">Target Country</label><select id="targetCountry" name="targetCountry" required className="form-select" value={params.targetCountry || ''} onChange={e => handleParamChange('targetCountry', e.target.value)}><option value="">Select Country...</option>{COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                            <div>
                                <div className="flex justify-between items-center mb-2"><label htmlFor="regionalCity" className="form-label">Regional City/Area</label><label className="text-xs flex items-center"><input type="checkbox" className="mr-2" checked={isManualCity} onChange={e => setIsManualCity(e.target.checked)} />Manual Entry</label></div>
                                {isManualCity ? (<input type="text" id="regionalCity" name="regionalCity" required className="form-input" value={params.regionalCity || ''} onChange={e => handleParamChange('regionalCity', e.target.value)} />) : 
                                 isCityLoading ? (<div className="form-input flex items-center justify-center text-gray-500"><Spinner dark /> Loading cities...</div>) :
                                 (<select id="regionalCity" name="regionalCity" required className="form-select" value={params.regionalCity || ''} onChange={e => handleParamChange('regionalCity', e.target.value)}><option value="">Select City...</option>{regionalCities.map(c => <option key={c} value={c}>{c}</option>)}</select>)}
                                {cityError && <p className="text-xs text-red-500 mt-1">{cityError}</p>}
                            </div>
                            <div>
                               <div className="flex justify-between items-center mb-2"><label htmlFor="industry" className="form-label">Industry Focus</label><label className="text-xs flex items-center"><input type="checkbox" className="mr-2" checked={isManualIndustry} onChange={e => setIsManualIndustry(e.target.checked)} />Manual Entry</label></div>
                               {isManualIndustry ? (<input type="text" id="industry" name="industry" required className="form-input" value={params.industry || ''} onChange={e => handleParamChange('industry', e.target.value)} />) : (<select id="industry" name="industry" required className="form-select" value={params.industry || ''} onChange={e => handleParamChange('industry', e.target.value)}><option value="">Select Industry...</option>{INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}</select>)}
                            </div>
                        </div>
                    </div>
                );

            case 6: // Partner Profile (Conditional)
                if (params.analysisMode === 'market_analysis') {
                    setCurrentStep(7); // Skip this step
                    return null;
                }
                return (
                     <div className="p-8">
                        <StepHeader title="Step 6: Define Ideal Partner Profile">Describe the type of company you are looking for. This helps the AI find the best possible matches.</StepHeader>
                        <div className="space-y-6 max-w-xl mx-auto">
                            <CheckboxGroup
                                label="Company Size"
                                options={COMPANY_SIZES}
                                selected={params.companySize || []}
                                onChange={(selection) => handleParamChange('companySize', selection)}
                            />
                            <CheckboxGroup
                                label="Key Technologies/Capabilities"
                                options={KEY_TECHNOLOGIES}
                                selected={params.keyTechnologies || []}
                                onChange={(selection) => handleParamChange('keyTechnologies', selection)}
                            />
                            <CheckboxGroup
                                label="Company's Target Markets"
                                options={TARGET_MARKETS}
                                selected={params.targetMarket || []}
                                onChange={(selection) => handleParamChange('targetMarket', selection)}
                            />
                        </div>
                    </div>
                );
            
            case 7: // Depth & Intent
                const tiers = params.analysisMode === 'partner_matchmaking' ? GOVERNMENT_TIERS : BUSINESS_TIERS;
                return (
                     <form onSubmit={handleSubmit} className="p-8">
                        <StepHeader title="Step 7: Select Depth & State Intent">Choose your report tier, customize with optional modules, and provide a clear objective to guide the AI.</StepHeader>
                         <div className="space-y-8 max-w-6xl mx-auto">
                             <div>
                                <h4 className="text-lg font-semibold text-center mb-4 text-gray-800">Select Report Tier</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {tiers.map(t => {
                                        const liveInfo = dynamicTierInfo[t.name];
                                        return (
                                        <div key={t.name} onClick={() => handleParamChange('selectedTier', t)} className={`card relative flex flex-col p-0 border-2 transition-all duration-200 cursor-pointer ${params.selectedTier?.name === t.name ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'}`}>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); getLiveTierDescription(t); }} 
                                                className="absolute top-2 right-2 z-10 btn btn-sm btn-secondary !p-1.5 !rounded-full opacity-60 hover:opacity-100 disabled:opacity-50" 
                                                title="Refresh description with AI"
                                                disabled={liveInfo?.isLoading}
                                            >
                                                {liveInfo?.isLoading ? <Spinner dark className="!w-4 !h-4" /> : <SparklesIcon className="w-4 h-4"/>}
                                            </button>
                                            <div className="p-4 border-b">
                                                <h5 className="font-bold text-lg text-nexus-blue">{t.name}</h5>
                                                <p className="text-sm text-gray-500 h-16 flex items-center">
                                                    {liveInfo?.description ? <i className="text-blue-900">"{liveInfo.description}"</i> : t.description}
                                                </p>
                                            </div>
                                            <div className="p-4 flex-grow">
                                                <p className="text-3xl font-extrabold text-gray-900 my-2">{t.price}</p>
                                                <h6 className="font-semibold text-gray-700 mt-6 mb-3">What You Get:</h6>
                                                <ul className="space-y-3 text-sm text-gray-600">
                                                    {t.features.map(feature => (
                                                        <li key={feature} className="flex gap-x-3">
                                                            <svg className="h-6 w-5 flex-none text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-left" dangerouslySetInnerHTML={{ __html: String(feature).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-center mb-4 text-gray-800">Customize with Analytical Modules (Optional)</h4>
                                {Object.entries(optionsByCategory).map(([category, options]) => (
                                    <div key={category} className="mb-6">
                                        <h5 className="font-semibold text-gray-700 mb-3 pl-1">{category}</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {options.map(option => (
                                                <label key={option.id} htmlFor={`option-${option.id}`} className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${params.selectedOptions?.includes(option.id) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                    <input
                                                        id={`option-${option.id}`}
                                                        type="checkbox"
                                                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 flex-shrink-0"
                                                        checked={params.selectedOptions?.includes(option.id) || false}
                                                        onChange={() => handleCheckboxChange(option.id)}
                                                    />
                                                    <div className="ml-4">
                                                        <span className="font-semibold text-gray-800">{option.title}</span>
                                                        <p className="text-sm text-gray-600">{option.description}</p>
                                                    </div>
                                                    <span className="ml-auto flex-shrink-0 pl-2 text-sm font-mono text-green-600">{option.cost}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                             <div>
                                <label htmlFor="objective" className="form-label text-center text-lg font-semibold text-gray-800">Strategic Objective/Intent</label>
                                <textarea id="objective" name="objective" required rows={5} className="form-textarea" placeholder="Be as specific as possible. e.g., 'My company needs to diversify our manufacturing base for widgets away from China. Find 3 potential regions in Southeast Asia with low tariff risk, strong logistics, and available skilled labor.'" value={params.objective || ''} onChange={e => handleParamChange('objective', e.target.value)} />
                             </div>
                              <div className="text-center pt-4">
                                <button type="submit" disabled={isLoading || !params.selectedTier || !params.objective} className="btn btn-primary btn-lg">
                                    {isLoading ? <Spinner /> : "Activate Nexus AI"}
                                </button>
                            </div>
                         </div>
                    </form>
                )

            case 8: // Loading / Streaming - This case is no longer used, logic moved to step 9.
                 return <ReportGenerationLoader />;

            default:
                setCurrentStep(1);
                return null;
        }
    };
    
    return (
        <div className="page-container">
            <div>
                <div className="page-header">
                     <h1>The Guided Strategic Intelligence Builder</h1>
                     <p>A step-by-step process to provide the Nexus AI with a precise, high-quality strategic brief.</p>
                </div>
                {isLetterModalOpen && params && (
                    <LetterGeneratorModal
                        onClose={() => setLetterModalOpen(false)}
                        letterRequest={{
                            userRole: params.persona === 'Government Agency' ? 'government' : 'business',
                            userName: params.userName || 'B. Walls',
                            organization: params.organization || '',
                            country: params.country || '',
                            reportContent: params.generatedReportXml || '',
                        }}
                    />
                )}
                <div className="card shadow-xl max-w-7xl mx-auto">
                    <div className="p-6">
                         {currentStep < 9 && <ProgressIndicator current={currentStep} labels={conditionalWizardLabels} />}
                    </div>
                    <div className="bg-gray-50">
                        {renderStepContent()}
                    </div>
                     {currentStep > 1 && currentStep < 8 && (
                         <div className="p-4 border-t flex justify-between items-center bg-white">
                              <button onClick={handleBack} className="btn btn-secondary">Back</button>
                              <button onClick={handleNext} className="btn btn-primary" disabled={
                                  (currentStep === 3 && (!params.userName || !params.organization || !params.country)) ||
                                  (currentStep === 4 && !params.persona) ||
                                  (currentStep === 5 && (!params.targetCountry || !params.regionalCity || !params.industry)) ||
                                  (currentStep === 7 && (!params.selectedTier || !params.objective))
                              }>Next</button>
                         </div>
                     )}
                </div>
            </div>
        </div>
    );
};

export default ReportGenerator;