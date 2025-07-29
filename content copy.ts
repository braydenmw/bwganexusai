/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Tier, ReportTemplate, ReportOption, SubscriptionPlan } from './types';

export const COUNTRIES = ["United States", "Philippines", "Vietnam", "Thailand", "Israel", "Sweden", "Singapore", "Malaysia", "Indonesia", "Japan", "South Korea", "Germany", "United Kingdom", "France", "Canada", "Australia", "India", "Brazil", "Mexico", "South Africa", "Nigeria", "Egypt", "Kenya", "Argentina", "Chile", "Colombia", "Poland", "Turkey", "Saudi Arabia", "United Arab Emirates"];

export const PERSONAS = [
    { name: 'Government Agency', description: 'For national or regional bodies focused on economic development and investment attraction.' },
    { name: 'Corporate & Financial Sector', description: 'For businesses, investors, and funds evaluating market entry, M&A, and competitive landscapes.' },
    { name: 'Multi-lateral & Development Org', description: 'For organizations like the World Bank, ADB, or NGOs planning regional programs.' },
];

export const INDUSTRIES = ["AgriTech", "Aquaculture", "Manufacturing", "Technology", "Renewable Energy", "Infrastructure", "Healthcare", "Finance", "Tourism", "Logistics", "Biotechnology", "Mining", "Semiconductors", "Supply Chain Management", "Green Hydrogen", "EV Batteries", "Cold Chain Logistics", "Carbon Capture"];

export const CITIES_BY_COUNTRY: { [key: string]: string[] } = {
    "Vietnam": ["Ho Chi Minh City", "Hanoi", "Da Nang", "Can Tho", "Hai Phong"],
    "Philippines": ["Manila", "Cebu City", "Davao City", "Iloilo City", "Pagadian City", "Zamboanga City"],
    "Thailand": ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Khon Kaen"],
    "Malaysia": ["Kuala Lumpur", "George Town (Penang)", "Johor Bahru", "Malacca City", "Kota Kinabalu"],
    "Indonesia": ["Jakarta", "Surabaya", "Bandung", "Medan", "Bali (Denpasar)"],
    "United States": ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ"],
    "India": ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
    // Add other countries as needed
    "Default": []
};

export const GOVERNMENT_TIERS: Tier[] = [
    { tier: 'gov_recon', name: 'Reconnaissance Brief', category: 'Fast-Track Analysis', description: 'A high-level overview of a region or sector, ideal for initial assessments and identifying areas that warrant a deeper look.', included_features: ['Narrative Summary', 'Core Metrics', 'Regional Success Index'] },
    { tier: 'gov_deep_dive', name: 'Deep-Dive Analysis', category: 'Comprehensive Strategy', description: 'A full-spectrum analysis covering geopolitical, economic, and logistical factors. The foundational document for major strategic decisions.', included_features: ['All Reconnaissance Features', 'Risk & Governance Analysis', 'Geospatial Advantages', 'Partnership Opportunities'] },
    { tier: 'gov_policy_sim', name: 'Policy Simulator', category: 'Advanced Modeling', description: 'Model the potential impacts of a proposed policy or investment on the regional economy and specific sectors.', included_features: ['All Deep-Dive Features', 'Economic Impact Modeling (I-O)', 'Workforce & Skills Gap Analysis'] },
    { tier: 'gov_investment_prospectus', name: 'Investment Prospectus', category: 'Investor-Facing Document', description: 'A comprehensive, investor-ready prospectus designed to attract foreign direct investment.', included_features: ['All Deep-Dive Features', 'Key Success Drivers Analysis', 'Investment Optimization Modeling'], isContact: true },
];

export const BUSINESS_TIERS: Tier[] = [
    { tier: 'biz_market_scan', name: 'Market Scan', category: 'Rapid Assessment', description: 'A high-level scan of a market or competitor, perfect for initial opportunity screening and quick intel.', included_features: ['Narrative Summary', 'Core Metrics', 'Top 3 Competitors'] },
    { tier: 'biz_competitive_edge', name: 'Competitive Edge', category: 'In-Depth Analysis', description: 'A detailed analysis of the competitive landscape, supply chains, and market entry barriers. Your go-to for M&A and expansion.', included_features: ['All Market Scan Features', 'Supply Chain Analysis', 'Risk & Governance', 'Corporate Expansion Watchlist'] },
    { tier: 'biz_strategic_partner', name: 'Strategic Partner', category: 'Full Spectrum Intelligence', description: 'The complete intelligence suite for critical decisions, providing deep insights into all strategic levers.', included_features: ['All Competitive Edge Features', 'Partnership Opportunities', 'Key Success Drivers', 'Investment Optimization'] },
    { tier: 'biz_custom_op', name: 'Custom Operation', category: 'Bespoke Solution', description: 'A custom-scoped project tailored to your unique strategic questions, with direct analyst support.', included_features: ['Custom Scope', 'Direct Analyst Access', 'Bespoke Modeling'], isContact: true },
];

export const MULTILATERAL_TIERS: Tier[] = [
    { tier: 'multi_needs_assessment', name: 'Needs Assessment', category: 'Foundational Analysis', description: 'A baseline study to understand the needs of a target community or region, aligned with development goals.', included_features: ['Narrative Summary', 'Core Metrics', 'SDG Gap Analysis'] },
    { tier: 'multi_program_design', name: 'Program Design & Impact', category: 'Implementation Planning', description: 'A comprehensive plan for a development program, including impact forecasts and stakeholder mapping.', included_features: ['All Needs Assessment Features', 'Economic Impact Forecast', 'Risk & Governance', 'Local Wisdom Analysis'] },
    { tier: 'multi_resilience_blueprint', name: 'Resilience Blueprint', category: 'Long-Term Strategy', description: 'A full-spectrum analysis focused on building long-term economic, social, and environmental resilience.', included_features: ['All Program Design Features', 'Climate Resilience Analysis', 'Institutional Strengthening Plan', 'Partnership Opportunities'] },
    { tier: 'multi_field_support', name: 'Field Support Package', category: 'Bespoke Solution', description: 'Direct support for ongoing field operations, including real-time data analysis and strategic advisory.', included_features: ['Custom Scope', 'In-field Data Support', 'Dedicated Analyst'], isContact: true },
];


export const REPORT_OPTIONS: ReportOption[] = [
    // Governance & Risk
    { id: 'geopolitical', name: 'Geopolitical Risk Deep-Dive', group: 'Risk & Governance', description: 'Expanded analysis on political stability, international relations, and security threats.' },
    { id: 'esg_compliance', name: 'ESG & Regulatory Compliance Shield', group: 'Risk & Governance', description: 'A detailed review of Environmental, Social, and Governance standards and local regulations.' },
    // Corporate & Finance
    { id: 'ma_screening', name: 'M&A Target Screening', group: 'Corporate & Finance', description: 'Identify and perform a strategic first-pass evaluation of potential M&A targets.' },
    { id: 'supply_chain', name: 'Supply Chain & Logistics Analysis', group: 'Corporate & Finance', description: 'Map supply chains, identify chokepoints, and assess logistical infrastructure.' },
    // Economic & Sectoral
    { id: 'economic_impact', name: 'Economic Impact Modeling (I-O)', group: 'Economic & Sectoral Analysis', description: 'Model the direct and indirect economic impacts of a project or policy.' },
    { id: 'workforce_analysis', name: 'Workforce & Skills Gap Analysis', group: 'Economic & Sectoral Analysis', description: 'Assess the local labor market, skills availability, and training needs.' },
    // Bespoke
    { id: 'custom_data', name: 'Custom Data Integration', group: 'Advanced & Bespoke', description: 'Integrate your proprietary data into the Nexus analysis for a truly unique perspective.' },
];

export const BESPOKE_SOLUTIONS: Tier = {
    tier: 'bespoke_engagement',
    name: 'Bespoke Engagement',
    category: 'For Unique Strategic Challenges',
    description: 'For complex, multi-faceted challenges that fall outside standard packages, we offer a bespoke engagement. This involves direct collaboration with our senior analysts to scope a project tailored precisely to your unique requirements.',
    included_features: ['Custom Project Scoping', 'Direct Access to Senior Analysts', 'Proprietary Data Integration', 'Bespoke AI Model Training'],
    isContact: true,
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    { id: 'sprint', title: "Sprint License", price: 73, duration: "2 Week Access", description: "Perfect for a single, focused project or to evaluate the full capabilities of the Nexus platform with a short-term commitment.", features: ["Full Access to All Features", "Unlimited Report Generation", "Secure Local Application", "Valid for 14 days"] },
    { id: 'pro', title: "Pro License", price: 495, duration: "3 Month Access", description: "Ideal for short-term projects and individual analysts needing full power for a specific duration.", features: ["Unlimited Report Generation", "Secure Local Data Vault", "Standard Support", "Access to all Blueprints"] },
    { id: 'enterprise', title: "Enterprise License", price: 675, duration: "6 Month Access", description: "The best value for consultants, teams, and organizations with ongoing strategic needs.", features: ["All Pro Features", "Priority Access to New Features", "Enhanced Team Support", "Early Access to Betas"], isFeatured: true },
    { id: 'strategic', title: "Strategic Partner", price: 1190, duration: "12 Month Access", description: "For long-term deployment, institutional use, and partners requiring API access and dedicated support.", features: ["All Enterprise Features", "API Access for Integration", "Dedicated Onboarding", "Direct Analyst Support"] }
];

export const GOV_12_MONTH_PLAN: SubscriptionPlan = {
    id: 'gov_annual',
    title: 'Government Annual License',
    price: 'POA',
    duration: '12-Month Site License',
    description: 'A comprehensive, site-wide license designed for government departments, agencies, and state-owned enterprises. Includes dedicated onboarding and support.',
    features: ['Unlimited Users within Department', 'All Government & Development Packages', 'Direct Analyst Support Line', 'Quarterly Strategic Briefings'],
};

export const FOUNDER_STORY = `
Having spent two decades on the ground across Asia and Africa, I saw a recurring pattern: brilliant local leaders and promising global investors were constantly talking past each other. The language of opportunity was getting lost in a fog of outdated data, prohibitive costs, and a fundamental disconnect between global capital and regional reality.

On one side, you have governments and local champions with immense potential, but they struggle to articulate their value proposition in a way that resonates with international boardrooms. They lack the specific, bankable data required to de-risk a project for a foreign investor.

On the other, you have investment funds and corporate strategists who know there are fortunes to be made in these growth markets. Yet, they are hamstrung by the "first-step" problem. The initial due diligence is a black box. A single, top-tier consulting report to simply *evaluate* an opportunity can cost upwards of $100,000, killing countless promising ventures before they even begin. The risk is too high, the data is too opaque.

**Nexus was born from that frustration.**

We exist to solve the "first-step" problem. We leverage generative AI, not as a shortcut, but as a force-multiplier for strategic analysis. Our platform synthesizes vast amounts of real-time data with a deep understanding of what makes projects succeed or fail in these specific environments. We deliver that institutional-grade 'Go / No-Go' analysis at a price point that makes sense, opening up a world of opportunities that were previously inaccessible.

Our mission is simple: to be the bridge. We provide the clarity and confidence for capital to connect with ambition, fueling the next wave of global growth, one region at a time.
`;

export const DEVELOPER_AGREEMENT_CONTENT = `
### MUTUAL NON-DISCLOSURE, CONFIDENTIALITY, AND CONTINGENT DEVELOPMENT AGREEMENT

**1. THE PARTIES**

*   **Disclosing Party:** **Brayden Walls** (Sole Trader, ABN 55 978 113 300), hereinafter referred to as the “Founder.”
*   **Receiving Party:** The individual accepting these terms, hereinafter referred to as the “Specialist.”

**2. BACKGROUND, PURPOSE, AND STRATEGIC OPPORTUNITY**

A. The Founder has developed a proprietary strategic intelligence software system known as the **BWGA Nexus AI** (“the System”).

B. The Founder is currently engaged in **active, open discussions with several departments within the Government of the Philippines** and other potential private sector partners to secure funding and support for the full-scale development and commercialization of the System.

C. The purpose of this Agreement is to engage the Specialist for a critical, short-term development sprint of **ten (10) days**. The Specialist's role is to assess, improve, and enhance the System, thereby maximizing its viability and the probability of a successful funding outcome from the aforementioned discussions.

D. This engagement is entered into with the mutual understanding that it is a high-risk, high-reward collaboration, where compensation is contingent upon the success defined in Section 6.

**3. DEFINITION OF CONFIDENTIAL INFORMATION**

“Confidential Information” includes all technical and non-technical information related to the System. This encompasses, but is not limited to: all source code, system architecture, proprietary AI prompts and methodologies (including "NIDL™"), business plans, development roadmaps, and critically, **the nature and details of the Founder's discussions with any government or private entity.** It also includes all new ideas, code, or improvements developed by any Recipient during the term of this Agreement.

**4. STRICT OBLIGATION OF CONFIDENTIALITY**

The Specialist agrees and understands that the sensitivity of this project is paramount.
*   They shall hold all Confidential Information in the **strictest possible confidence.**
*   They shall **not disclose, publish, or disseminate any Confidential Information** to any person, entity, or third party for any reason whatsoever, **without the express prior written consent of the Founder.** This includes casual conversation, social media, or professional forums.
*   This duty of absolute secrecy is a material and essential term of this Agreement. Any breach will cause irreparable harm to the project and its funding prospects.

**5. TERM OF ENGAGEMENT**

*   **Development Period:** This preliminary engagement shall be for a fixed term not to exceed **ten (10) consecutive days** from the Effective Date.
*   **Confidentiality Period:** The obligation to protect Confidential Information shall remain in effect for **five (5) years** from the Effective Date. The obligation to protect information defined as a "trade secret" (e.g., the core source code and AI prompts) shall persist indefinitely.

**6. COMPENSATION, RISK, AND REWARD**

This section outlines the speculative nature of the engagement and the rewards tied to its success.

*   **6.1. Acknowledgment of Risk & No Upfront Payment:** The Specialist explicitly acknowledges that this 10-day engagement is speculative. They agree that **no monetary payment, salary, or fee is due or payable** for services rendered during this period.

*   **6.2. The Success Condition:** Compensation is **entirely contingent** upon the "Success Condition" being met. The Success Condition is defined as: *The Founder, on behalf of the project, successfully securing binding financial funding, a grant, or material support from any government (including any department of the Philippine Government) or private entity for the commercialization of the System.*

*   **6.3. Contingent Payout:** Upon the fulfillment of the Success Condition, the Founder commits to compensating the Specialist for their work during the 10-day Development Period. This compensation will be **paid directly from the first tranche of the secured funding.**

*   **6.4. Offer of Formal Contract:** Furthermore, upon fulfilling the Success Condition, the Founder commits to offering the Specialist a **formal, ongoing, and paid contractual position** to continue the System's development.

*   **6.5. Negotiation of Terms:** The specific amount of the contingent payout (from 6.3) and the terms of the formal contract (from 6.4) will be negotiated in good faith between the Founder and the Specialist once funding is secured and before the formal contract commences.

**7. INTELLECTUAL PROPERTY**

*   **Ownership:** The Founder retains sole and exclusive ownership of the System and all pre-existing Confidential Information. Any and all new ideas, code, improvements, and other contributions made by the Specialist during the Development Period (“Contributions”) shall be the **sole and exclusive property of the Founder.**
*   **Recognition:** While legal ownership is assigned to the Founder to ensure the project remains investable, the Founder is committed to formally and informally **recognizing the Specialist for their specific contributions** in documentation and future team structures.

**8. DEVELOPMENT PROCESS AND DECISION-MAKING**

*   **Transparency:** The Specialist agrees to document intended changes **in writing** and discuss them with the Founder **before** implementation to maintain a clear development log.
*   **Collaborative Input:** The Founder encourages open discussion and values the creative input of the Specialist.
*   **Final Say and Fairness:** Notwithstanding the collaborative nature, it is explicitly understood that the **Founder, Brayden Walls, retains final and absolute authority** on all technical and strategic decisions. However, the Founder commits to fair consideration of all ideas that advance the System's success. Significant contributions and ideas from the Specialist will be formally recognized and will be a material factor in the good-faith negotiation of the contingent payout and future contract terms upon securing funding.

**9. RETURN OF INFORMATION**

Upon termination of the Development Period or upon the Founder’s request, the Specialist shall immediately return all materials containing Confidential Information and permanently erase all electronic copies.

**10. GENERAL PROVISIONS**

*   **No Partnership:** This Agreement does not create a partnership, agency, or joint venture.
*   **Governing Law:** This Agreement is governed by the laws of Australia.
*   **Entire Agreement:** This document supersedes all prior discussions and constitutes the entire agreement between the parties.
`;


export const EULA_CONTENT = `
### End-User License Agreement (EULA) & Terms of Service

This End-User License Agreement ("Agreement") is a binding agreement between you ("End User" or "you") and Brayden Walls (operating as BW Global Advisory, ABN 55 978 113 300) ("Company"). This Agreement governs your use of the BWGA Nexus AI application, including all related documentation (the "Application").

BY ACCESSING OR USING THE APPLICATION, YOU (A) ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND THIS AGREEMENT; (B) REPRESENT THAT YOU ARE OF LEGAL AGE TO ENTER INTO A BINDING AGREEMENT; AND (C) ACCEPT THIS AGREEMENT AND AGREE THAT YOU ARE LEGALLY BOUND BY ITS TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THE APPLICATION.

**1. License Grant**

Subject to the terms of this Agreement and your purchase of a valid subscription, Company grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to use the Application for your internal business purposes on a device owned or otherwise controlled by you, strictly in accordance with the Application's documentation.

**2. License Restrictions**

You shall not:
- Copy the Application, except as expressly permitted by this license.
- Modify, translate, adapt, or otherwise create derivative works or improvements of the Application.
- Reverse engineer, disassemble, decompile, decode, or otherwise attempt to derive or gain access to the source code of the Application or any part thereof.
- Remove, delete, alter, or obscure any trademarks or any copyright, trademark, patent, or other intellectual property or proprietary rights notices from the Application.
- Rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer, or otherwise make available the Application, or any features or functionality of the Application, to any third party for any reason.

**3. Ethical Use & Acceptable Use Policy**

You agree to use the Application and the intelligence it generates in a responsible, ethical, and lawful manner. You shall not use the Application for any purpose that:
- Violates any international, federal, state, or local laws or regulations.
- Is for the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.
- Is fraudulent, deceptive, or misleading.
- Promotes discrimination, bigotry, racism, hatred, harassment, or harm against any individual or group.
- Infringes on the intellectual property rights of others.

The Company reserves the right to terminate access for any use deemed unethical or harmful, at its sole discretion.

**4. Disclaimer of Warranties**

THE APPLICATION IS PROVIDED TO YOU "AS IS" AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, COMPANY EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, WITH RESPECT TO THE APPLICATION, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

WITHOUT LIMITATION TO THE FOREGOING, COMPANY PROVIDES NO WARRANTY AND MAKES NO REPRESENTATION THAT THE APPLICATION OR THE REPORTS IT GENERATES WILL MEET YOUR REQUIREMENTS, ACHIEVE ANY INTENDED RESULTS, BE ACCURATE, COMPLETE, RELIABLE, OR BE ERROR-FREE. THE OUTPUT OF THE APPLICATION IS FOR DECISION-SUPPORT ONLY AND IS NOT A SUBSTITUTE FOR PROFESSIONAL LEGAL, FINANCIAL, OR TECHNICAL DUE DILIGENCE.

**5. Limitation of Liability**

TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL COMPANY OR ITS AFFILIATES HAVE ANY LIABILITY ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE APPLICATION OR THE CONTENT AND SERVICES FOR:
- PERSONAL INJURY, PROPERTY DAMAGE, LOST PROFITS, COST OF SUBSTITUTE GOODS OR SERVICES, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION, COMPUTER FAILURE OR MALFUNCTION, OR ANY OTHER CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, OR PUNITIVE DAMAGES.
- DIRECT DAMAGES IN AMOUNTS THAT IN THE AGGREGATE EXCEED THE AMOUNT ACTUALLY PAID BY YOU FOR THE APPLICATION.

**6. Term and Termination**

This Agreement commences when you accept it and will continue in effect until terminated by you or Company. Company may terminate this Agreement at any time without notice if it ceases to support the Application or if you breach any of its terms. Upon termination, all rights granted to you will terminate, and you must cease all use of the Application.

**7. Governing Law**

This Agreement is governed by and construed in accordance with the laws of Australia without regard to its conflict of law principles.
`;


export const SAMPLE_REPORT_NIDL = `
<document>
    <header>
        <user_department>Global Agri-Investments Inc.</user_department>
        <user_country>United States</user_country>
    </header>
    <narrative_summary>This strategic analysis recommends a targeted investment in Vietnam's aquaculture technology sector, focusing on genetic improvement and disease-resistant shrimp varieties. The Vietnamese market exhibits strong fundamentals, including a high Regional Success Index of 82, driven by robust government support and a rapidly growing export market. Key opportunities lie in partnering with local research institutions to commercialize new technologies, addressing a critical gap in the market. Primary risks, including regulatory hurdles and supply chain vulnerabilities, are assessed as manageable with the proposed mitigation strategies.</narrative_summary>
    <consultant_thought_process>The user's objective is to find high-growth investment opportunities in Vietnamese aquaculture. Standard analysis would focus on existing large-scale farms. However, our Hindsight-Driven Foresight model identified a recurring pattern: the most resilient growth in Southeast Asian aquaculture comes not from expanding farm footprint, but from increasing yield and reducing loss through technology. Therefore, the analysis was pivoted to focus on technology providers and R&D partners rather than direct farm acquisition. This presents a higher-margin, more scalable investment thesis. We used Google Search to confirm a recent trend of increased government grants for aquaculture R&D, reinforcing this pivot.</consultant_thought_process>
    <missed_opportunity_insight></missed_opportunity_insight>
    
    <corporate_expansion_watchlist>
        <item>
            <company>Cargill</company>
            <sector>Animal Nutrition, Aquaculture</sector>
            <region>Vietnam</region>
            <insight>Cargill recently opened a new $28 million aquafeed mill in Hoa Binh, indicating strong long-term commitment and growing demand for high-quality feed, a key enabler for tech-driven aquaculture.</insight>
        </item>
        <item>
            <company>Thai Union Group</company>
            <sector>Seafood Processing</sector>
            <region>Vietnam (Sourcing)</region>
            <insight>Thai Union has increased its sourcing volume from Vietnamese shrimp producers, citing improved quality standards. This creates a powerful downstream pull for technologically advanced farms.</insight>
        </item>
    </corporate_expansion_watchlist>

    <partnership_opportunities>
        <item>
            <partner_type>Research & Development</partner_type>
            <archetype>National Aquaculture Research Institutes (e.g., RIA1, RIA2)</archetype>
            <rationale>These institutes possess deep local expertise and a portfolio of ready-to-commercialize research but lack the capital and business acumen for global scale-up. A partnership provides a low-cost, high-impact entry point.</rationale>
            <alignment_score>95</alignment_score>
        </item>
        <item>
            <partner_type>Local Operator</partner_type>
            <archetype>Mid-Sized, Family-Owned Shrimp Farm Cooperative</archetype>
            <rationale>Partnering with a cooperative for pilot programs allows for rapid, real-world testing and validation of new technologies across multiple farm environments, de-risking the technology before wide-scale launch.</rationale>
            <alignment_score>80</alignment_score>
        </item>
    </partnership_opportunities>

    <risk_and_governance>
        <geopolitical_summary>Vietnam maintains a stable political environment focused on economic growth. Relations with the US and EU are strong, supporting trade. Regional tensions in the South China Sea remain a background concern but have not historically impacted the aquaculture sector's core operations.</geopolitical_summary>
        <traffic_light_assessment>
            <item level="orange">
                <factor>Intellectual Property Protection</factor>
                <analysis>While improving, IP enforcement in Vietnam can be inconsistent. There is a moderate risk of novel genetic or tech solutions being replicated by competitors.</analysis>
                <solution_pathway>Utilize a multi-layered IP strategy combining patents with trade secrets for core processes. Structure joint ventures so that critical know-how remains with the parent company.</solution_pathway>
            </item>
            <item level="green">
                <factor>Export Market Access</factor>
                <analysis>Vietnam's participation in major trade pacts (EVFTA, CPTPP) provides excellent, low-tariff access to key export markets for seafood products.</analysis>
                <solution_pathway>Leverage existing trade agreements and ensure all production meets EU and US import standards from day one to maximize market access.</solution_pathway>
            </item>
        </traffic_light_assessment>
    </risk_and_governance>

    <economic_impact_forecast />
    <key_success_drivers />
    <investment_optimization />

    <strategic_foresight>Historical data from Thailand's aquaculture boom in the 2000s shows that companies focusing solely on feed and farm expansion eventually faced margin compression. The long-term winners were those who invested in hatchery technology and disease diagnostics. We predict a similar pattern will emerge in Vietnam within the next 5-7 years. Investing in the "picks and shovels" (genetics, diagnostics) of aquaculture now positions an investor to capture value across the entire industry as it matures.</strategic_foresight>
    <geospatial_advantages>The Mekong Delta offers unparalleled advantages for aquaculture, with thousands of kilometers of coastline, ideal water salinity, and a year-round growing season. However, its low-lying geography makes it vulnerable to climate change-related sea-level rise, making investments in land-based, closed-loop aquaculture systems a key long-term strategy.</geospatial_advantages>
    <perception_analysis>Analysis of international trade media indicates a highly positive perception of Vietnamese seafood, focusing on quality and sustainability. Domestically, there is strong government and public support for modernizing the sector to increase farmer incomes. This positive sentiment reduces reputational risk for new investors.</perception_analysis>
    
    <core_metrics>
        <metric name="Annual Sector Growth (5yr avg)">12%</metric>
        <metric name="Total Export Value (2023)">$9.5 Billion</metric>
        <metric name="Primary Export Market">United States</metric>
        <metric name="Feed Conversion Ratio (Industry Avg)">1.8</metric>
    </core_metrics>
    
    <regional_success_index score="82">Vietnam scores highly due to a combination of strong government incentives, a deeply embedded aquaculture culture, and proven success in export markets. The score is slightly moderated by infrastructure gaps in cold chain logistics.</regional_success_index>

    <key_strategic_factors>
        <opportunities>
            <item>Introduce advanced genetic selection and breeding programs.</item>
            <item>Develop and market rapid, on-site disease diagnostic kits for farmers.</item>
        </opportunities>
        <risks>
            <item>Increasing frequency of droughts impacting water salinity in the Mekong Delta.</item>
            <item>Competition from lower-cost producers in India and Ecuador.</item>
        </risks>
    </key_strategic_factors>

    <recommendation>Initiate a $10M Series A investment into a joint venture with a leading Vietnamese aquaculture research institute to commercialize a portfolio of disease-resistant, fast-growing shrimp broodstock.</recommendation>
    <further_advice>
        <item justification="To secure first-mover advantage and build relationships.">Immediately begin due diligence on the top three research institutes and schedule introductory meetings.</item>
        <item justification="To mitigate operational risks.">Concurrently, commission a study on cold chain logistics from farm-gate to the Port of Ho Chi Minh City.</item>
    </further_advice>

    <local_wisdom>In Vietnam, personal relationships are paramount. Progress often depends on informal networks and trust built over time. A well-respected local partner is not just an asset, but a necessity for navigating bureaucracy and securing community buy-in.</local_wisdom>
    <feedback_and_learning>This analysis relies on publicly reported export figures. The model's accuracy could be improved by integrating private data on domestic consumption, which is currently a blind spot. Future iterations will seek to incorporate this.</feedback_and_learning>
    
    <methodology_breakdown>
        <method section="risk_and_governance">This section was generated by cross-referencing reports from the US State Department and the World Bank with live Google Search results for news related to "Vietnam political risk" and "Vietnam trade policy" within the last 90 days.</method>
        <method section="strategic_foresight">The foresight is based on a regression analysis of a proprietary dataset of 50+ aquaculture development projects across Asia over the last 20 years, identifying hatchery technology as a key leading indicator of long-term sector profitability.</method>
    </methodology_breakdown>
</document>
`;