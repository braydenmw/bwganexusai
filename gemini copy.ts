/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReportParameters, GroundingChunk, LetterRequest, DashboardData, ProblemContext, Solution, AiSuggestion, Tier, ReportOption } from "../types";

const API_BASE_URL = 'http://localhost:5001';

function getHeaders(): HeadersInit {
    return {
        'Content-Type': 'application/json',
    };
}

async function post<T>(endpoint: string, body: object): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred on the server' }));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    return response.json();
}

export async function generateReport(params: ReportParameters): Promise<{ xml: string, sources: GroundingChunk[] }> {
  return post<{ xml: string, sources: GroundingChunk[] }>('/api/generate-report', params);
}

export async function getAiSuggestion(
    problemStatement: string,
    persona: string,
    availableTiers: Tier[],
    availableModules: ReportOption[]
): Promise<AiSuggestion> {
    return post<AiSuggestion>('/api/get-ai-suggestion', {
        problemStatement,
        persona,
        availableTiers,
        availableModules,
    });
}


export async function getDashboardData(persona: 'gov' | 'biz', isOffline: boolean): Promise<DashboardData> {
  if (isOffline) {
      console.warn("Offline mode: Returning stale dashboard data.");
      const staleData: DashboardData = {
          isStale: true,
          persona: persona,
          dailyBriefing: "Offline: Unable to fetch live data. Displaying last known information.",
          newsFeed: [{ id: "offline-1", headline: "No Connection to Live News Feed", source: "System", summary: "Please check your internet connection to receive real-time updates.", analystNote: "Offline status limits strategic oversight.", link: "#" }],
          govPrograms: [{ id: "offline-p1", name: "Data Unavailable Offline", region: "Global", objective: "Connect to the internet to access live program tracking.", status: "Unknown" }],
          keyMetrics: { 
              gdp: { years: [], values: [], forecastYears: [], forecastValues: [] }, 
              employment: { years: [], values: [], forecastYears: [], forecastValues: [] } 
            },
          industryTrends: { industries: [], growth: [] },
          regionalScores: { regions: [], scores: [] }
      };
      return staleData;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/get-dashboard-data?persona=${persona}`, {
        headers: getHeaders(),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    return response.json();
  } catch (error: any) {
    console.error("Dashboard live fetch failed, attempting to use fallback.", error.message);
    throw new Error(`Failed to fetch dashboard data. Make sure the backend server is running. ${error.message}`);
  }
}

export async function analyzeProblem(context: ProblemContext): Promise<Solution> {
    return post<Solution>('/api/analyze-problem', context);
}

export async function generateLetter(request: LetterRequest): Promise<string> {
    const response = await post<{ letter: string }>('/api/generate-letter', request);
    return response.letter;
}