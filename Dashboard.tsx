

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getDashboardData } from '../gemini';
import type { DashboardData, NewsArticle, GovProgram } from '../types';
import { Spinner, BrandLogo } from './Icons';

// Sub-components for clarity
const ChartCard: React.FC<{ chartId: string, chartRef: React.RefObject<HTMLCanvasElement>, height?: string, title: string }> = ({ chartId, chartRef, height = "120", title }) => (
    <div className="dashboard-card">
        <h3>{title}</h3>
        <canvas id={chartId} ref={chartRef} height={height}></canvas>
    </div>
);

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <div className="news-card">
        <h4 className="news-headline">{article.headline}</h4>
        <p className="news-source">{article.source}</p>
        <p className="news-summary">{article.summary}</p>
        <div className="analyst-note">
            <p className="analyst-note-title">AI Analyst Note:</p>
            <p className="analyst-note-text">{article.analystNote}</p>
        </div>
    </div>
);

const ProgramCard: React.FC<{ program: GovProgram }> = ({ program }) => (
    <div className="program-card">
        <h4 className="program-name">{program.name}</h4>
        <div className="program-details">
            <span>{program.region}</span>
            <span className={`program-status status-${program.status.toLowerCase().replace(/ /g, '-')}`}>{program.status}</span>
        </div>
        <p className="program-objective">{program.objective}</p>
    </div>
);


const Dashboard: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
    const [persona, setPersona] = useState<'gov' | 'biz'>('gov');
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Chart refs
    const gdpChartRef = useRef<HTMLCanvasElement>(null);
    const industryChartRef = useRef<HTMLCanvasElement>(null);
    const compareChartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        document.body.classList.add('dashboard-page');
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const dashboardData = await getDashboardData(persona);
                setData(dashboardData);
            } catch (e) {
                setError("Failed to load dashboard intelligence data. Please try again later.");
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            document.body.classList.remove('dashboard-page');
        };
    }, [persona]);

    useEffect(() => {
        if (!data) return;

        const chartInstances: Chart[] = [];
        
        if (gdpChartRef.current) {
             chartInstances.push(new Chart(gdpChartRef.current, {
                type: 'line',
                data: { labels: data.keyMetrics.gdp.years, datasets: [{ label: 'GDP Growth (%)', data: data.keyMetrics.gdp.values, borderColor: '#1890ff', backgroundColor: 'rgba(24,144,255,0.1)', fill: true, tension: 0.3 }] },
                options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false } } }
            }));
        }
        if (industryChartRef.current) {
            chartInstances.push(new Chart(industryChartRef.current, {
                type: 'bar',
                data: { labels: data.industryTrends.industries, datasets: [{ label: 'Growth (%)', data: data.industryTrends.growth, backgroundColor: '#005fa3' }] },
                options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }
            }));
        }
        if (compareChartRef.current) {
             chartInstances.push(new Chart(compareChartRef.current, {
                type: 'radar',
                data: { labels: data.regionalScores.regions, datasets: [{ label: 'Regional Competitiveness', data: data.regionalScores.scores, backgroundColor: 'rgba(0,63,102,0.2)', borderColor: '#003366', pointBackgroundColor: '#1890ff' }] },
                options: { plugins: { legend: { display: false } }, scales: { r: { beginAtZero: true, min: 0, max: 100 } } }
            }));
        }

        return () => {
            chartInstances.forEach(chart => chart.destroy());
        };
    }, [data]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="loading-overlay"><Spinner dark /> <p className="ml-4">Fetching intelligence briefing...</p></div>;
        }
        if (error || !data) {
            return <div className="error-overlay">{error || "No data available."}</div>;
        }

        return (
            <div className="dashboard-grid">
                {/* Column 1 */}
                <div className="dashboard-column">
                     <div className="dashboard-card briefing-card">
                        <h3>Daily Intelligence Briefing</h3>
                        <p>{data.dailyBriefing}</p>
                    </div>
                     <ChartCard chartId="gdpChart" chartRef={gdpChartRef} title="Key Economic Indicator (GDP %)" height="140" />
                     <ChartCard chartId="compareChart" chartRef={compareChartRef} title="Regional Competitiveness" height="200" />
                </div>

                {/* Column 2 (Main News) */}
                <div className="dashboard-column-main">
                     <h3 className="column-title">Strategic News Feed</h3>
                     <div className="news-feed">
                        {data.newsFeed.map(article => <NewsCard key={article.id} article={article} />)}
                     </div>
                </div>
                
                {/* Column 3 */}
                <div className="dashboard-column">
                     <h3 className="column-title">Global Program Tracker</h3>
                     <div className="program-feed">
                         {data.govPrograms.map(program => <ProgramCard key={program.id} program={program} />)}
                     </div>
                     <ChartCard chartId="industryChart" chartRef={industryChartRef} title="Key Industry Growth Trends (%)" height="220" />
                </div>
            </div>
        );
    };

    return (
        <>
            <header className="dashboard-header">
                <div className="flex items-center gap-6">
                    <BrandLogo theme="dark" />
                    <h2 className="dashboard-title-text">AI Dashboard</h2>
                </div>
                 <div className="flex items-center gap-4">
                     <div className="persona-switch">
                        <button onClick={() => setPersona('gov')} className={persona === 'gov' ? 'active' : ''}>Government View</button>
                        <button onClick={() => setPersona('biz')} className={persona === 'biz' ? 'active' : ''}>Business View</button>
                    </div>
                    <button className="back-to-main-btn" onClick={() => setPage('mission')}>Back to Main Site</button>
                </div>
            </header>

            <main className="dashboard-main-content">
                {renderContent()}
            </main>
        </>
    );
};

export default Dashboard;