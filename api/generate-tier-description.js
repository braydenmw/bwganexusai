import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

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

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { tierName, originalDescription, features } = req.body;

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

       res.setHeader('Content-Type', 'text/plain');
       res.send(response.text);

    } catch (error) {
        console.error("Error in generate-tier-description handler:", error);
        res.status(500).json({ error: error.message });
    }
}