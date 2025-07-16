
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    defaultObjective: string;
    preselectedOptions: string[];
}

export interface DialogueQuestion {
    id: keyof ReportParameters;
    label: string;
    type: 'text' | 'select' | 'textarea';
    placeholder?: string;
    options?: readonly string[];
    required: boolean;
}

export interface ReportParameters {
    // Step 1: Mode Selection
    analysisMode: 'partner_matchmaking' | 'market_analysis' | '';

    // Step 2: Template Selection
    reportTemplateId?: string;

    // Step 3: Profile Information
    userName: string;
    organization: string; // User's Department/Agency/Organization
    country: string; // User's Country

    // Step 4: Persona Selection
    persona: 'Government Agency' | 'Corporate & Financial Sector' | 'Multi-lateral & Development Org' | '';

    // Step 5: Scope Definition
    targetCountry: string;
    regionalCity: string;
    industry: string;

    // Step 6: (Conditional) Partner Profile for matchmaking
    companySize?: string[];
    keyTechnologies?: string[];
    targetMarket?: string[];

    // Step 7: Depth & Intent
    selectedTier: { name: string; description: string; price: string; features: string[] };
    objective: string; // The free-text strategic intent
    selectedOptions?: string[];

    // Internal state management
    isGenerating?: boolean;
    snapshotData?: SnapshotData | null;
    generatedReportXml?: string;
    error?: string;
    userRole?: 'government' | 'business' | ''; // Kept for legacy compatibility if needed
}

export interface SnapshotData {
    summary: string;
    metrics: [string, string][];
    // Add other fields from the AI result as needed
    [key: string]: any;
}


export interface SymbiosisContext {
    topic: string;
    originalContent: string;
    reportParameters?: ReportParameters;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

export interface LetterRequest {
    userRole: 'government' | 'business' | '';
    userName: string;
    organization: string;
    country: string;
    reportContent: string;
}

export interface LiveOpportunityItem {
    id: string;
    timestamp: string;
    type: 'opportunity' | 'news' | 'indicator' | 'move';

    // Fields are denormalized for convenience
    isUserAdded?: boolean;
    
    // For 'opportunity'
    project_name?: string;
    country?: string;
    sector?: string;
    value?: string;
    summary?: string;
    source_url?: string;
    ai_feasibility_score?: number;
    ai_risk_assessment?: string;

    // For 'news'
    headline?: string;
    source?: string;
    link?: string;
    region?: string;

    // For 'indicator'
    indicatorName?: string;
    indicatorValue?: string;
    indicatorChange?: number;

    // For 'move'
    company_name?: string;
    investment?: string;
    destination_city?: string;
    destination_country?: string;
}


export interface GroundingChunk {
    web?: {
        uri: string;
        title: string;
    };
}

export interface InquireResult {
    answer: string;
    sources: GroundingChunk[];
}

export interface AnalysisModalState {
    isOpen: boolean;
    item: LiveOpportunityItem | null;
    reportText: string;
    isLoading: boolean;
    error: string | null;
}

// New interfaces for the redesigned dashboard
export interface NewsArticle {
    id: string;
    headline: string;
    source: string;
    summary: string;
    analystNote: string;
    link: string;
}

export interface GovProgram {
    id: string;
    name: string;
    region: string;
    objective: string;
    status: string;
}

export interface DashboardData {
    persona: 'gov' | 'biz';
    dailyBriefing: string;
    newsFeed: NewsArticle[];
    govPrograms: GovProgram[];
    keyMetrics: {
        gdp: { years: string[], values: number[] };
        employment: { years: string[], values: number[] };
    };
    industryTrends: {
        industries: string[];
        growth: number[];
    };
    regionalScores: {
        regions: string[];
        scores: number[];
    };
}
