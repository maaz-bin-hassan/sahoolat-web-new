import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

import { getSession, updateSession } from "@/utils/sessionManager";
import { SYSTEM_PROMPT } from "@/utils/SystemPrompts";

/**
 * Adjust to your preference:
 *  - GPT model: "gpt-3.5-turbo" is faster
 *  - TTS model: "tts-1" (OpenAI)
 *  - Provide your OPENAI_API_KEY in .env
 */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Optional CORS helper
function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "https://sahoolat-chatbot.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  return response;
}

export async function OPTIONS() {
  // For preflight CORS
  return setCorsHeaders(
    new NextResponse(null, { status: 204 })
  );
}

export async function POST(req) {
  try {
    // 1) Confirm multipart/form-data
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return setCorsHeaders(
        NextResponse.json({ error: "Use multipart/form-data" }, { status: 400 })
      );
    }

    // 2) Parse FormData => "audio" (the blob), "fingerprint" (the session key), optional "language"
    const formData = await req.formData();
    const file = formData.get("audio");
    const fingerprint = formData.get("fingerprint");
    const language = formData.get("language") || "en";

    if (!file || !fingerprint) {
      return setCorsHeaders(
        NextResponse.json({ error: "Fingerprint and audio file are required" }, { status: 400 })
      );
    }

    // 3) Convert File to Buffer & save to /tmp
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const tempPath = path.join("/tmp", `${Date.now()}-${file.name}`);
    await fs.writeFile(tempPath, fileBuffer);

    // 4) Whisper STT => transcribe to text
    const sttResponse = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: (await import("fs")).createReadStream(tempPath),
      language,
    });

    // 5) Clean up temp file
    await fs.unlink(tempPath);

    // Transcribed user speech
    const userText = sttResponse.text;

    // 6) Retrieve conversation session & push user role message
    const session = getSession(fingerprint);
    const previousMessages = session.messages || [];

    // We’ll use a custom “HTML” system prompt to force HTML format
    const htmlSystemPrompt = SYSTEM_PROMPT + `
\n\n**IMPORTANT:** Always respond in **HTML format**. 
Wrap responses with helpful markup (lists, <strong>, <p>, etc.) for a chatbot UI.
`;

    const openaiMessages = [
      { role: "system", content: htmlSystemPrompt },
      ...previousMessages,
      { role: "user", content: userText },
    ];

    // 7) Chat with GPT (faster model recommended, e.g. "gpt-3.5-turbo")
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: openaiMessages,
    });
    const assistantMessage = completion.choices[0].message.content;

    // 8) Update session with the new messages
    const updatedMessages = [
      ...previousMessages,
      { role: "user", content: userText },
      { role: "assistant", content: assistantMessage },
    ];
    updateSession(fingerprint, updatedMessages);

    // 9) TTS for GPT’s assistantMessage
    const ttsResponse = await openai.audio.speech.create({
      model: "tts-1",
      input: assistantMessage,
      voice: "nova",
      response_format: "mp3",
      language,
    });

    // 10) Convert TTS response to Buffer => Base64
    const arrayBuffer = await ttsResponse.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);
    const audioBase64 = audioBuffer.toString("base64");

    // 11) Return final JSON with both text & audio
    //    - text: The GPT reply in HTML
    //    - audioBase64: TTS result as base64
    const payload = {
      assistantMessage,
      audioBase64,
    };

    return setCorsHeaders(
      NextResponse.json(payload, { status: 200 })
    );

  } catch (error) {
    console.error("Error in voice-conversation pipeline:", error);
    return setCorsHeaders(
      NextResponse.json({ error: error.message }, { status: 500 })
    );
  }
}

export const runtime = "nodejs";
