/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { markdownToHtml } from '../utils';

interface ComplianceProps {
    content: string;
}

const Compliance: React.FC<ComplianceProps> = ({ content }) => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Compliance</h1>
                <p>Terms of Service & Ethical Use Policy</p>
            </div>
            <div className="card">
                 <div 
                    className="card-content prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} 
                />
            </div>
        </div>
    );
};

export default Compliance;
