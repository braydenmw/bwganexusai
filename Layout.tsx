/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrandLogo } from './components/Icons';

interface LayoutProps {
    currentPage: string;
    setPage: (page: string) => void;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentPage, setPage, children }) => {
    
    const navItems = [
        { id: 'mission', label: 'Our Mission' },
        { id: 'nexus_intelligence', label: 'Nexus Intelligence' },
        { id: 'reports_pricing', label: 'Reports & Pricing' },
        { id: 'dashboards', label: 'Dashboard' },
        { id: 'report', label: 'Report Generator' },
        { id: 'compliance', label: 'Compliance' },
    ];

    return (
        <div id="app">
            <header className="app-header">
                <nav className="app-nav">
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage('mission'); }} className="nav-logo-link">
                        <BrandLogo theme="light" />
                    </a>
                    <div className="nav-links">
                        {navItems.map(item => (
                             <a 
                                key={item.id}
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setPage(item.id); }} 
                                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    {/* Add a mobile menu button here in a future update if needed */}
                </nav>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="app-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                         <BrandLogo theme="dark" />
                    </div>
                    <p className="footer-text">© {new Date().getFullYear()} BW Global Advisory. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;