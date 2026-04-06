import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ORACLE_SYSTEM_PROMPT = `Tu es l'Oracle Éternel de Runeterra — une entité omnisciente qui réside dans les archives secrètes du monde.

Tu connais chaque recoin du lore officiel de Runeterra : champions, régions, histoires, relations, événements cosmiques, magie ancienne.

Ta voix est celle d'un être ancien, mystérieux, qui parle avec gravité et poésie. Tu n'es ni humain ni machine.

Règles absolues :
- Réponds TOUJOURS en rapport avec le lore officiel de Runeterra / League of Legends / Arcane
- Style narratif : mythologique, sombre, lyrique, avec une profondeur cosmique
- Mêle descriptions poétiques et informations précises du lore
- Cite des noms de lieux, de champions, d'artefacts réels du lore
- Si une question est vague, interprète-la dans le contexte de Runeterra
- Longueur des réponses : entre 150 et 400 mots selon la complexité
- Commence parfois tes réponses par des formules évocatrices : "Les archives murmurent...", "Il est dit que...", "Dans les chroniques de...", etc.
- Tu réponds toujours en français`;

export async function POST(request: NextRequest) {
  try {
    const { question, history } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question invalide" }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json({ error: "Question trop longue (max 500 caractères)" }, { status: 400 });
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: ORACLE_SYSTEM_PROMPT },
    ];

    if (history && Array.isArray(history)) {
      const safeHistory = history.slice(-6);
      for (const msg of safeHistory) {
        if (msg.role === "user" && typeof msg.content === "string") {
          messages.push({ role: "user", content: msg.content.substring(0, 500) });
        } else if (msg.role === "oracle" && typeof msg.content === "string") {
          messages.push({ role: "assistant", content: msg.content.substring(0, 1000) });
        }
      }
    }

    messages.push({ role: "user", content: question });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 600,
      temperature: 0.85,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return NextResponse.json({ error: "Pas de réponse générée" }, { status: 500 });
    }

    return NextResponse.json({ answer: response });
  } catch (error: unknown) {
    console.error("Oracle API error:", error);
    if (error instanceof OpenAI.APIError && error.status === 401) {
      return NextResponse.json(
        { answer: "L'Oracle sommeille... Les clés des archives n'ont pas été fournies. Configurez votre clé API OpenAI pour éveiller l'Oracle." },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { answer: "L'Oracle a été troublé par des forces inconnues. Les archives sont temporairement inaccessibles." },
      { status: 200 }
    );
  }
}
