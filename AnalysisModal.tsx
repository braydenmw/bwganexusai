/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import type { AnalysisModalState } from '../types';
import { nadlToHtml } from '../utils';
import { Spinner, NexusLogo, CloseIcon } from './Icons';

interface AnalysisModalProps {
    state: AnalysisModalState;
    onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ state, onClose }) => {
    const { isOpen, item, reportText, isLoading, error } = state;
    if (!isOpen || !item) return null;

    let content;
    if (isLoading && !reportText) {
        content = <div className="flex items-center justify-center h-full min-h-[500px]">
            <Spinner dark />
            <p className="ml-4 text-gray-600">{`Generating Deep-Dive Analysis for ${item.project_name}...`}</p>
        </div>;
    } else if (error) {
        content = <div className="p-8 text-center text-red-600">
            <h3 className="font-bold text-lg">Analysis Failed</h3>
            <p>{error}</p>
        </div>;
    } else {
        content = <div id="analysis-report-content" className="report-document p-8 sm:p-12 mx-auto my-6 max-w-7xl text-gray-800 bg-white"
            dangerouslySetInnerHTML={{ __html: nadlToHtml(reportText) }}
        />;
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <header className="p-4 flex justify-between items-center border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <NexusLogo className="w-8 h-8 text-nexus-blue" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Nexus Intelligence Deep-Dive</h2>
                            <p className="text-sm text-gray-500 truncate max-w-md">{`Topic: ${item.project_name}`}</p>
                        </div>
                    </div>
                    <button className="p-1 text-gray-500 hover:text-gray-800" onClick={onClose}><CloseIcon /></button>
                </header>
                <main className="flex-grow bg-gray-100 overflow-y-auto">
                    {content}
                </main>
                <footer className="p-4 flex justify-end items-center bg-gray-50 border-t border-gray-200 flex-shrink-0">
                    <button className="nexus-btn-primary bg-amber-500 hover:bg-amber-600" disabled={isLoading || !!error}>
                        Download PDF
                    </button>
                </footer>
            </div>
        </div>
    );
};