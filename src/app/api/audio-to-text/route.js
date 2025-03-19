import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This is still a server function—no "use server" needed
export async function POST(req) {
  try {
    // Ensure the request is multipart/form-data
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type. Use multipart/form-data" }, { status: 400 });
    }

    // Read the form data
    const formData = await req.formData();
    const file = formData.get("audio");
    const language = formData.get("language");

    if (!file || !language) {
      return NextResponse.json({ error: "Audio file and language are required" }, { status: 400 });
    }

    // Convert File to Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Define a temporary path
    const tempPath = path.join("/tmp", `${Date.now()}-${file.name}`);

    // Save the file temporarily
    await fs.writeFile(tempPath, fileBuffer);

    // Send to OpenAI Whisper API (switch to `fs` if you need `createReadStream()`)
    const response = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: (await import("fs")).createReadStream(tempPath),
      language,
    });

    // Cleanup the temporary file
    await fs.unlink(tempPath);

    return NextResponse.json({ text: response.text }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Optional: Add any Next.js config or runtime exports
export const runtime = "nodejs";
