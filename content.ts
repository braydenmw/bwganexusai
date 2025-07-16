

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReportTemplate } from './types';

// --- TIER DEFINITIONS ---

export const BUSINESS_TIERS = [
  {
    tier: 'Tier 1',
    name: 'Opportunity Snapshot',
    price: '$175',
    description: 'Quickly screen a region or market for initial viability and core metrics.',
    features: [
      '**Executive Brief (2-3 Pages):** AI-generated summary tailored to your strategic objective.',
      '**Core Viability Metrics:** Includes a top-level risk score and key economic indicators.',
      '**Key Infrastructure Overview:** Snapshot of major ports, airports, and energy infrastructure.',
      '**Automated "Smart Letter":** A context-aware introductory letter to the local investment agency.'
    ]
  },
  {
    tier: 'Tier 2',
    name: 'Market Entry Blueprint',
    price: '$450',
    description: 'Get a detailed, actionable plan for entering a new regional market.',
    features: [
      '**Comprehensive Report (10-15 Pages):** In-depth analysis covering all aspects of market entry.',
      '**SWOT Analysis:** Data-grounded strengths, weaknesses, opportunities, and threats.',
      '**Competitive Landscape:** Identifies and analyzes key competitors in the target region.',
      '**Logistics Deep-Dive:** Detailed analysis of port capacity, customs, and transport networks.',
      'Includes all features from **Opportunity Snapshot**.'
    ]
  },
  {
    tier: 'Tier 3',
    name: 'Strategic Diversification Roadmap',
    price: '$850',
    description: 'For de-risking supply chains or diversifying manufacturing footprints.',
    features: [
      '**Multi-Region Report (20+ Pages):** Compare up to **2 regions** side-by-side.',
      '**Weighted Scoring Matrix:** Custom decision matrix scoring each region against your KPIs.',
      '**Supply Chain Resilience Analysis:** Stress-testing for geopolitical, climate, and logistical risks.',
      '**Local Talent & Resource Mapping:** Analysis of workforce skills and local supplier availability.',
      'Includes all features from **Market Entry Blueprint**.'
    ]
  },
  {
    tier: 'Tier 4',
    name: 'Enterprise Foresight Engine',
    price: '$1500+',
    description: 'The highest level of strategic intelligence for mission-critical decisions.',
    features: [
      '**Dynamic Multi-Scenario Modeling:** Interactive "what-if" analysis for various market shocks.',
      '**Predictive Opportunity Radar:** AI identifies "over-the-horizon" opportunities and threats.',
      '**Full ESG & Compliance Deep-Dive:** Comprehensive sustainability and regulatory risk assessment.',
      '**Direct Human Analyst Overlay:** A final review and contextualization by a BWGA expert.',
      'Includes all features from **Strategic Diversification Roadmap**.'
    ]
  },
];

export const GOVERNMENT_TIERS = [
    {
      tier: 'Tier 1',
      name: 'Partner Prospectus',
      price: '$175',
      description: 'Identify and qualify potential foreign investors for your region.',
      features: [
        '**Targeted Partner ID:** AI-driven search for up to **5 foreign companies** aligned with your region.',
        '**Partner Profile Briefs (1-2 Pages Each):** Summary of each target\'s goals and tech focus.',
        '**Synergy & Alignment Analysis:** Clear articulation of your value proposition to each company.',
        '**AI-Generated "Smart Letters":** Individually tailored outreach letters for each target company.'
      ]
    },
    {
      tier: 'Tier 2',
      name: 'Investment Attraction Strategy',
      price: '$450',
      description: 'Develop a data-driven narrative to attract a specific type of investment.',
      features: [
        '**Regional Value Prop Report (10-15 Pages):** A comprehensive document articulating your region\'s unique strengths.',
        '**Competitive Benchmarking:** Data-driven comparison of your region against **2 competitor locations**.',
        '**"Outside-In" Perception Analysis:** AI summary of global news and industry forums about your region.',
        '**Actionable Recommendations:** A prioritized list of steps to enhance your investment profile.'
      ]
    },
    {
      tier: 'Tier 3',
      name: 'G2G Strategic Alignment Blueprint',
      price: '$850',
      description: 'Analyze strategic alignment with another nation to foster bilateral trade and investment.',
      features: [
        '**Bilateral Econ. Analysis (20+ Pages):** A G2G-level document on joint development opportunities.',
        '**Complementary Industry Analysis:** Uses **LQ and Cluster Analysis** to find high-potential trade sectors.',
        '**Shared Supply Chain Opportunities:** Identifies global supply chain gaps that can be filled by bilateral cooperation.',
        '**Joint Project & Policy Proposals:** Data-backed initiatives for joint R&D, SEZs, or infrastructure.'
      ]
    },
    {
      tier: 'Tier 4',
      name: 'National Ecosystem Architect',
      price: '$1500+',
      description: 'For transformative economic development and attracting cornerstone investments.',
      features: [
        '**Policy Impact Simulator:** Forecasts the economic effects of proposed incentives or regulations.',
        '**Public-Private Partnership (PPP) Builder:** AI generates optimal PPP structures and identifies ideal private partners.',
        '**Full Sector Ecosystem Development Plan:** A roadmap for building a competitive industry from the ground up.',
        '**Global Capital Flow Analysis:** Identifies and targets major sources of FDI aligned with national goals.',
        'Includes all features from **G2G Strategic Alignment Blueprint**.'
      ]
    },
  ];

// --- ANALYTICAL MODULE DEFINITIONS ---

export const REPORT_OPTIONS = [
    // Core Analysis
    { id: 'economic_impact', title: 'Economic Impact Modeling', description: 'Projects the potential impact of an investment on local GDP, employment, and tax revenue.', cost: '+$3', category: 'Core Analysis', availableTo: 'all' },
    { id: 'competitor_analysis', title: 'Competitive Landscape', description: 'Identifies and analyzes key competitors already operating in the target region or sector.', cost: '+$3', category: 'Core Analysis', availableTo: 'all' },
    { id: 'workforce_analysis', title: 'Workforce & Skills Gap Analysis', description: 'Analyzes the local labor market, including availability of skills, wage levels, and education infrastructure.', cost: '+$3', category: 'Core Analysis', availableTo: 'all' },
    { id: 'supply_chain', title: 'Supply Chain & Logistics', description: 'Deep-dive into logistical infrastructure, including ports, transport networks, and customs efficiency.', cost: '+$3', category: 'Core Analysis', availableTo: 'all' },

    // Strategic Planning
    { id: 'market_entry_playbook', title: 'Market Entry Playbook', description: 'Generates a step-by-step strategic plan for entering the target market.', cost: '+$3', category: 'Strategic Planning', availableTo: 'business' },
    { id: 'ppp_builder', title: 'Public-Private Partnership Models', description: 'Suggests optimal PPP structures and identifies potential private sector partners.', cost: '+$3', category: 'Strategic Planning', availableTo: 'government' },
    { id: 'deal_structuring', title: 'Potential Deal Structuring', description: 'Provides conceptual models for how an investment could be structured.', cost: '+$3', category: 'Strategic Planning', availableTo: 'all' },
    { id: 'scenario_exploration', title: 'Scenario Exploration', description: 'Basic "what-if" analysis for potential market shifts or policy changes.', cost: '+$3', category: 'Strategic Planning', availableTo: 'all' },

    // Risk & Governance
    { id: 'risk_assessment', title: 'Comprehensive Risk Assessment', description: 'Analysis of geopolitical, regulatory, climate, and operational risks.', cost: '+$3', category: 'Risk & Governance', availableTo: 'all' },
    { id: 'esg_sustainability', title: 'ESG & Sustainability Benchmark', description: 'Scores the region/sector on key Environmental, Social, and Governance metrics against global standards.', cost: '+$3', category: 'Risk & Governance', availableTo: 'all' },
    { id: 'compliance_risk_shield', title: 'Compliance & Regulatory Shield', description: 'Automated check for key regulatory, tax, and legal compliance hurdles.', cost: '+$3', category: 'Risk & Governance', availableTo: 'government' },
    { id: 'supply_chain_resilience', title: 'Supply Chain Resilience Test', description: 'Maps and stress-tests your supply chain for vulnerabilities and suggests alternatives.', cost: '+$3', category: 'Risk & Governance', availableTo: 'business' },
    
    // Opportunity & Growth
    { id: 'opportunity_radar', title: 'AI-Driven Opportunity Radar', description: 'AI suggests adjacent or untapped opportunities based on your profile and regional trends.', cost: '+$3', category: 'Opportunity & Growth', availableTo: 'all' },
    { id: 'funding_finder', title: 'Grant & Funding Finder', description: 'AI matches your project with relevant government grants, incentives, or private funds.', cost: '+$3', category: 'Opportunity & Growth', availableTo: 'all' },
    { id: 'local_talent_finder', title: 'Local Talent & Resource Finder', description: 'AI identifies specific local talent pools, university programs, and key suppliers.', cost: '+$3', category: 'Opportunity & Growth', availableTo: 'all' },
    { id: 'investment_readiness_score', title: 'Investment Readiness Score', description: 'AI rates your business\'s readiness for FDI or major expansion, providing recommendations.', cost: '+$3', category: 'Opportunity & Growth', availableTo: 'business' },
    { id: 'policy_impact_simulator', title: 'Policy Impact Simulator', description: 'Forecasts the potential effects of a new policy or incentive on the target sector.', cost: '+$3', category: 'Opportunity & Growth', availableTo: 'government' },
];


export const masterBlueprintReport = `
# BWGA Nexus: System Blueprint & Strategic Roadmap
## Document Version: 2.0
## Status: Live Architecture

---
### **The BWGA Mission Statement**

My name is Brayden Walls, Founder and Creator of BWGA. This platform wasn't developed to compete; it was created to contribute. The idea was born from my experience living in a regional city with my family, and seeing firsthand the tireless efforts of local leaders to create a better community—a place many take for granted, but which is the product of immense dedication and strategic vision.

>! When I spent time on the ground in Mindanao, Philippines, I saw this same dynamic on a global scale. This is the world's greatest unprotected asset: **regional potential.**

I witnessed a profound disconnect. Local governments were working strategically to build a future, yet their stories and quantifiable progress were often invisible to global markets. Investment decisions were being shaped by outdated perceptions and a lack of reliable, accessible information. This isn't a problem unique to one place; it is a systemic failure seen across the globe.

This platform started as a simple idea. It wasn't until I began developing the dashboard and immersing myself in countless university studies, economic reports, and government papers that the true scale of the problem—and the potential for a solution—became clear. But theory alone is not enough. The real breakthrough came from sitting with leaders like Mayor S. Co. in Mindanao, who provided the ground-level insight that validated years of research. This platform is the system I wish had existed then. It is for the development agency, the company deterred by uncertainty, and for the regional communities themselves.

For their generosity and perspective, I am deeply grateful to the Mayor, the Philippine government, and its people.

Our goal is to be a trusted and cost-effective first step in global opportunity discovery, but to simply give those the confidence to be heard and be seen. We provide the initial layer of data-driven, AI-enhanced intelligence that gives organizations the confidence to take the next step—to engage, to invest, and to build sustainable partnerships.

**We exist to make the overlooked, visible.**

---
### **Compliance, Ethics & Terms of Service v4.1**

This document outlines the terms of service, our guiding principles for the ethical development and deployment of Artificial Intelligence, and the responsible management of data within the BWGA Nexus ecosystem. By using our services, you agree to these terms.

**1. Important Notice: Advisory Services, Information & Developmental Status**

-   **Provider & Developmental Status:** BW Global Advisory, operating under Brayden Walls (Sole Trader, ABN 55 978 113 300), is an Australian-registered initiative providing specialized strategic advisory services. The intelligence, analyses, and potential opportunities discussed or presented are generated through our unique AI-Human intelligence methodology. This methodology utilizes publicly available data, information shared with consent, and our proprietary "BWGA Nexus" AI system. Please be aware that significant components of the BWGA Nexus initiative, including the AI models and the future Live AI Dashboard, remain in an active **research and development (R&D) and pre-commercial phase.**
-   **Intellectual Property:** All unique methodologies, AI-assisted analytical frameworks, report structures, and the "BWGA Nexus" concept (both current and future iterations) constitute the proprietary intellectual property of BW Global Advisory / Brayden Walls, protected under law during its development. The name of the service is subject to change. Any engagement for services will be formalized through a separate agreement detailing scope, deliverables, and IP considerations.
-   **Use of Information & Disclaimers:**
    -   **For Decision-Support Only:** Our reports and advisory outputs are intended to provide advanced decision-support, enhance due diligence, and clarify strategic options. They are illustrative and should **complement, not replace,** comprehensive assessments, feasibility studies, and final policy or investment decisions.
    -   **AI Can Be Wrong:** You must acknowledge that the AI system, like any AI, can and does make mistakes, produce inaccurate information, or have "hallucinations."
    -   **User Responsibility is Mandatory:** It is your sole responsibility to **verify all facts, data, and analysis** from any generated content. You must seek independent professional advice before acting on any information. Your input matters; ensure the data you provide to the system is accurate and complete.
    -   **Limitation of Liability:** BWGA takes all reasonable care to provide a professional service, but we take **no responsibility** for any actions you take based on the AI-generated content. The service is provided "as is," without any warranties as to its accuracy or completeness.

**2. Our Commitment to Responsible AI & Ethical Data Stewardship**

At BW Global Advisory (BWGA), we believe that Artificial Intelligence holds immense potential to unlock regional economic opportunities and foster inclusive, sustainable development globally. However, we recognize that this power must be wielded with profound responsibility. Our developing BWGA Nexus™ AI platform is being built upon a foundation of strong ethical principles and robust data governance practices. We are committed to ensuring our technology serves humanity, respects individual rights, and promotes equitable outcomes. This framework is a living document and will evolve as AI technologies and global best practices advance.

**3. Core Ethical Principles for AI Development & Application**

-   **Human-Centricity & Beneficial Purpose:** The primary objective of BWGA's AI is to augment human intelligence and support decisions that lead to positive socio-economic outcomes, particularly for underserved regional communities, in alignment with the UN Sustainable Development Goals (SDGs).
-   **Fairness & Non-Discrimination (Bias Mitigation):** We are committed to proactively identifying and mitigating biases throughout the AI lifecycle – from data collection and model training to deployment and monitoring.
-   **Transparency & Explainability (Appropriate to Context):** We are committed to transparency regarding Data Sourcing, Methodological Approach, and the Limitations of AI. AI outputs are tools for decision support and require human judgment and due diligence.
-   **Accountability & Human Oversight (Human-in-the-Loop):** Critical strategic recommendations are always subject to review, validation, and contextualization by qualified human experts. Ultimate accountability rests with BWGA leadership.
-   **Security & Safety:** We are committed to developing AI systems that are robust, secure, and operate safely, and we implement strong data security measures to protect the integrity and confidentiality of data.

**4. Data Governance & Privacy Principles**

-   **Lawfulness, Fairness, and Transparency:** BWGA will process data in compliance with applicable data protection laws and regulations in the jurisdictions where we operate. **All efforts are made to meet and exceed local and international standards for data governance.**
-   **Data Minimization & Purpose Limitation:** We strive to collect and process only the data necessary for specific, legitimate purposes, primarily leveraging publicly available data.
-   **Data Accuracy:** We endeavor to use accurate and up-to-date data sources and include processes for data cleansing and validation.
-   **Confidentiality & Security:** Confidential information shared with BWGA by clients will be protected through appropriate technical and organizational security measures and governed by strict Non-Disclosure Agreements (NDAs).
-   **Consent (Where Applicable):** Should any personal data be involved, its processing will be subject to explicit consent and clear information regarding its use.
-   **Data Ethics in Sourcing:** When utilizing third-party data providers, we will make reasonable efforts to ascertain their own ethical sourcing and data privacy compliance.

**5. Application to Specific BWGA Offerings**

-   **AI-Human Intelligence Reports:** Reports will clearly state the general nature of data sources used and acknowledge the R&D status of AI-driven insights.
-   **BWGA Nexus Live AI Dashboard (Future):** The dashboard will be designed with privacy-enhancing technologies, role-based access controls, and clear user notifications.

**6. Continuous Improvement & Stakeholder Engagement**

This Ethical AI & Data Governance Framework is not static. BWGA is committed to regularly reviewing and updating this framework and engaging in dialogue with experts to ensure our approach remains responsible and beneficial.

**7. Our Pledge**

BW Global Advisory is dedicated to harnessing the power of AI responsibly to create a more equitable and prosperous world by illuminating the potential of its regions. We believe that ethical considerations are not a constraint on innovation, but rather a vital enabler of trustworthy and sustainable technological advancement that truly serves humanity.


`;


export const REPORT_TEMPLATES: { [key in 'market_analysis' | 'partner_matchmaking']: ReportTemplate[] } = {
    market_analysis: [
        {
            id: 'standard_market_analysis',
            name: 'Standard Market Analysis',
            description: 'A comprehensive overview of the target market including key metrics, opportunities, and a light competitive scan.',
            defaultObjective: 'Provide a standard market analysis of the specified target region for the designated industry. Include key economic indicators, growth drivers, primary challenges, and a brief overview of the competitive landscape.',
            preselectedOptions: [],
        },
        {
            id: 'competitive_landscape',
            name: 'Competitive Landscape Deep-Dive',
            description: 'A focused report identifying and analyzing key competitors in the target region and sector.',
            defaultObjective: 'Conduct a deep-dive competitive landscape analysis for the specified industry in the target region. Identify the top 3-5 competitors, their market share, strategies, strengths, and weaknesses.',
            preselectedOptions: ['competitor_analysis'],
        },
        {
            id: 'supply_chain_risk',
            name: 'Supply Chain & Logistics Assessment',
            description: 'An in-depth analysis of supply chain vulnerabilities, logistical infrastructure, and potential bottlenecks.',
            defaultObjective: 'Perform a detailed supply chain and logistics assessment for moving goods related to the specified industry in and out of the target region. Analyze port capacity, transport networks, customs efficiency, and potential risks.',
            preselectedOptions: ['supply_chain', 'risk_assessment'],
        },
    ],
    partner_matchmaking: [
        {
            id: 'standard_prospectus',
            name: 'Standard Partner Prospectus',
            description: 'A general prospectus to attract a wide range of suitable foreign partners to your region.',
            defaultObjective: 'Create a compelling investment prospectus for the specified target region aimed at attracting foreign partners in the designated industry. Highlight our key strengths, infrastructure, and government incentives.',
            preselectedOptions: [],
        },
        {
            id: 'tech_focused_prospectus',
            name: 'Technology-Focused Prospectus',
            description: 'A prospectus specifically targeting companies with advanced technological capabilities to solve regional challenges.',
            defaultObjective: 'Generate a technology-focused investment prospectus for the specified target region. Identify our key challenges that can be solved by technology and create a narrative to attract high-tech foreign partners in the designated industry, focusing on the specified key technologies.',
            preselectedOptions: ['workforce_analysis'],
        },
        {
            id: 'g2g_partnership_blueprint',
            name: 'G2G Partnership Blueprint',
            description: 'A strategic document for government-to-government collaboration, identifying areas for joint development.',
            defaultObjective: 'Develop a strategic blueprint for Government-to-Government (G2G) partnership between our country and the target country, focusing on the specified industry. Identify complementary strengths, opportunities for joint ventures, and policy alignment.',
            preselectedOptions: ['economic_impact', 'deal_structuring'],
        }
    ],
};


// --- DATA FOR REPORT GENERATOR ---
export const COUNTRIES = [
    "Australia", "Brazil", "Canada", "France", "Germany", "India", "Indonesia", "Israel",
    "Japan", "Malaysia", "Mexico", "Philippines", "Singapore", "South Africa", "South Korea",
    "Sweden", "Thailand", "United Kingdom", "United States", "Vietnam"
];

export const PERSONAS = ["Government Agency", "Corporate & Financial Sector", "Multi-lateral & Development Org"] as const;

export const GOVERNMENT_DEPARTMENTS = [
    "Dept. of Trade & Industry", "Dept. of Economic Planning", "Dept. of Agriculture",
    "Ministry of Infrastructure", "National Development Authority", "Investment Promotion Agency"
] as const;

export const INDUSTRIES = [
    "AgriTech", "Aquaculture", "Biotechnology", "Finance", "Healthcare", "Infrastructure",
    "Logistics", "Manufacturing", "Mining", "Renewable Energy", "Semiconductors",
    "Supply Chain Management", "Technology", "Tourism"
] as const;

export const KEY_TECHNOLOGIES = [
    "AI & Machine Learning", "Blockchain", "Clean Technology", "Drones & UAVs", "IoT & Sensor Networks",
    "Precision Agriculture", "Robotics & Automation", "SaaS", "Water Treatment"
] as const;

export const COMPANY_SIZES = ["Startup (1-50)", "SME (51-500)", "Large Enterprise (501-5000)", "Multinational (>5000)"] as const;

export const TARGET_MARKETS = ["North America", "South America", "Europe", "Asia-Pacific", "Middle East & Africa"] as const;

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
    "Philippines": ["Cebu City", "Davao City", "Clark Freeport Zone", "Subic Bay", "General Santos", "Iloilo City", "Pagadian City"],
    "Vietnam": ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Can Tho"],
    "Thailand": ["Bangkok", "Laem Chabang", "Rayong", "Chiang Mai", "Phuket"],
    "Malaysia": ["Kuala Lumpur", "Johor Bahru", "Penang", "Iskandar Puteri", "Cyberjaya"],
    "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Medan", "Makassar"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Darwin"],
    // Add more countries and cities as needed
};