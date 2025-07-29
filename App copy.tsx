/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ReportGenerator from './components/ReportGenerator';
import Compliance from './components/Compliance';
import { EULA_CONTENT } from './content';
import { OurPackagesAndModules } from './components/PricingAndGuide';
import Subscription from './components/Subscription';
import Welcome from './Welcome';
import Dashboard from './components/Dashboard';
import NexusIntelligence from './components/NexusIntelligence';
import OptionsAndSample from './components/OptionsAndSample';
import type { ActiveSubscription, ReportParameters, SubscriptionPlan } from './types';


export const App: React.FC = () => {
    const [page, setPage] = useState('welcome');
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [activeSubscription, setActiveSubscription] = useState<ActiveSubscription | null>(null);
    
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const handleActivateSubscription = (plan: SubscriptionPlan, persona: ReportParameters['persona']) => {
        setActiveSubscription({ plan: plan, persona });
        setPage('report_generator'); // Navigate to the report generator after activation
    };

    const renderPage = () => {
        switch (page) {
            case 'welcome':
                return <Welcome setPage={setPage} />;
            case 'nexus_intelligence':
                return <NexusIntelligence setPage={setPage}/>;
            case 'dashboard':
                return <Dashboard activeSubscription={activeSubscription} setPage={setPage} />;
            case 'packages_modules':
                return <OurPackagesAndModules setPage={setPage} />;
            case 'options_sample':
                return <OptionsAndSample />;
            case 'desktop_app': // This key is kept for the "Purchase" button
                return <Subscription onSubscribe={handleActivateSubscription} />;
            case 'report_generator':
                return <ReportGenerator isOffline={isOffline} activeSubscription={activeSubscription} setPage={setPage} />;
            case 'compliance':
                return <Compliance content={EULA_CONTENT} />;
            default:
                setPage('welcome'); // Fallback to welcome page
                return null;
        }
    };

    return (
        <Layout 
            currentPage={page} 
            setPage={setPage} 
            isOffline={isOffline}
            activeSubscription={activeSubscription}
        >
            {renderPage()}
        </Layout>
    );
};
