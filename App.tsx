/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Mission } from './components/Mission';
import NexusIntelligence from './components/NexusIntelligence';
import { SampleReport } from './components/SampleReport';
import Dashboard from './components/Dashboard';
import ReportGenerator from './components/ReportGenerator';
import Compliance from './components/Compliance';
import { masterBlueprintReport } from './content';

const App: React.FC = () => {
    // Set 'mission' as the default landing page instead of a welcome modal.
    const [page, setPage] = useState('mission');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const sections = masterBlueprintReport.split('---');
    const complianceContent = sections[2];

    // The Dashboard is a special full-page view and is handled outside the main layout.
    if (page === 'dashboards') {
        return <Dashboard setPage={setPage} />;
    }

    const renderPage = () => {
        switch (page) {
            case 'mission':
                return <Mission setPage={setPage} />;
            case 'nexus_intelligence':
                return <NexusIntelligence setPage={setPage} />;
            case 'reports_pricing':
                return <SampleReport setPage={setPage} />;
            // case 'dashboards' is handled above
            case 'report':
                return <ReportGenerator />;
            case 'compliance':
                return <Compliance content={complianceContent} />;
            default:
                return <Mission setPage={setPage} />;
        }
    };

    return (
        <Layout currentPage={page} setPage={setPage}>
            {renderPage()}
        </Layout>
    );
};

export default App;