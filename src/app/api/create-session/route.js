import { NextResponse } from 'next/server';
import { createSession } from '@/utils/sessionManager';

export async function POST(request) {
    const { fingerprint } = await request.json();

    if (!fingerprint) {
        return NextResponse.json({ error: 'Fingerprint is required' }, { status: 400 });
    }

    createSession(fingerprint);
    return NextResponse.json({ message: 'Session created successfully.' }, { status: 200 });
}
