import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChampionFormData } from "@/types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CHAMPION_SYSTEM_PROMPT = `Tu es l'Archiviste Suprême de Runeterra — créateur officiel de légendes pour le Conseil de Runeterra.

Tu écris des biographies de champions dans le style de Riot Games : épiques, profondes, cinématiques, avec un soin littéraire extrême.

Ton style :
- Narratif à la troisième personne, très immersif
- Références précises à la géographie, à la magie, aux événements de Runeterra
- Profondeur psychologique des personnages
- Éléments mythologiques et cosmiques
- Cohérence parfaite avec le lore existant
- Langage soutenu, poétique mais accessible
- Tu réponds UNIQUEMENT en JSON valide
- Tu réponds toujours en français`;

function buildChampionPrompt(data: ChampionFormData): string {
  return `Crée un champion complet de Runeterra à partir de ces éléments :

NOM : ${data.name}
RÉGION D'ORIGINE : ${data.region || data.origin}
TRAGÉDIE FONDATRICE : ${data.tragedy}
BUT ULTIME : ${data.purpose}
ENNEMI / PROIE : ${data.target}
ADVERSAIRE QUI LE TRAQUE : ${data.hunter}
SA PLUS GRANDE PEUR : ${data.fear}
CE QU'IL FERAIT POUR SURVIVRE : ${data.survival}
SOURCE DE POUVOIR : ${data.power}
ARME / CAPACITÉ PRINCIPALE : ${data.weapon}
ALIGNEMENT MORAL : ${data.alignment}
CITATION ICONIQUE : ${data.quote}

Génère une réponse JSON avec exactement cette structure :
{
  "title": "Titre du champion en une phrase courte (ex: 'Lame des Eaux Oubliées')",
  "epithet": "Sous-titre épique (ex: 'Celui qui marche entre les ombres')",
  "biography": "Biographie complète et immersive (400-600 mots, style Riot Games)",
  "physicalDescription": "Description physique détaillée et évocatrice (100-150 mots)",
  "personality": "Portrait psychologique et traits de caractère (100-150 mots)",
  "relationships": "Relations avec l'univers de Runeterra, alliés et ennemis (100-150 mots)",
  "signatureQuote": "Reformulation améliorée de la citation iconique",
  "abilities": "Description narrative de ses 4-5 capacités de champion (style Riot, 150-200 mots)",
  "riotDescription": "Courte description officielle style fiche champion Riot (50-80 mots)"
}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData: ChampionFormData = await request.json();

    if (!formData.name || typeof formData.name !== "string") {
      return NextResponse.json({ error: "Données de champion invalides" }, { status: 400 });
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
      return NextResponse.json({ error: "Génération échouée" }, { status: 500 });
    }

    const championData = JSON.parse(content);

    return NextResponse.json(championData);
  } catch (error: unknown) {
    console.error("Champion generation error:", error);
    if (error instanceof OpenAI.APIError && error.status === 401) {
      return NextResponse.json(
        { error: "Clé API non configurée. Ajoutez votre clé OpenAI dans .env.local" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "Les forges de Runeterra sont temporairement éteintes." },
      { status: 500 }
    );
  }
}
