/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrandLogo, CheckCircleIcon, XCircleIcon, SparklesIcon, Spinner } from './Icons';
import { BUSINESS_TIERS, GOVERNMENT_TIERS, REPORT_OPTIONS } from '../content';
import { RetroReportGraphic } from './Illustrations';


const Annotation: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="annotation-box">
        <h4 className="!mt-0">{title}</h4>
        <p>{children}</p>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode; annotation: React.ReactNode }> = ({ title, children, annotation }) => (
    <section>
        <h2 className="report-section-title">{title}</h2>
        {children}
        {annotation}
    </section>
);


export const SampleReport: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const [tierType, setTierType] = useState<'business' | 'government'>('business');
    const [dynamicDescriptions, setDynamicDescriptions] = useState<{ [key: string]: { description: string; isLoading: boolean; error: string | null } }>({});
    const tiersToShow = tierType === 'business' ? BUSINESS_TIERS : GOVERNMENT_TIERS;
    
    const handleGetStartedClick = () => {
        setPage('report');
    };

    const getLiveDescription = async (tier: any) => {
        setDynamicDescriptions(prev => ({ ...prev, [tier.name]: { description: '', isLoading: true, error: null } }));
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
            if (!res.ok) throw new Error('Failed to fetch description from AI.');
            const newDescription = await res.text();
            setDynamicDescriptions(prev => ({ ...prev, [tier.name]: { description: newDescription, isLoading: false, error: null } }));
        } catch (e) {
            setDynamicDescriptions(prev => ({ ...prev, [tier.name]: { description: '', isLoading: false, error: 'AI failed to respond.' } }));
        }
    };

    const InfoIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="info-banner-icon">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div className="page-container">
             <div className="bg-white py-10">
                <div className="page-container !pt-0">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Reports & Pricing</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600">Explore our transparent pricing and tailored intelligence solutions. Choose a path, customize with analytical modules, and see a sample of the actionable insights Nexus delivers.</p>
                    </div>

                    <div className="mt-6 inline-flex w-full justify-center p-1 bg-gray-200 rounded-lg mb-10">
                        <button onClick={() => setTierType('business')} className={`px-6 py-2 rounded-md text-sm font-semibold transition w-1/2 ${ tierType === 'business' ? 'bg-white text-nexus-blue shadow' : 'text-gray-600'}`}>For Business</button>
                        <button onClick={() => setTierType('government')} className={`px-6 py-2 rounded-md text-sm font-semibold transition w-1/2 ${ tierType === 'government' ? 'bg-white text-nexus-blue shadow' : 'text-gray-600'}`}>For Government</button>
                    </div>

                    <div className="max-w-4xl mx-auto my-8">
                        <div className="info-banner">
                            <InfoIcon />
                            <div>
                                <h3 className="!mt-0">Community Reinvestment Mandate</h3>
                                <p className="!mb-0">A non-negotiable portion of every paid report fee (up to 30%) is allocated to our BWGA Impact Fund, with donations made to verified community projects in the region analyzed.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {tiersToShow.map((tier) => {
                            const liveDesc = dynamicDescriptions[tier.name];
                            return (
                                <div key={tier.name} className="tier-card">
                                    <div className="tier-header relative">
                                        <div className="absolute top-2 right-2 z-10">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); getLiveDescription(tier); }}
                                                className="btn btn-sm btn-secondary !p-2 !rounded-full opacity-60 hover:opacity-100 disabled:opacity-50"
                                                title="Get live description from AI"
                                                disabled={liveDesc?.isLoading}
                                            >
                                                {liveDesc?.isLoading ? <Spinner dark className="!w-4 !h-4" /> : <SparklesIcon className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <h3 className="tier-name">{tier.name}</h3>
                                        <div className="tier-description">
                                            {liveDesc ? (
                                                liveDesc.isLoading ? <span className="flex items-center text-xs"><Spinner dark className="!w-4 !h-4 mr-2" /> Fetching...</span> :
                                                liveDesc.error ? <span className="text-red-500 text-xs">{liveDesc.error}</span> :
                                                <span className="italic">"{liveDesc.description}"</span>
                                            ) : (
                                                <span>{tier.description}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tier-body">
                                        <p className="tier-price">{tier.price}</p>
                                        <ul className="tier-features">
                                            {tier.features.map((feature) => (
                                                <li key={feature}>
                                                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>
                                                    <span dangerouslySetInnerHTML={{__html: String(feature).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}/>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="tier-footer">
                                        <button onClick={handleGetStartedClick} className="btn btn-primary w-full">Get Started</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            
            <hr className="my-16 border-t-2 border-gray-300 border-dashed" />

            <div className="my-16">
                <h2 className="text-3xl font-bold text-center text-gray-800">Customize Any Report with Analytical Modules</h2>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto text-center">
                    Enhance any report tier by adding specialized "à la carte" modules. You only pay for the exact intelligence you need.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REPORT_OPTIONS.map(option => (
                        <div key={option.id} className="card p-5 flex flex-col">
                            <div className="flex-grow">
                                <h4 className="font-bold text-md text-nexus-blue">{option.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-xs font-semibold uppercase text-gray-500">{option.category}</span>
                                <span className="font-mono text-green-600 text-sm">{option.cost}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-16 border-t-2 border-gray-300 border-dashed" />

            <div className="text-center mb-12 flex flex-col items-center">
                 <div className="w-full max-w-xs mb-8">
                    <RetroReportGraphic />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-800">Anatomy of a Nexus Report</h2>
                <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
                    This document is a sample output from the BWGA Nexus AI. Each section is generated by a specialized AI engine, grounded in established regional science methodologies, to provide actionable intelligence.
                </p>
            </div>

            <div className="card p-8 sm:p-12">
                <header className="mb-12">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Foreign Partner Prospectus</h1>
                             <p className="text-md text-gray-600">Mindanao, Philippines: Attracting AgriTech Investment</p>
                        </div>
                        <div className="flex flex-col items-end">
                             <BrandLogo theme="light" />
                             <p className="text-xs text-gray-500 mt-2">Prepared for: Mindanao Development Authority</p>
                        </div>
                    </div>
                </header>

                <main className="prose max-w-none">
                    <Section 
                        title="Executive Summary"
                        children={(
                            <p>Mindanao possesses significant, yet underexploited, potential to become a premier AgriTech hub in Southeast Asia. Its vast agricultural resources, combined with strong government support for modernization, create a compelling case for foreign investment. This prospectus identifies key foreign partners whose technological expertise directly addresses Mindanao's primary logistical and productivity challenges, outlining a clear path to transforming its agricultural sector into a high-value, technology-driven ecosystem.</p>
                        )}
                        annotation={(
                            <Annotation title="AI-Generated Synthesis">
                                The <strong>Nexus Cortex™</strong> engine analyzes all generated data points—from risk scores to partner profiles—to produce a concise, strategic summary. This isn't a simple abstract; it's a synthesized narrative that frames the entire report.
                            </Annotation>
                        )}
                    />
                    
                    <Section
                        title="Recommended Foreign Partners"
                        children={(
                             <div className="overflow-x-auto not-prose">
                                <table className="report-table">
                                    <thead>
                                        <tr>
                                            <th className="header-sky">Company</th>
                                            <th className="header-sky">Tech Alignment</th>
                                            <th className="header-sky">Strategic Rationale</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold">Dematic</td>
                                            <td>Robotics & Automation</td>
                                            <td>A global leader in warehouse and port automation. A partnership could directly address Mindanao's key weakness in cold chain and export logistics, increasing efficiency and reducing spoilage.</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Netafim</td>
                                            <td>Precision Agriculture</td>
                                            <td>Pioneers in drip irrigation and smart farming solutions. Their technology can significantly boost crop yields, improve water efficiency, and enhance resilience to climate change for local farms.</td>
                                        </tr>
                                         <tr>
                                            <td className="font-semibold">Fresh Supply Co.</td>
                                            <td>Blockchain & SaaS</td>
                                            <td>Specializes in supply chain digitization and provenance tracking. Their platform can provide the transparency needed to attract premium export markets and secure financing for local producers.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        annotation={(
                            <Annotation title="AI-Driven Partner Matchmaking">
                                The <strong>NSIL™</strong> model analyzes a company's public statements, product lines, and market focus to determine its strategic intent, then matches it against the region's specific needs and opportunities identified in the analysis.
                            </Annotation>
                        )}
                    />

                    <Section
                        title="Strategic Recommendations"
                        children={(
                            <ol>
                                <li><strong>Initiate a G2G Dialogue with Israel:</strong> Leverage Israel's leadership in AgriTech to create a formal knowledge-sharing and investment pipeline, focusing on companies like Netafim.</li>
                                <li><strong>Develop a "Logistics Modernization" Grant:</strong> Create a targeted fund to co-finance automation projects with companies like Dematic for key ports and processing zones.</li>
                                <li><strong>Launch a Digital Traceability Pilot Program:</strong> Partner with an innovator like Fresh Supply Co. to run a pilot program for a high-value export crop (e.g., premium bananas or coffee) to showcase enhanced value.</li>
                            </ol>
                        )}
                        annotation={(
                            <Annotation title="Actionable Intelligence, Not Just Data">
                                Recommendations are the final output of the entire analytical chain. The AI grounds each suggestion in the preceding analysis, ensuring every proposed action is specific, data-driven, and directly aimed at achieving the user's stated strategic objective.
                            </Annotation>
                        )}
                    />
                </main>
            </div>
        </div>
    );
};