/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RetroBlueprintGraphic } from './Illustrations';

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="relative text-center my-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600">{subtitle}</p>
        <hr className="mt-8 w-24 mx-auto border-t-2 border-nexus-blue" />
    </div>
);

const FeatureCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-gray-300">
        <h4 className="font-bold text-lg text-nexus-blue">{title}</h4>
        <p className="mt-2 text-gray-700">{children}</p>
    </div>
);

const HowItWorksStep: React.FC<{ step: number; title: string; children: React.ReactNode }> = ({ step, title, children }) => (
    <div className="flex">
        <div className="flex-shrink-0 mr-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-nexus-blue text-white font-bold text-xl shadow-lg">
                {step}
            </div>
        </div>
        <div>
            <h4 className="text-xl font-bold text-gray-900">{title}</h4>
            <p className="mt-2 text-gray-700 leading-relaxed">{children}</p>
        </div>
    </div>
);


const NexusIntelligence: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">The BWGA Nexus Blueprint</h1>
                <p className="max-w-4xl text-xl">
                    Our proprietary 'Symbiotic Intelligence' platform—a world-first solution designed to bridge the 'Global Understanding Gap' and unlock regional potential.
                </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-10 my-10 prose max-w-none">
                
                {/* Part I: The Problem */}
                <section>
                    <SectionHeader title="The Trillion-Dollar Intelligence Gap" subtitle="Traditional advisory focuses on national-level risk, leaving the true potential of regional economies unseen. Nexus bridges this critical intelligence gap, illuminating untapped value for investors and communities alike." />
                    <div className="grid md:grid-cols-5 gap-12 items-center">
                        <div className="md:col-span-3 space-y-4">
                             <ul className="list-disc pl-5 space-y-3 text-lg">
                                <li><strong>Data Asymmetry & Latency:</strong> Global decision-makers rely on outdated national data, while granular, real-time regional data is inaccessible or unstructured.</li>
                                <li><strong>Prohibitive Cost of Clarity:</strong> Traditional due diligence is a human-intensive, high-cost process, making exploration of non-primary markets unfeasible for most.</li>
                                <li><strong>Lack of a Neutral Platform:</strong> The channels between regional stakeholders and international investors are fragmented, inefficient, and lack a trusted, data-driven intermediary.</li>
                            </ul>
                        </div>
                        <div className="md:col-span-2 flex justify-center p-4">
                            <RetroBlueprintGraphic />
                        </div>
                    </div>
                </section>

                {/* Part II: The Solution */}
                <section>
                    <SectionHeader title="The Solution: A New Intelligence Architecture" subtitle="A 'living system' that translates raw data into strategic clarity and confident decisions."/>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <FeatureCard title="Proprietary Analysis Engine">
                            Our platform is powered by a multi-vector analysis engine that evaluates opportunities across dozens of critical dimensions, from infrastructure readiness and talent availability to political stability and supply chain efficiency.
                        </FeatureCard>
                        <FeatureCard title="Symbiotic Intelligence Core">
                            The system combines advanced AI models with human expertise. A self-learning core gets smarter with every interaction, while our 'human-in-the-loop' process ensures every premium report has strategic oversight and real-world context.
                        </FeatureCard>
                         <FeatureCard title="Advanced Analytics Suite">
                            We move beyond static reports to provide dynamic analysis. The platform incorporates multi-iteration statistical modeling, comparative analysis tools, and historical trend identification to provide a richer, more reliable intelligence picture.
                        </FeatureCard>
                         <FeatureCard title="Ethical & Secure Framework">
                            Our 'Equitable Access Algorithm' provides automatic discounts for users from developing nations, and a mandatory Community Reinvestment Mandate hard-wires social impact into the business model. The entire system is built on a military-grade security foundation.
                        </FeatureCard>
                    </div>
                </section>

                {/* Part III: How It Works */}
                 <section>
                    <SectionHeader title="How It Works: Your Path to Actionable Intelligence" subtitle="A simple, transparent process to take you from initial curiosity to a customized, data-driven strategy."/>
                     <div className="space-y-10 max-w-4xl mx-auto not-prose">
                        <HowItWorksStep step={1} title="Explore with the Live AI Dashboard">
                            Begin with our free-to-access dashboard for a high-level, real-time view of global trends, strategic news, and emerging opportunities. It's the perfect starting point to identify areas of interest.
                        </HowItWorksStep>
                        <HowItWorksStep step={2} title="Create with the Guided Report Builder">
                           When you're ready to dive deeper, our guided builder walks you through a step-by-step dialogue to create a precise strategic brief for the Nexus AI.
                        </HowItWorksStep>
                         <HowItWorksStep step={3} title="Select Your Core Report Tier">
                            Choose the level of depth for your analysis, from a quick 'Opportunity Snapshot' to a comprehensive 'Market Entry Blueprint'. Each tier provides a solid foundation for your intelligence needs.
                        </HowItWorksStep>
                        <HowItWorksStep step={4} title="Enhance with Analytical Modules (Add-ons)">
                            Customize your report by adding specialized "add-on" modules for a nominal fee. Need a deep-dive on logistics? Add the 'Supply Chain Analysis' module. Want to project job growth? Add the 'Economic Impact Modeling' module. You only pay for the exact intelligence you need.
                        </HowItWorksStep>
                     </div>
                </section>
                
                {/* Part IV: The Vision */}
                <section>
                    <SectionHeader title="The Vision: A New Global Standard" subtitle="Our long-term goal is to evolve from a platform into the central, trusted hub for the entire regional investment industry."/>
                     <div className="max-w-4xl mx-auto text-center space-y-4">
                        <p>We aim to create a dynamic marketplace for opportunity, a secure digital space for deal-making, and a new class of data that will power the next generation of financial and economic models. By creating a transparent, efficient, and ethical ecosystem, we can fundamentally change how the world sees, values, and invests in its regions. Our roadmap includes licensing our proprietary data (becoming a source of truth for financial institutions) and even creating tradable 'Impact Bonds' from our community projects to found a new market for ethical investment.</p>
                    </div>
                </section>

                 <div className="mt-16 text-center">
                    <p className="text-lg text-gray-800 font-semibold">This document serves as the foundational declaration of this intellectual property.</p>
                    <p className="mt-2 text-gray-600">We are now proceeding with the necessary legal protections and are seeking strategic partners to help us scale this vision and bridge the Global Understanding Gap for good.</p>
                     <button onClick={() => setPage('report')} className="btn btn-primary btn-lg mt-8">
                        Experience the Engine
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NexusIntelligence;