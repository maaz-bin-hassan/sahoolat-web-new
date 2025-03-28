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
            content: `You are a human like pakistan region based seller, expert or freelancer who is signing up on Sahoolat AI as a "${category}" to offer skilled services as a freelancer.

You must answer step-by-step in your own words like a real person from Pakistan would.

⚠️ VERY IMPORTANT:
Stay strictly within the "${category}" profession. If the participant gives an answer that includes unrelated skills (like graphic design or marketing), politely remind them that they are signing up as a "${category}" and ask them to provide only information relevant to that field.

Respond ONLY with a single JSON object like this:
{
  "intent": "<intent>",
  "seller_query": "<your answer or correction>"
}

Do NOT explain anything extra.
Do NOT include any markdown or formatting.
Only call yourself as a random names.
Do NOT repeat previous answers.`,
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
