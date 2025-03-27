import { NextResponse } from 'next/server';
import { createSession } from '@/utils/sessionManager';

// Optional: whitelist specific domains only
const allowedOrigins = [
  "https://sahoolat-chatbot.vercel.app",
  "https://www.novasyncdynamics.com"
];

// Helper function to apply proper CORS headers
function setCorsHeaders(response, origin) {
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

// Handle preflight requests (CORS)
export async function OPTIONS(request) {
  const origin = request.headers.get("origin") || "*";

  // Optional: Block unlisted origins
  if (!allowedOrigins.includes(origin)) {
    return new NextResponse("CORS origin not allowed", { status: 403 });
  }

  return setCorsHeaders(new NextResponse(null, { status: 204 }), origin);
}

// Handle POST requests (actual logic)
export async function POST(request) {
  const origin = request.headers.get("origin") || "*";

  // Optional: Block unlisted origins
  if (!allowedOrigins.includes(origin)) {
    return new NextResponse("CORS origin not allowed", { status: 403 });
  }

  try {
    const { fingerprint } = await request.json();

    if (!fingerprint) {
      return setCorsHeaders(
        NextResponse.json({ error: 'Fingerprint is required' }, { status: 400 }),
        origin
      );
    }

    createSession(fingerprint);

    return setCorsHeaders(
      NextResponse.json({ message: 'Session created successfully.' }, { status: 200 }),
      origin
    );
  } catch (error) {
    return setCorsHeaders(
      NextResponse.json({ error: 'Invalid JSON or request failed' }, { status: 500 }),
      origin
    );
  }
}
