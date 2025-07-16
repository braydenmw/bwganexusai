/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IntelStandardGraphic, BridgeGraphic } from './Illustrations';

export const Mission: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    return (
        <div className="bg-white">
            <div className="page-container py-10">
                <div className="max-w-5xl mx-auto">
                    {/* New Introduction Section */}
                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 items-center mb-24">
                        <div className="flex justify-center items-center">
                             <IntelStandardGraphic />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-nexus-blue tracking-tight">A New Standard for Global Intelligence</h1>
                            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                              BWGA Nexus™ is the world's first integrated intelligence platform 100% dedicated to discovering and de-risking opportunities in overlooked regional economies. Our ecosystem combines a free AI Dashboard with a suite of premium intelligence reports, adding a crucial, missing layer of clarity to give organizations the confidence to explore new frontiers.
                            </p>
                        </div>
                    </div>


                    {/* Founding Story Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-16 gap-y-10 items-center">
                        
                        {/* Left Column: Illustration */}
                        <div className="flex justify-center items-center lg:col-span-2">
                            <BridgeGraphic />
                        </div>

                        {/* Right Column: Text */}
                        <div className="lg:col-span-3 prose max-w-none text-lg text-gray-700 space-y-6">
                            <h2 className="!mt-0">The Founding Story: Why This Was Built</h2>
                            <p>My name is Brayden Walls, Founder of BWGA. This platform wasn't developed to compete; it was created to contribute. Its origin lies in my experience living in a regional city with my family, where I saw firsthand the tireless efforts of a local government building a better community—a place many take for granted.</p>
                            
                            <div className="pull-quote not-prose">
                                <p>"I witnessed a profound disconnect. Local leaders were making strategic progress, but this ground-truth was invisible to global markets. This is the world's greatest unprotected asset: <strong>regional potential.</strong>"</p>
                            </div>

                            <p>This isn't a problem unique to one place; it is a systemic failure seen across the globe, and the foundational problem BWGA Nexus was built to solve.</p>
                             <p>This platform is the system I wish had existed then. It is for the development agency, the company deterred by uncertainty, and for the regional communities themselves. Our goal is to be a trusted and cost-effective first step in global opportunity discovery, empowering organizations with the confidence to take the next step—to engage, to invest, and to build sustainable partnerships.</p>
                        </div>
                    </div>
                    
                     <div className="mt-20 text-center">
                        <h3 className="text-center font-bold text-2xl !mt-8 text-gray-900">We exist to make the overlooked, visible.</h3>
                        <button onClick={() => setPage('report')} className="btn btn-primary btn-lg text-lg mt-8">
                            Activate Nexus AI & Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
