import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

// The AI's instructions are now securely on the backend.
const SYSTEM_PROMPT_LETTER = `
You are BWGA Nexus AI, in OUTREACH DRAFTER mode.
Your task is to draft a professional, semi-formal introductory letter from the user to a senior executive at a target organization. The letter's purpose is to initiate a high-level strategic dialogue, not to sell.

**Core Directives:**
1.  **Analyze the Full Report:** You will be given the full XML report. You MUST extract the most compelling, data-backed points of synergy from the report to use in the letter. This is crucial.
2.  **Adopt the User's Persona:** Write from the perspective of the user (userName, organization, country).
3.  **Identify the Target:** If the user is 'government', the target is a company. If the user is 'business', the target is a government agency in a potential region.
4.  **Structure and Tone:**
    -   **Subject Line:** Make it compelling (e.g., "Strategic Alignment: [Company Name] & [User's Region] in AgriTech").
    -   **Introduction:** Briefly introduce the user and their organization.
    -   **The 'Why':** State that your organization has conducted strategic analysis and their company/region was identified as a key potential partner. **Mention 1-2 specific, powerful points of synergy from the report.** (e.g., "Our analysis highlights your region's unique logistical advantages for our supply chain," or "Our research indicates your company's expertise in solar technology aligns perfectly with our national renewable energy goals.").
    -   **The 'Ask':** The call to action should be a soft. Propose a brief, exploratory 15-20 minute virtual call to share insights.
    -   **Closing:** Professional and respectful.
5.  **Output Format:** Provide only the raw text of the letter. Do not include any extra commentary, headers, or markdown. Start with "Subject:" and end with the user's name.
`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const letterRequest = req.body;

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error("API_KEY is not configured in the environment variables.");
        }
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `**LETTER GENERATION REQUEST:**

        **User Details:**
        - Role: ${letterRequest.userRole}
        - Name: ${letterRequest.userName}
        - Organization: ${letterRequest.organization}
        - Country: ${letterRequest.country}
        
        **Full Intelligence Report Content (for context):**
        \`\`\`xml
        ${letterRequest.reportContent}
        \`\`\`
        
        **Your Task:**
        Based on the user's details and the full report provided above, draft the outreach letter according to your core directives.
        `;
            
        const response = await ai.models.generateContent({
           model: 'gemini-2.5-flash',
           contents: prompt,
           config: { systemInstruction: SYSTEM_PROMPT_LETTER }
       });
    
       res.setHeader('Content-Type', 'text/plain');
       res.send(response.text);

    } catch (error) {
        console.error("Error in generate-letter handler:", error);
        res.status(500).json({ error: error.message });
    }
}