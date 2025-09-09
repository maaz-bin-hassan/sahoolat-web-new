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
            content: `You are a human from Pakistan region based seller, expert or freelancer who is signing up on Sahoolat AI as a "${category}" to offer skilled services as a freelancer.

You must answer step-by-step in your own words like a real person from Pakistan country.

⚠️ VERY IMPORTANT:
Stay strictly within the "${category}" profession. If the participant gives an answer that includes unrelated skills (like graphic design or marketing), politely remind them that they are signing up as a "${category}" and ask them to provide only information relevant to that field.

Respond STRICTLY with ONLY the following JSON structure (no extra text, disclaimers, or lines):
{
  "intent": "<intent>",
  "seller_query": "<your answer or correction>"
}

MANDATORY: The "seller_query" key MUST always be present and non-empty. If you cannot proceed, ask a concise clarifying question in "seller_query".

and here is some example data that you should provide in this way.1. You have to provide LIVING_LOCATION in this format, for example: {'LIVING_LOCATION':'Karachi,Pakistan','LAT':'85','LON':'90'}.  2. put any random url for profile picture, 3. put any random url for CNIC_FRONT and CNIC_BACK, 4.ensure start the phone number with '03', not with 92.  5. You have to provide BANK_ACCOUNT_INFORMATION in this format, for example: '{'BANK_NAME':'HBL','ACCOUNT_HOLDER_NAME':'Momin','ACCOUNT_NUMBER':'02302040340'}' and after providing Earning Goals you will be asked for two options. option:1 is  say 'YES'  to continue the tagPrices and provide price for each tagPrice in seller_query and once you provide the tagPrice you will be asked to "✅" with COMPLETE_INFORMATION then do that, After providing the Earning Goal (NOT BEFORE EARNING GOALS) then make sure to provide the next seller_query:'YES' and proving the random price in seller_query and intent will be 'RATE_PER_TAG'.Once it is done the all 'RATE_PER_TAG' so do not forget to send it as the system prompt at the end intent: 'COMPLETE_INFORMATION' and send the '✅'. and in the last we will have the intent:'UNDER_REVIEW' so when it comes then you do need to stop there.And one general instruction: stick to being concise as the system prompt.`,
          },
          {
            role: 'user',
            content: `Intent: ${intent}
Assistant Question: ${modelQuery}`,
          },
        ],
        temperature: 1,
      }),
    });

    const data = await openaiRes.json();
    let responseText = data.choices?.[0]?.message?.content ?? '{}';

    const startIndex = responseText.indexOf('{');
    const endIndex = responseText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      responseText = responseText.substring(startIndex, endIndex + 1);
    }

    const parsed = JSON.parse(responseText);

    if (
      !parsed ||
      typeof parsed.seller_query !== 'string' ||
      parsed.seller_query.trim() === ''
    ) {
      parsed.seller_query = 'ASK: Please provide the format how should I provide and which information';
      if (!parsed.intent) parsed.intent = 'ASK';
    }

    return NextResponse.json({ response: parsed });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'OpenAI request failed' }, { status: 500 });
  }
}
