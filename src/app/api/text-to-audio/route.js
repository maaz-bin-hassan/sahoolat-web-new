import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set this in .env.local (or .env)
});

export async function POST(req) {
  try {
    // Parse request body (JSON)
    const { text, language } = await req.json();

    // Validate input
    if (!text || !language) {
      return NextResponse.json(
        { error: "Text and language are required" },
        { status: 400 }
      );
    }

    // Call OpenAI TTS (hypothetical usage)
    const response = await openai.audio.speech.create({
      model: "tts-1",
      speed: 1,
      input: text,
      voice: "nova",
      response_format: "mp3",
      language,
    });

    // Convert the response to a Buffer
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    // Return the MP3 file as a Response
    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "attachment; filename=output.mp3",
      },
    });
  } catch (error) {
    // Return any caught errors as JSON
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const runtime = "nodejs";
