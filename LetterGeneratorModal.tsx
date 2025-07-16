
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import type { LetterRequest } from '../types';
import { CloseIcon, Spinner } from './Icons';


interface LetterGeneratorModalProps {
    onClose: () => void;
    letterRequest: LetterRequest;
}

export const LetterGeneratorModal: React.FC<LetterGeneratorModalProps> = ({ onClose, letterRequest }) => {
    const [letterContent, setLetterContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        if (!letterRequest.reportContent) {
            setError("Cannot generate a letter without a report. Please generate a report first.");
            setIsLoading(false);
            return;
        }

        const generateLetter = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await fetch('/api/generate-letter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(letterRequest)
                });

                if (!response.ok) {
                    throw new Error(`Failed to generate letter: ${response.statusText}`);
                }

                const content = await response.text();
                setLetterContent(content);

            } catch (err) {
                console.error("Failed to generate letter:", err);
                setError("Sorry, the AI failed to generate the letter. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        generateLetter();

    }, [letterRequest]);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(letterContent).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, (err) => {
            console.error('Could not copy text: ', err);
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                    <Spinner dark />
                    <p className="mt-4 text-gray-600">Drafting personalized outreach letter...</p>
                </div>
            );
        }
        if (error) {
            return <div className="p-8 text-center text-red-600">{error}</div>;
        }
        return (
            <div className="p-6 bg-white border border-gray-200 rounded-md whitespace-pre-wrap font-mono text-sm text-gray-800">
                {letterContent}
            </div>
        );
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content max-w-3xl" onClick={e => e.stopPropagation()}>
                <header className="p-4 flex justify-between items-center border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800">AI-Generated Outreach Letter</h2>
                    <button className="p-1 text-gray-500 hover:text-gray-800" onClick={onClose}><CloseIcon /></button>
                </header>
                <main className="p-6 bg-gray-100 flex-grow overflow-y-auto">
                    {renderContent()}
                </main>
                <footer className="p-4 bg-gray-50 border-t border-gray-200 flex-shrink-0 flex justify-end items-center gap-4">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCopyToClipboard}
                        disabled={isLoading || !!error || !letterContent}
                    >
                        {copySuccess || 'Copy to Clipboard'}
                    </button>
                </footer>
            </div>
        </div>
    );
};
