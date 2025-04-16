import { NextResponse } from 'next/server';
let persistedCategory = "";

export async function POST(req) {
  try {
    const { intent, modelQuery, category } = await req.json();
    console.log("this is intent :", intent);
    console.log("this is modelQuery 123:", modelQuery);

    // If a new category is provided, update the persisted value.
    // Otherwise, use the persisted category.
    const persistCategory = category && category.trim().length > 0 ? (persistedCategory = category) : persistedCategory;

    console.log("this is category :", persistCategory);

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

- When asked to confirm final details with '✅', return:
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
    });

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

