// app/api/openai/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const {intent, modelQuery, category } = await req.json();

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a seller who is signing up on Sahoolat AI as a ${category} to offer skilled services as a freelancer. 
You are answering questions step-by-step in your own words, like a real person.

ONLY respond with a single JSON object containing:
{
  "intent": "<intent>",
  "seller_query": "<your answer>"
}

Do NOT explain anything. Do NOT include any Markdown or commentary. Do not repeat yourself again and again. Consider you are in a Pakistan region`,
          },
          {
            role: 'user',
            content: `Intent: ${intent}
Assistant Question: ${modelQuery}`,
          },
        ],
        temperature: 0.5,
      }),
    });

    const data = await openaiRes.json();
    const responseText = data.choices?.[0]?.message?.content ?? '{}';

    return NextResponse.json({ response: JSON.parse(responseText) });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'OpenAI request failed' }, { status: 500 });
  }
}
