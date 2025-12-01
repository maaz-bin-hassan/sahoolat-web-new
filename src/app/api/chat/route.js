import {NextResponse} from "next/server";
import {getSession, updateSession} from "../../../utils/sessionManager";
import OpenAI from "openai";
import {SYSTEM_PROMPT} from "../../../utils/SystemPrompts";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "https://sahoolat-chatbot.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  return response;
}
export async function OPTIONS() {
  return setCorsHeaders(
    new NextResponse(null, { status: 204 })
  );
}

// ✅ Handle POST Request (Chat API)
export async function POST(request) {
  try {
    const {fingerprint, message} = await request.json();

    if (!fingerprint || !message) {
      return setCorsHeaders(
        NextResponse.json({error: "Fingerprint and message are required."}, {status: 400})
      );
    }

    // Fetch user session
    const session = getSession(fingerprint);
    const messages = session.messages;

    // **Force AI to return HTML**
    const htmlSystemPrompt = SYSTEM_PROMPT + `
\n\n**IMPORTANT:** Always respond using **HTML format**. 
Wrap responses inside structured tags like:
<ul>
  <li>Use <strong>bold</strong> for important text.</li>
  <li>Use <p> for paragraphs.</li>
  <li>Use <ul> and <li> for lists.</li>
</ul>
Make sure the response is user-friendly and visually appealing in a chatbot UI.
`;

    // Construct messages for OpenAI
    const openaiPayload = [
      {role: "system", content: htmlSystemPrompt},
      ...messages,
      {role: "user", content: message},
    ];

    // Send request to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: openaiPayload,
    });

    const assistantMessage = completion.choices[0].message.content;

    // Update session messages
    const updatedMessages = [
      ...messages,
      {role: "user", content: message},
      {role: "assistant", content: assistantMessage},
    ];
    updateSession(fingerprint, updatedMessages);

    // ✅ Return AI response in HTML format
    return setCorsHeaders(
      NextResponse.json({response: assistantMessage}, {status: 200})
    );

  } catch (error) {
    console.error("Error processing request:", error);
    return setCorsHeaders(
      NextResponse.json({error: "Internal Server Error"}, {status: 500})
    );
  }
}
