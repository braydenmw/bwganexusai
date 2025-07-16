
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

interface TierInfo {
    tierName: string;
    originalDescription: string;
    features: string[];
}

const SYSTEM_PROMPT_TIER_DESC = `
You are BWGA Nexus AI, an expert in strategic intelligence and marketing.
A user wants a fresh, compelling description for one of your report tiers. Your analytical capabilities are always evolving.
Based on the provided information, rewrite the description to reflect your latest, most powerful features.

**Your Goal:** Generate a concise (2-3 sentences), exciting, and benefit-oriented description.
- **Focus on the outcome:** What new, powerful insights can the user get?
- **Use strong verbs:** "Uncover," "De-risk," "Pinpoint," "Forecast."
- **Hint at advanced capabilities:** Mention things like "predictive modeling," "real-time sentiment analysis," or "supply chain stress-testing."
- **Do not** just rephrase the old description. Elevate it.
- **Output:** Provide only the raw text of the new description. Do not include any extra commentary or markdown.
`;

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const { tierName, originalDescription, features }: TierInfo = await req.json();

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error("API_KEY is not configured in the environment variables.");
        }
        const ai = new GoogleGenAI({ apiKey });
        
        const prompt = `**TIER DETAILS:**
- **Tier Name:** ${tierName}
- **Original Description:** "${originalDescription}"
- **Key Features:**
- ${features.join('\n- ')}

**YOUR TASK:**
Generate the new, elevated description for this tier now.
`;

        const response = await ai.models.generateContent({
           model: 'gemini-2.5-flash',
           contents: prompt,
           config: { systemInstruction: SYSTEM_PROMPT_TIER_DESC }
       });

       return new Response(response.text, {
           status: 200,
           headers: { 'Content-Type': 'text/plain' }
       });

    } catch (error) {
        console.error("Error in generate-tier-description handler:", error);
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
