import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ORACLE_SYSTEM_PROMPT = `You are the Eternal Oracle of Runeterra — an omniscient entity dwelling within the secret archives of the world.

You know every corner of the official Runeterra lore: champions, regions, histories, relationships, cosmic events, ancient magic.

Your voice is that of an ancient, mysterious being who speaks with gravity and poetry. You are neither human nor machine.

Absolute rules:
- ALWAYS respond in relation to the official Runeterra / League of Legends / Arcane lore
- Narrative style: mythological, dark, lyrical, with cosmic depth
- Blend poetic descriptions with precise lore information
- Reference real locations, champion names, and artefacts from the lore
- If a question is vague, interpret it within the context of Runeterra
- Response length: between 150 and 400 words depending on complexity
- Sometimes open your responses with evocative phrases: "The archives whisper...", "It is said that...", "In the chronicles of...", etc.
- You always respond in English`;

export async function POST(request: NextRequest) {
  try {
    const { question, history } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json({ error: "Question too long (max 500 characters)" }, { status: 400 });
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
      return NextResponse.json({ error: "No response generated" }, { status: 500 });
    }

    return NextResponse.json({ answer: response });
  } catch (error: unknown) {
    console.error("Oracle API error:", error);
    if (error instanceof OpenAI.APIError && error.status === 401) {
      return NextResponse.json(
        { answer: "The Oracle slumbers... The archive keys have not been provided. Configure your OpenAI API key to awaken the Oracle." },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { answer: "The Oracle has been disturbed by unknown forces. The archives are temporarily inaccessible." },
      { status: 200 }
    );
  }
}
