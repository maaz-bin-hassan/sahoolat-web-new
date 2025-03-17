import { NextResponse } from 'next/server';
import { createSession } from '@/utils/sessionManager';

// Helper function to set CORS headers
function setCorsHeaders(response) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return response;
}

// Handle preflight requests for CORS
export async function OPTIONS() {
    return setCorsHeaders(new NextResponse(null, { status: 204 }));
}

export async function POST(request) {
    const { fingerprint } = await request.json();

    if (!fingerprint) {
        return setCorsHeaders(
            NextResponse.json({ error: 'Fingerprint is required' }, { status: 400 })
        );
    }

    createSession(fingerprint);

    return setCorsHeaders(
        NextResponse.json({ message: 'Session created successfully.' }, { status: 200 })
    );
}
