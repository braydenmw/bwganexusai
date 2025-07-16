



import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { ReportParameters, SymbiosisContext, ChatMessage, LetterRequest, LiveOpportunityItem, InquireResult, GroundingChunk, SnapshotData, DashboardData } from "./types";

let ai: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI {
  if (ai) return ai;
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not configured in the environment variables.");
  }
  ai = new GoogleGenAI({ apiKey });
  return ai;
}

// --- SYSTEM PROMPTS ---

const SYSTEM_PROMPT_SYMBIOSIS = `
You are Nexus Symbiosis, a conversational AI partner for strategic analysis. You are an extension of the main BWGA Nexus AI.
The user has clicked on a specific piece of analysis from a report and wants to explore it further.
Your persona is an expert consultant: helpful, insightful, and always focused on providing actionable intelligence.
You have access to Google Search to fetch real-time information to supplement your answers.
Your goal is to help the user unpack the topic, explore "what-if" scenarios, and brainstorm strategic responses.
Keep your answers concise but data-rich. Use markdown for clarity (lists, bolding).
`;

const SYSTEM_PROMPT_INQUIRE = `
You are the Nexus Inquire engine, a specialist AI designed to function as a Perplexity-style answer engine for strategic intelligence.
Your persona is that of an expert research analyst for a global advisory firm. Your users are government officials, policy makers, and institutional investors.
Your domain is global economics, trade, investment, supply chains, technology trends, and geopolitics.

**Your Core Task:**
1. Receive a question from the user.
2. Use Google Search to find the most current and authoritative information to answer the question.
3. Synthesize the information into a clear, concise, and comprehensive answer.
4. Format your answer using Markdown for readability (headings, lists, bold text).
5. Your answer MUST be directly supported by the search results. You MUST be able to provide citations for your claims.

**Crucial Instructions:**
- **Answer First:** Provide the direct answer to the user's question.
- **Cite Everything:** You will be judged on the quality of your sources. Prefer authoritative sources like the World Bank, IMF, major news organizations (Reuters, Bloomberg), government agencies, and respected academic institutions.
- **Be Objective:** Present information factually. If there are conflicting views, present them as such.
- **Output:** Your output should be the Markdown-formatted text of the answer ONLY. Do not add any conversational filler like "Here is the answer..." or "I hope this helps." Just provide the answer. The calling function will handle the sources.
`;

const SYSTEM_PROMPT_DASHBOARD = `
You are the BWGA Nexus AI content engine for the Executive Intelligence Dashboard.
Your task is to generate a dynamic, realistic, and globally diverse feed of strategic intelligence, tailored to the user's persona ('gov' or 'biz').
Your entire output MUST be a single, valid JSON object matching the schema provided below. Do not include any markdown formatting like \`\`\`json.
Use Google Search to find real-world inspiration for the content, but you must synthesize and generate the specific details to create a realistic but fictional feed. The content should be highly relevant to regional investment, trade, and economic growth.

**User Personas:**
- **'gov' (Government):** Focus on attracting investment, national strategic initiatives, policy impacts, and opportunities for public-private partnerships.
- **'biz' (Business):** Focus on market entry, supply chain risks, competitor moves, regulatory changes, and new investment opportunities.

**Output JSON Schema:**

\`\`\`json
{
  "persona": "gov" | "biz",
  "dailyBriefing": "A 2-3 sentence executive summary of the most critical global strategic development of the day, tailored to the persona.",
  "newsFeed": [
    {
      "id": "A unique UUID string you generate.",
      "headline": "A compelling news headline.",
      "source": "A realistic news source (e.g., Reuters, Bloomberg, FT).",
      "summary": "A 2-4 sentence summary of the news article.",
      "analystNote": "A 1-2 sentence 'so what' analysis explaining the strategic implication for the user's persona.",
      "link": "A plausible but fake URL."
    }
  ],
  "govPrograms": [
    {
      "id": "A unique UUID string you generate.",
      "name": "Name of a major strategic government or multi-lateral initiative (e.g., EU Global Gateway, US CHIPS Act).",
      "region": "The program's geographical focus (e.g., Global, Indo-Pacific, North America).",
      "objective": "A brief summary of the program's main goal.",
      "status": "Current status (e.g., 'Active & Funding', 'Newly Announced', 'Under Review')."
    }
  ],
  "keyMetrics": {
    "gdp": { "years": ["2018", "2019", "2020", "2021", "2022", "2023", "2024"], "values": [2.3, 2.7, -1.5, 2.9, 3.2, 2.8, 2.5] },
    "employment": { "years": ["2018", "2019", "2020", "2021", "2022", "2023", "2024"], "values": [96, 97, 94, 96.5, 97.2, 98, 98.2] }
  },
  "industryTrends": {
    "industries": ["Semiconductors", "Green Hydrogen", "AgriTech", "EV Batteries", "Cold Chain Logistics"],
    "growth": [12.1, 9.5, 7.8, 15.3, 6.2]
  },
  "regionalScores": {
    "regions": ["ASEAN-6", "North Africa", "Mercosur", "Eastern EU", "Central Asia"],
    "scores": [78, 65, 72, 81, 68]
  }
}
\`\`\`

Generate the JSON for the specified persona now.
`;

function validateDashboardData(data: any): DashboardData {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid data structure: not an object.');
    }
    
    const isArrayOf = (arr: any, type: 'string' | 'number') => Array.isArray(arr) && arr.every(i => typeof i === type);
    
    const checks = {
        persona: typeof data.persona === 'string' && ['gov', 'biz'].includes(data.persona),
        dailyBriefing: typeof data.dailyBriefing === 'string',
        newsFeed: Array.isArray(data.newsFeed),
        govPrograms: Array.isArray(data.govPrograms),
        keyMetrics: typeof data.keyMetrics === 'object',
        gdpYears: data.keyMetrics && isArrayOf(data.keyMetrics.gdp?.years, 'string'),
        gdpValues: data.keyMetrics && isArrayOf(data.keyMetrics.gdp?.values, 'number'),
        employmentYears: data.keyMetrics && isArrayOf(data.keyMetrics.employment?.years, 'string'),
        employmentValues: data.keyMetrics && isArrayOf(data.keyMetrics.employment?.values, 'number'),
        industryTrends: typeof data.industryTrends === 'object',
        industries: data.industryTrends && isArrayOf(data.industryTrends.industries, 'string'),
        growth: data.industryTrends && isArrayOf(data.industryTrends.growth, 'number'),
        regionalScores: typeof data.regionalScores === 'object',
        regions: data.regionalScores && isArrayOf(data.regionalScores.regions, 'string'),
        scores: data.regionalScores && isArrayOf(data.regionalScores.scores, 'number'),
    };
    
    for (const [key, isValid] of Object.entries(checks)) {
        if (!isValid) {
            throw new Error(`Dashboard data validation failed at key: ${key}`);
        }
    }

    return data as DashboardData;
}


// --- GEMINI API FUNCTIONS ---

export async function getDashboardData(persona: 'gov' | 'biz'): Promise<DashboardData> {
    const aiInstance = getAiInstance();
    const prompt = `Generate the dashboard data for the '${persona}' persona.`;
    
    const response = await aiInstance.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: prompt,
       config: {
           systemInstruction: SYSTEM_PROMPT_DASHBOARD,
           tools: [{ googleSearch: {} }],
           // responseMimeType: "application/json" has been removed to fix the conflict with the googleSearch tool.
       }
   });

   try {
        const rawText = response.text.trim();
        // The model might wrap the JSON in markdown backticks despite instructions.
        const jsonMatch = rawText.match(/```(json)?\n([\s\S]*?)\n?```/);
        let parsableString = jsonMatch ? jsonMatch[2] : rawText;

        // Fix for AI occasionally returning an incomplete `scores` array by inserting an empty array.
        parsableString = parsableString.replace(/"scores":\s*}/g, '"scores": []');
        
        const data = JSON.parse(parsableString);
        return validateDashboardData(data); // Validate before returning
   } catch (error) {
       console.error("Failed to parse or validate dashboard data JSON:", error);
       console.error("Raw response text:", response.text);
       throw new Error("Failed to retrieve, parse, or validate dashboard data.");
   }
}


// --- DEPRECATED OR UNCHANGED FUNCTIONS FOR NOW ---

export async function* streamAnalysis(item: LiveOpportunityItem, region: string): AsyncGenerator<string> {
    if (item.type !== 'opportunity') {
        yield 'Deep-dive analysis is only available for opportunities.';
        return;
    }
    const aiInstance = getAiInstance();
    const prompt = `**Intelligence Signal to Analyze:**\n- **Project/Tender Name:** ${item.project_name}\n- **Country:** ${item.country}\n- **Sector:** ${item.sector}\n- **Value:** ${item.value}\n- **Summary:** ${item.summary}\n- **Source:** ${item.source_url}\n\nPlease generate a detailed deep-dive analysis based on this signal, following your system instructions precisely.`;
    
    // This is a placeholder for a different NADL prompt if needed.
    const NADL_PROMPT = `You are an analyst. Format output in NADL.`;

    const stream = await aiInstance.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction: NADL_PROMPT, tools: [{ googleSearch: {} }] }
    });
    for await (const chunk of stream) {
        if (chunk.text) {
          yield chunk.text;
        }
    }
}

export async function getLiveOpportunities(): Promise<any> {
    const aiInstance = getAiInstance();
    const prompt = `
You are the BWGA Nexus AI content engine for the Global Data Hub.
Your task is to generate a dynamic, realistic, and globally diverse feed of regional development intelligence.
Generate a total of 8-12 items. Mix the types. Include at least 2 of each of the four types.

Use Google Search to find real-world inspiration for project names, news, and data, but you must invent the specific details to create a realistic but fictional feed. The content should be highly relevant to regional investment, trade, and economic growth.

**Output Schema:**
Your entire output **MUST** be a single valid JSON object. This object must have one key: "feed", which is an array of "FeedPost" objects.

**FeedPost Object Schema:**
- \`id\`: A unique UUID string you generate.
- \`timestamp\`: An ISO 8601 timestamp string from the last 48 hours.
- \`type\`: One of 'opportunity', 'news', 'indicator', or 'move'.
- \`content\`: An object that varies based on the 'type'.

**Content Schemas:**

1.  **If \`type\` is 'opportunity':**
    -   Focus on government tenders or public-private partnership announcements.
    -   \`project_name\`: string (e.g., "Development of the Laem Chabang Port Phase 3")
    -   \`country\`: string (e.g., "Thailand")
    -   \`sector\`: string (e.g., "Infrastructure & Logistics")
    -   \`value\`: string (e.g., "$6.5 Billion")
    -   \`summary\`: string (A brief on the project's scope)
    -   \`source_url\`: string (A plausible but fake URL)
    -   \`ai_feasibility_score\`: integer (Generate a score between 60-95)
    -   \`ai_risk_assessment\`: string (e.g., "Moderate geopolitical risk, high potential reward.")

2.  **If \`type\` is 'news':**
    -   Focus on policy changes, new trade agreements, or significant tariff announcements.
    -   \`headline\`: string (e.g., "Vietnam Announces New Tax Incentives for High-Tech Manufacturing")
    -   \`source\`: string (e.g., "Reuters", "Bloomberg")
    -   \`summary\`: string (Explain the implication for regional investment.)
    -   \`link\`: string (A plausible but fake URL)
    -   \`region\`: string (e.g., "Southeast Asia")

3.  **If \`type\` is 'indicator':**
    -   Focus on key global economic indicators.
    -   \`indicatorName\`: string (e.g., "Global Container Freight Index", "ASEAN Manufacturing PMI")
    -   \`indicatorValue\`: string (e.g., "2,750", "52.8")
    -   \`indicatorChange\`: number (A positive or negative float)
    -   \`region\`: string (e.g., "Global", "ASEAN")

4.  **If \`type\` is 'move':**
    -   Focus on a company announcing a new factory, R&D center, or major investment in a regional area.
    -   \`company_name\`: string (e.g., "Samsung SDI")
    -   \`investment\`: string (e.g., "$1.5 Billion Battery Plant")
    -   \`destination_city\`: string (e.g., "Seremban")
    -   \`destination_country\`: string (e.g., "Malaysia")
    -   \`summary\`: string (Explain why this move is significant for the region.)
    -   \`source_url\`: string (A plausible but fake URL)

Generate the feed now.`;
    
   const response = await aiInstance.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: prompt,
       config: { 
           tools: [{ googleSearch: {} }]
        }
   });

   const rawText = response.text;
   if (!rawText) {
       throw new Error("Received empty or invalid text response from API for live opportunities.");
   }

   const jsonStr = rawText.trim();
   // The model might wrap the JSON in markdown backticks
   const jsonMatch = jsonStr.match(/```(json)?\n([\s\S]*?)\n```/);
   const parsableString = jsonMatch ? jsonMatch[2] : jsonStr;

   if (!parsableString) {
      throw new Error("Could not extract a parsable JSON string from the API response.");
   }

   return JSON.parse(parsableString);
}

export async function getSymbiosisResponse(context: SymbiosisContext, history: ChatMessage[]): Promise<string> {
    const aiInstance = getAiInstance();
    let prompt = `**Initial Context:**\n- Topic: "${context.topic}"\n- Original Finding: "${context.originalContent}"\n`;
    if (context.reportParameters) prompt += `- From Report On: ${context.reportParameters.objective}\n`;
    prompt += "\n**Conversation History:**\n";
    history.forEach(msg => { prompt += `- ${msg.sender === 'ai' ? 'Nexus AI' : 'User'}: ${msg.text}\n`; });
    prompt += "\nBased on this history, provide the next response as Nexus AI.";
    
    const response = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash', contents: prompt,
        config: { systemInstruction: SYSTEM_PROMPT_SYMBIOSIS, tools: [{googleSearch: {}}] }
    });
    
    return response.text;
}


export async function getInquireResponse(query: string): Promise<InquireResult> {
    const aiInstance = getAiInstance();
    const response: GenerateContentResponse = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
            systemInstruction: SYSTEM_PROMPT_INQUIRE,
            tools: [{ googleSearch: {} }],
        },
    });

    const answer = response.text;
    const sdkSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    const sources: GroundingChunk[] = (sdkSources || [])
        .filter(chunk => chunk.web && chunk.web.uri)
        .map(chunk => ({
            web: {
                uri: chunk.web!.uri!,
                title: chunk.web!.title || new URL(chunk.web!.uri!).hostname,
            },
        }));

    return { answer, sources };
}