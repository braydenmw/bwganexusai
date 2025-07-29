/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrandLogo, NexusLogo } from './components/Icons';
import type { ActiveSubscription } from './types';
import { ScrollToTopButton } from './components/ScrollToTopButton';

interface LayoutProps {
    currentPage: string;
    setPage: (page: string) => void;
    children: React.ReactNode;
    isOffline: boolean;
    activeSubscription: ActiveSubscription | null;
}

const Layout: React.FC<LayoutProps> = ({ currentPage, setPage, children, isOffline, activeSubscription }) => {
    
    const baseNav = [
        { id: 'welcome', label: 'Our Mission' },
        { id: 'packages_modules', label: 'Packages & Modules' },
        { id: 'nexus_intelligence', label: 'Nexus Methodology' },
    ];

    const privateNav = [
        { id: 'report_generator', label: 'Report Generator' },
    ];
    
    const finalBaseNav = [...baseNav, { id: 'dashboard', label: 'Live Dashboard' }];
    const navItems = activeSubscription ? [...finalBaseNav, ...privateNav] : finalBaseNav;
    const finalNavItems = [...navItems, { id: 'compliance', label: 'Compliance' }];

    return (
        <div className="flex flex-col min-h-screen bg-nexus-gray-lightest">
            <header 
                className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-nexus-gray-light shadow-sm no-print transition-all duration-300"
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                             <a href="#" onClick={(e) => { e.preventDefault(); setPage('welcome'); }} className="flex items-center gap-2 p-2 -ml-2 rounded-md hover:bg-nexus-gray-lighter">
                                <NexusLogo className="h-8 w-8 text-nexus-slate-darkest" />
                                <span className="text-xl font-bold text-nexus-slate-darkest tracking-tight">Nexus</span>
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:gap-2">
                             {finalNavItems.map(item => (
                            <a 
                                key={item.id}
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setPage(item.id); }} 
                                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
                                    currentPage === item.id 
                                    ? 'bg-nexus-blue/10 text-nexus-blue' 
                                    : 'text-nexus-slate hover:bg-nexus-gray-lighter hover:text-nexus-slate-darkest'
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                        </div>
                        <div className="flex items-center">
                             {!activeSubscription && (
                                <button onClick={() => setPage('desktop_app')} className="px-4 py-2 bg-nexus-blue text-white font-semibold rounded-lg shadow-sm hover:bg-nexus-blue-dark transition-colors duration-200">
                                    Purchase Subscription
                                </button>
                            )}
                             {activeSubscription && (
                                <div className="text-right text-xs">
                                    <span className="font-bold text-nexus-blue block">{activeSubscription.plan.title} Active</span>
                                    <span className="text-nexus-slate block">{activeSubscription.persona}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            
            {isOffline && (
                <div className="bg-amber-500 text-white text-center px-4 py-2 font-semibold text-sm no-print">
                    You are currently offline. Some features may be limited and data may be outdated.
                </div>
            )}

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-nexus-slate-darkest text-nexus-slate-light no-print">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                     <BrandLogo theme="dark" />
                    <p className="text-sm mt-4 sm:mt-0">&copy; {new Date().getFullYear()} BW Global Advisory. All rights reserved.</p>
                </div>
            </footer>
            <ScrollToTopButton />
        </div>
    );
};

export default Layout;