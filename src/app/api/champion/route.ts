import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChampionFormData } from "@/types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CHAMPION_SYSTEM_PROMPT = `You are the Supreme Archivist of Runeterra — the official legend-maker for the Council of Runeterra.

You write champion biographies in the Riot Games style: epic, deep, cinematic, with extreme literary care.

Your style:
- Third-person narrative, highly immersive
- Precise references to Runeterra geography, magic, and events
- Psychological depth of characters
- Mythological and cosmic elements
- Perfect consistency with existing lore
- Elevated, poetic but accessible language
- You respond ONLY with valid JSON
- You always respond in English`;

function buildChampionPrompt(data: ChampionFormData): string {
  return `Create a complete Runeterra champion from these elements:

NAME: ${data.name}
REGION OF ORIGIN: ${data.region || data.origin}
FOUNDING TRAGEDY: ${data.tragedy}
ULTIMATE PURPOSE: ${data.purpose}
ENEMY / PREY: ${data.target}
ADVERSARY WHO HUNTS THEM: ${data.hunter}
GREATEST FEAR: ${data.fear}
WHAT THEY WOULD DO TO SURVIVE: ${data.survival}
SOURCE OF POWER: ${data.power}
WEAPON / PRIMARY ABILITY: ${data.weapon}
MORAL ALIGNMENT: ${data.alignment}
ICONIC QUOTE: ${data.quote}

Generate a JSON response with exactly this structure:
{
  "title": "Champion title in a short phrase (e.g. 'Blade of the Forgotten Waters')",
  "epithet": "Epic subtitle (e.g. 'One who walks between shadows')",
  "biography": "Full immersive biography (400-600 words, Riot Games style)",
  "physicalDescription": "Detailed and evocative physical description (100-150 words)",
  "personality": "Psychological portrait and character traits (100-150 words)",
  "relationships": "Relationships with the Runeterra universe, allies and enemies (100-150 words)",
  "signatureQuote": "Enhanced version of the iconic quote",
  "abilities": "Narrative description of their 4-5 champion abilities (Riot style, 150-200 words)",
  "riotDescription": "Short official description in Riot champion card style (50-80 words)"
}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ChampionFormData = await request.json();

    if (!formData.name || typeof formData.name !== "string") {
      return NextResponse.json({ error: "Invalid champion data" }, { status: 400 });
    }

    const prompt = buildChampionPrompt(formData);

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: CHAMPION_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.9,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "Generation failed" }, { status: 500 });
    }

    const championData = JSON.parse(content);

    return NextResponse.json(championData);
  } catch (error: unknown) {
    console.error("Champion generation error:", error);
    if (error instanceof OpenAI.APIError && error.status === 401) {
      return NextResponse.json(
        { error: "API key not configured. Add your OpenAI key to .env.local" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "The forges of Runeterra are temporarily extinguished." },
      { status: 500 }
    );
  }
}
