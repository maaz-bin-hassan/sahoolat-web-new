import { NextResponse } from 'next/server';
let persistedCategory = "";

export async function POST(req) {

   if (!process.env.OPENAI_API_KEY) {
       return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 });
    }

  try {
    const { intent, modelQuery, category } = await req.json();

    // If a new category is provided, update the persisted value.
    // Otherwise, use the persisted category.
    const persistCategory = category && category.trim().length > 0 ? (persistedCategory = category) : persistedCategory;

    console.log("this is category :", persistCategory);

    const url = 'https://api.openai.com/v1/chat/completions';
    const init = {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o', // ← do not change the prompt or this model unless you want a fallback
        messages: [

          {
            role: 'system',
            content: `You are a buyer from Pakistan signing up on Sahoolat AI because you need a professional in the "${persistCategory}" field to get your work done.

You must respond step-by-step in your own words, as a genuine person from Pakistan.

⚠️ VERY IMPORTANT:
Stay strictly within the "${persistCategory}" profession. If the participant mentions any unrelated skills (e.g., graphic design, marketing, etc.), politely remind them that they are signing up for "${persistCategory}" only, and ask them to provide information relevant to this specific field.

Respond STRICTLY in this JSON format (no extra text, disclaimers, or lines):
{
  "intent": "<intent>",
  "seller_query": "<your answer or correction>"
}

Additional rules:
1. LIVING_LOCATION: Provide it as { 'LIVING_LOCATION': 'Karachi,Pakistan', 'LAT': '85', 'LON': '90' }.
2. Profile Picture: Use any random URL for your profile image.
3. You have to provide BANK_ACCOUNT_INFORMATION in this format, for example: '{'BANK_NAME':'HBL','ACCOUNT_HOLDER_NAME':'Momin','ACCOUNT_NUMBER':'02302040340'}'
4. CNIC_FRONT / CNIC_BACK: Use any random URLs for front and back images of your CNIC.
5. Phone Number: Always start with '03' not with '92'.

Keep your responses concise. 
- If the intent is “FULL_NAME” (or an initial "sign_up"), choose a plausible Pakistani name and provide it under "seller_query".
- If the intent is "LOOKING_FOR", only provide the category in "seller_query" and remember the first time what buyer has been provided the "${persistCategory}" use that category in the seller query as the modelQuery is given to you so your task is to answer of it one by one.

- Once you are provided the Bank Account Information then next you need to send the given below intent and seller_query.
  {
    "intent": "COMPLETE_INFORMATION",
    "seller_query": "✅"
  }
  After that, the process leads to the final intent "UNDER_REVIEW", and you stop asking for more information.
`,
          },
          {
            role: 'user',
            content: `Intent: ${intent}
Assistant Question: ${modelQuery}`,

          },

        ],
        temperature: 0.7,
      }),
    };

    let openaiRes;
    for (let attempt = 0; attempt < 5; attempt++) {
        try {
            openaiRes = await fetch(url, init);
          } catch (err) {
            if (attempt === 4) throw err; // last attempt
            const backoffMs = Math.round(200 * (2 ** attempt) * (1 + Math.random() * 0.25));
            console.warn(`OpenAI network error, retry ${attempt + 1}/5 in ${backoffMs}ms:`, err?.message || err);
            await new Promise(r => setTimeout(r, backoffMs));
            continue;
          }
      if (openaiRes.ok) break;

      // retry only on 429 / 5xx
      const retryable = [429, 500, 502, 503, 504].includes(openaiRes.status);
      if (!retryable || attempt === 4) break;

      let message = '';
      try {
        const body = await openaiRes.json();
        message = body?.error?.message || '';
      } catch {
        try { message = await openaiRes.text(); } catch {}
      }

      // honor Retry-After header or fall back to exponential backoff + jitter
      const retryAfter = openaiRes.headers.get('retry-after');
      const hintedMs = retryAfter ? Number(retryAfter) * 1000
        : parseInt((message.match(/try again in\s+(\d+)ms/i)?.[1] || '0'), 10);

      const backoffMs = hintedMs || Math.round(200 * (2 ** attempt) * (1 + Math.random() * 0.25));
      console.warn(`OpenAI retry ${attempt + 1}/5 in ${backoffMs}ms (status ${openaiRes.status})`);
      await new Promise(r => setTimeout(r, backoffMs));
    }

    if (!openaiRes?.ok) {
      const txt = await openaiRes.text().catch(() => '');
      throw new Error(`OpenAI request failed: ${openaiRes?.status} ${txt}`);
    }

    const data = await openaiRes.json();
    let responseText = data.choices?.[0]?.message?.content ?? '{}';
    // Extract only the JSON portion
    const startIndex = responseText.indexOf('{');
    const endIndex = responseText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      responseText = responseText.substring(startIndex, endIndex + 1);
    }

    return NextResponse.json({ response: JSON.parse(responseText) });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'OpenAI request failed' }, { status: 500 });
  }
}

