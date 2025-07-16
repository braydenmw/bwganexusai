/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// New, more sophisticated "Mid-century Modern Blueprint" style illustrations

export const IntelStandardGraphic: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm text-gray-800' }) => (
    <svg className={className} viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <path id="jumbled-line" d="M0 50 C 10 30, 20 70, 30 50 S 50 60, 60 50" stroke="#a0aec0" strokeWidth="1.5" strokeDasharray="2 2" />
        </defs>
        <g id="chaotic-input">
            <use href="#jumbled-line" />
            <use href="#jumbled-line" transform="translate(0, 5) scale(1, -1)" />
            <use href="#jumbled-line" transform="translate(5, -5)" />
            <circle cx="10" cy="32" r="2" fill="#a0aec0" />
            <circle cx="25" cy="68" r="3" fill="#a0aec0" />
            <circle cx="50" cy="38" r="2.5" fill="#a0aec0" />
        </g>
        <g id="nexus-prism-engine">
            <path d="M65 50 L 85 30 L 85 70 Z" fill="#0077b6" fillOpacity="0.8" />
            <path d="M65 50 L 85 30 L 85 70 Z" stroke="#c09a3e" strokeWidth="1.5" />
        </g>
        <g id="clear-output">
            <line x1="85" y1="50" x2="135" y2="50" stroke="#0077b6" strokeWidth="4" />
            <path d="M135 50 L 128 46 V 54 Z" fill="#0077b6" />
            <circle cx="110" cy="50" r="3" fill="#fff" stroke="#0077b6" strokeWidth="1.5" />
        </g>
    </svg>
);


export const BridgeGraphic: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md text-gray-800' }) => (
    <svg className={className} viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="regional-community">
            <rect x="10" y="60" width="20" height="30" fill="#c09a3e" />
            <path d="M10 60 L 20 50 L 30 60" fill="#c09a3e" stroke="#f8f7f5" strokeWidth="1.5" />
            <circle cx="45" cy="70" r="8" stroke="#4a5568" strokeWidth="2" fill="none"/>
            <path d="M45 62 V 78 M 37 70 H 53 M 40 65 L 50 75 M 40 75 L 50 65" stroke="#4a5568" strokeWidth="1.2" />
        </g>
        <g id="global-capital">
            <rect x="110" y="40" width="10" height="50" fill="#2d3748" />
            <rect x="120" y="55" width="10" height="35" fill="#4a5568" />
            <rect x="100" y="65" width="10" height="25" fill="#a0aec0" />
        </g>
        <g id="nexus-bridge">
            <path d="M55 85 C 75 45, 95 45, 110 65" stroke="#0077b6" strokeWidth="4" fill="none" />
            <line x1="68" y1="63" x2="68" y2="80" stroke="#0077b6" strokeWidth="2" />
            <line x1="85" y1="53" x2="85" y2="70" stroke="#0077b6" strokeWidth="2" />
            <line x1="100" y1="59" x2="100" y2="75" stroke="#0077b6" strokeWidth="2" />
        </g>
    </svg>
);


export const RetroBlueprintGraphic: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg text-gray-800' }) => (
    <svg className={className} viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="140" height="100" fill="rgba(0,119,182,0.05)" />
        <path d="M0 0 H 140 M0 20 H 140 M0 40 H 140 M0 60 H 140 M0 80 H 140 M0 100 H 140" stroke="rgba(0,119,182,0.1)" strokeWidth="1" />
        <path d="M0 0 V 100 M20 0 V 100 M40 0 V 100 M60 0 V 100 M80 0 V 100 M100 0 V 100 M120 0 V 100 M140 0 V 100" stroke="rgba(0,119,182,0.1)" strokeWidth="1" />
        
        <g id="data-inputs">
            <rect x="10" y="10" width="20" height="15" stroke="#c09a3e" strokeWidth="2" fill="#fff" />
            <text x="13" y="22" fontFamily="monospace" fontSize="6" fill="#c09a3e">DATA</text>
            <rect x="10" y="75" width="20" height="15" stroke="#4a5568" strokeWidth="2" fill="#fff" />
            <text x="12" y="87" fontFamily="monospace" fontSize="6" fill="#4a5568">RISK</text>
        </g>
        <g id="connection-lines">
            <path d="M30 17.5 C 45 17.5, 45 50, 60 50" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
            <path d="M30 82.5 C 45 82.5, 45 50, 60 50" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
        </g>
        <g id="nexus-engine-box">
            <rect x="60" y="35" width="30" height="30" fill="#fff" stroke="#0077b6" strokeWidth="2" />
            <text x="65" y="55" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#0077b6">NEXUS</text>
        </g>
        <g id="outputs">
            <path d="M90 50 L 110 50" stroke="#0077b6" strokeWidth="2" />
            <rect x="110" y="42.5" width="20" height="15" fill="#f0f9ff" stroke="#0077b6" strokeWidth="1.5"/>
            <text x="112" y="54.5" fontFamily="monospace" fontSize="6" fill="#0077b6">REPORT</text>
        </g>
    </svg>
);


export const RetroReportGraphic: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xs text-gray-800' }) => (
    <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(5, 5)">
            <rect x="10" y="10" width="100" height="80" rx="3" fill="#e2e8f0" opacity="0.5" />
        </g>
        <g>
            <rect x="10" y="10" width="100" height="80" rx="3" fill="#fff" stroke="#cbd5e0" strokeWidth="1"/>
            <path d="M10 30 H 110" stroke="#e2e8f0" strokeWidth="1" />
            <rect x="20" y="18" width="40" height="6" rx="1" fill="#2d3748" />
            <rect x="85" y="18" width="15" height="6" rx="1" fill="#0077b6" />
            
            <rect x="20" y="40" width="35" height="40" fill="#f0f9ff" />
            <path d="M25,50 h25 M25,60 h25 M25,70 h25" stroke="#91d5ff" strokeWidth="2" />

            <path d="M65 55 L 95 55 L 80 40 L 65 55 Z" fill="#c09a3e" />
            <path d="M65 80 L 95 80 L 95 60 Z" fill="#4a5568" />

            <circle cx="85" cy="70" r="12" fill="#fff" stroke="#2d3748" strokeWidth="1.5" />
            <path d="M85 62 v16" stroke="#2d3748" strokeWidth="1.5" />
        </g>
    </svg>
);