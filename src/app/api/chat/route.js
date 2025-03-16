import { NextResponse } from 'next/server';
import { getSession, updateSession } from '@/utils/sessionManager';
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from "@/utils/SystemPrompts";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    const { fingerprint, message } = await request.json();

    if (!fingerprint || !message) {
        return NextResponse.json({ error: 'Fingerprint and message are required.' }, { status: 400 });
    }

    const session = getSession(fingerprint);
    const messages = session.messages;

    // Modify system prompt to enforce HTML response
    const htmlSystemPrompt = SYSTEM_PROMPT + `
        \n\n**IMPORTANT:** Always respond using HTML format. Wrap responses inside structured tags like <p>, <strong>, <ul>, <li>, and <div>. Use simple and clean formatting for better readability.`;

    const openaiPayload = [
        { role: 'system', content: htmlSystemPrompt },
        ...messages,
        { role: 'user', content: message },
    ];

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: openaiPayload,
        });

        let assistantMessage = completion.choices[0].message.content;

        // Update session with HTML response
        const updatedMessages = [
            ...messages,
            { role: 'user', content: message },
            { role: 'assistant', content: assistantMessage },
        ];
        updateSession(fingerprint, updatedMessages);

        return NextResponse.json({ response: assistantMessage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate response.' }, { status: 500 });
    }
}
