/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Helper function to create a basic DOM parser on the client-side
const getParser = () => new DOMParser();

export function markdownToHtml(text: string): string {
    if (!text) return '';
    
    // Process line-by-line for better control over lists and paragraphs
    const lines = text.split('\n');
    let html = '';
    let inList = false;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('## ')) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h2>${line.substring(3)}</h2>`;
        } else if (line.startsWith('### ')) {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<h3>${line.substring(4)}</h3>`;
        } else if (line.startsWith('>! ')) {
             if (inList) { html += '</ul>'; inList = false; }
             html += `<div class="explanation-box"><p>${line.substring(3).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p></div>`;
        } else if (line.startsWith('**§')) {
            if (inList) { html += '</ul>'; inList = false; }
            const content = line.replace(/\*\*/g,'');
            html += `<h4 class="text-lg font-semibold text-gray-800 mt-6 mb-2">${content}</h4>`;
        } else if (line.startsWith('- ')) {
            if (!inList) {
                html += '<ul class="list-disc space-y-2 pl-5">';
                inList = true;
            }
            html += `<li>${line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            if (line) {
                html += `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
            }
        }
    });

    if (inList) {
        html += '</ul>';
    }

    return html;
}


export function nadlToHtml(nadlString: string): string {
    if (!nadlString) return '';

    try {
        const parser = getParser();
        const xmlDoc = parser.parseFromString(nadlString, "application/xml");

        if (xmlDoc.querySelector("parsererror")) {
            return `<p class="text-red-400">Error parsing analysis data.</p><pre>${nadlString.replace(/</g, '&lt;')}</pre>`;
        }

        const title = xmlDoc.querySelector("nad\\:report_title")?.getAttribute("title") || "Analysis Report";
        const subtitle = xmlDoc.querySelector("nad\\:report_subtitle")?.getAttribute("subtitle");

        let html = `<header class="report-page-header text-center"><h1 class="text-3xl font-bold font-sans text-gray-900">${title}</h1>`;
        if (subtitle) {
            html += `<p class="text-lg text-gray-600 mt-1">${subtitle}</p>`;
        }
        html += `</header><main>`;

        xmlDoc.querySelectorAll("nad\\:section").forEach(section => {
            const sectionTitle = section.getAttribute("title");
            html += `<section><h2 class="report-section-title text-2xl">${sectionTitle}</h2><div class="space-y-4">`;
            section.querySelectorAll("nad\\:paragraph, nad\\:recommendation").forEach(p => {
                html += `<p class="text-base leading-relaxed">${p.textContent}</p>`;
            });
            html += `</div></section>`;
        });

        html += `</main><footer class="mt-12 pt-4 border-t border-gray-300 text-center text-xs text-gray-500"><p>BWGA Nexus AI | Confidential Analysis Document</p></footer>`;
        return html;
    } catch (e) {
        console.error("NADL Parsing Error:", e);
        return `<p class="text-red-400">Could not render analysis.</p>`;
    }
}


export function nidlToHtml(nidlText: string): string {
    if (!nidlText) {
        return '<div class="text-center p-8"><p class="text-gray-500">Your final report will appear here.</p></div>';
    }

    const isComplete = nidlText.trim().endsWith('</document>');

    if (!isComplete) {
        return `<div class="p-4 sm:p-6 bg-gray-50 rounded-lg">
            <h3 class="font-semibold text-gray-700 flex items-center gap-2">
                <svg class="animate-spin h-5 w-5 text-nexus-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generating report... (Streaming)
            </h3>
            <pre class="mt-3 text-xs text-gray-500 whitespace-pre-wrap max-h-96 overflow-y-auto bg-white p-3 rounded-md border">${nidlText.replace(/</g, '&lt;')}</pre>
        </div>`;
    }

    try {
        const parser = getParser();
        const xmlDoc = parser.parseFromString(nidlText, "application/xml");

        const errorNode = xmlDoc.querySelector("parsererror");
        if (errorNode) {
            console.error("XML parsing error:", errorNode.textContent);
            return `<div class="p-6 bg-red-50 border border-red-200 rounded-lg">
                        <h3 class="font-bold text-red-800">Error Parsing Report Data</h3>
                        <p class="text-sm text-red-700 mt-2">The AI engine produced an invalid report structure. This is a temporary issue. Please try generating the report again.</p>
                        <pre class="mt-4 text-xs text-red-900 bg-red-100 p-3 rounded-md whitespace-pre-wrap overflow-x-auto">${nidlText.replace(/</g, '&lt;')}</pre>
                    </div>`;
        }

        const header = xmlDoc.querySelector("header");
        const title = header?.querySelector("report_title")?.getAttribute("title") || "Report";
        const preparedFor = header?.querySelector("prepared_for");
        const userName = preparedFor?.getAttribute("name");
        const userDept = preparedFor?.getAttribute("department");
        const nexusLogoSVG = `<svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 3H6.5V21H10.5V13.5L17.5 21H21.5V3H17.5V10.5L10.5 3Z"></path></svg>`;

        let html = `<div class="report-document bg-white p-8 sm:p-12 mx-auto my-0 max-w-5xl shadow-lg rounded-lg prose max-w-none">
            <header class="not-prose report-page-header mb-12">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-sm text-gray-500">Prepared for:</p>
                        <p class="font-semibold text-gray-700">${userName}</p>
                        <p class="text-sm text-gray-700">${userDept}</p>
                    </div>
                    <div class="flex items-center gap-3" style="color: #0077b6;">
                        ${nexusLogoSVG}
                        <div style="line-height: 1.1; margin-top: -2px;">
                            <span style="font-size: 1.8rem; font-weight: 700; color: #1a202c; letter-spacing: -0.05em; text-transform: uppercase;">NEXUS</span>
                            <span style="display: block; font-size: 0.7rem; font-weight: 600; color: #4a5568; letter-spacing: 0.25em; text-transform: uppercase;">BWGA</span>
                        </div>
                    </div>
                </div>
                <h1 class="text-4xl font-extrabold text-gray-900 mt-8 text-center tracking-tight">${title}</h1>
            </header>
            <main>`;

        const scoreCard = xmlDoc.querySelector("score_card");
        if (scoreCard) {
            const score = scoreCard.querySelector("overall_score")?.getAttribute("value");
            const tier = scoreCard.querySelector("investment_tier")?.getAttribute("value");
            const rationale = scoreCard.querySelector("rationale")?.textContent;
            html += `<section class="not-prose mb-12">
                <h2 class="report-section-title">Overall Score & Investment Tier</h2>
                <div class="grid md:grid-cols-3 gap-6 items-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div class="text-center">
                        <p class="text-8xl font-bold text-nexus-blue">${score || 'N/A'}</p>
                        <p class="text-sm text-gray-600 font-semibold mt-1">Overall Score</p>
                    </div>
                    <div class="md:col-span-2">
                        <h3 class="text-2xl font-bold text-gray-800">${tier || 'N/A'}</h3>
                        <p class="mt-2 text-base leading-relaxed text-gray-700">${rationale || ''}</p>
                    </div>
                </div>
            </section>`;
        }

        const summary = xmlDoc.querySelector("executive_summary");
        if (summary) {
            html += `<section class="mb-12">
                <h2 class="report-section-title">Executive Summary</h2>
                <p>${summary.textContent}</p>
            </section>`;
        }

        const tables = xmlDoc.querySelectorAll("data_table");
        tables.forEach(table => {
            const tableTitle = table.getAttribute("title");
            const headerColor = table.getAttribute("header_color");
            const headerClass = { teal: 'header-teal', sky: 'header-sky', rose: 'header-rose' }[headerColor] || '';

            const rows = table.querySelectorAll("row");
            let tableHtml = `<section class="mb-12">
                <h2 class="report-section-title">${tableTitle}</h2>
                <div class="not-prose overflow-x-auto">
                    <table class="report-table">
                        <thead><tr>`;
            rows[0].querySelectorAll("cell").forEach(cell => {
                tableHtml += `<th class="${headerClass}">${cell.textContent}</th>`;
            });
            tableHtml += `</tr></thead><tbody>`;
            
            for (let i = 1; i < rows.length; i++) {
                tableHtml += '<tr>';
                rows[i].querySelectorAll("cell").forEach(cell => {
                    const cellContent = cell.textContent || '';
                    tableHtml += `<td>${cellContent.replace(/\n/g, '<br/>')}</td>`;
                });
                tableHtml += '</tr>';
            }

            tableHtml += `</tbody></table></div></section>`;
            html += tableHtml;
        });

        const recommendations = xmlDoc.querySelector("strategic_recommendations");
        if (recommendations) {
            const recText = recommendations.textContent || "";
            // Split by number followed by a dot and space, but keep the delimiter
            const recPoints = recText.split(/\s*(?=\d+\.\s)/).filter(p => p.trim());
            html += `<section class="mb-12">
                <h2 class="report-section-title">Strategic Recommendations</h2>
                <ol class="space-y-3">`;
            recPoints.forEach(point => {
                html += `<li>${point.replace(/^\d+\.\s/, '')}</li>`;
            });
            html += `</ol></section>`;
        }
        
        const sources = xmlDoc.querySelector("source_attribution");
        if(sources) {
            const sourceList = (sources.textContent || "").split('|').map(s => s.trim()).filter(Boolean);
            html += `<section class="mt-16 pt-8 border-t">
                <h3 class="text-lg font-semibold text-gray-700 mb-3">Data Sources</h3>
                <div class="not-prose text-xs text-gray-500 space-y-1 columns-1 md:columns-2 lg:columns-3 break-inside-avoid">`;
            sourceList.forEach(source => {
                let sourceHtml = source;
                if (source.startsWith('http')) {
                    try {
                        const url = new URL(source);
                        sourceHtml = `<a href="${url.href}" target="_blank" rel="noopener noreferrer" class="hover:text-nexus-blue">${url.hostname}</a>`;
                    } catch (e) { /* ignore invalid urls */ }
                }
                html += `<p class="truncate" title="${source}">${sourceHtml}</p>`;
            });
            html += `</div></section>`;
        }

        html += `</main></div>`;
        return html;
    } catch (e) {
        console.error("Error parsing NIDL:", e);
        return `<div class="p-6 bg-red-50 border border-red-200 rounded-lg"><h3 class="font-bold text-red-800">Error Rendering Report</h3><p class="text-sm text-red-700 mt-2">An unexpected error occurred while displaying the report.</p><pre class="mt-4 text-xs text-red-900 bg-red-100 p-3 rounded-md whitespace-pre-wrap overflow-x-auto">${nidlText.replace(/</g, '&lt;')}</pre></div>`;
    }
}