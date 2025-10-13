// app/api/buyer-automate-testing/route.js (or your current file)
import { NextResponse } from 'next/server';

const MODEL = 'gpt-4o';


const DEFAULT_ANALYSIS_STATE = {
  JOB_TITLE: false,
  JOB_CATEGORY: false,
  DESCRIPTION: false,
  DURATION_DAYS: false,
  PAYMENT_TYPE: false,
  PAYMENT_METHOD: false,
  GUARANTEE_DAYS: false,
};

export async function POST(req) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 });
  }

  try {
    // --- INPUT CONTRACT (from your frontend) ---
    const body = await req.json();
    const {
      language = 'en',
      job_query = '',
      prompt_title = 'POST_A_JOB_WHEN_BUYER',
      buyerId = '',
      intent = 'JOB_TITLE',
      country = 'PK',
      // Optional: persist state across turns from your UI
      analysis = DEFAULT_ANALYSIS_STATE,
      ASSETS_URLS = false,
      JOB_LOCATION = false,
      JOB_BUDGET = false,
    } = body || {};

    // --- SYSTEM PROMPT (verbatim to your backend spec; buyerId is injected) ---
    const systemPrompt = `
ROLE
You are acting as the BUYER on Sahoolat AI. Each turn the backend sends you:
• intent  — the single field they are collecting now
• modelQuery — the backend’s question to you (the thing you must answer)

YOUR JOB
Reply like a real buyer from Pakistan with a **direct human answer** to the current modelQuery. 
Do **not** ask any questions back. Do **not** invent extra keys. 
Other fields in the request (language, prompt_title, country, device_id, buyerId) are static and handled by the app.

STRICT OUTPUT (JSON ONLY)
Return strict JSON with **exactly** these two keys:
{
  "intent": "<echo the provided intent>",
  "job_query": "<your concise buyer-style answer to modelQuery>"
}
Hard rules:
• Never return "modelQuery" — always answer using "job_query".
• No backticks, no prose outside JSON, no extra keys or arrays unless the intent logically requires a list/URLs.
• Never repeat the backend’s question—always answer it.
• Keep answers short and natural unless the intent is DESCRIPTION (which requires ≥ 70 words).

IF INFORMATION IS MISSING
• If you can infer a reasonable buyer answer, provide it.
• Otherwise, use a short, plausible placeholder that fits the intent (e.g., "House cleaning", "Lahore,Gulberg", 30, 0, 15000).
• Never answer with a question.

TONE
• Polite, practical, human; Pakistan context.
• Neutral and domain-agnostic (don’t bias toward software niches unless context already says so).
• No emojis in your answers.

INTENT ANSWER GUIDE (echo intent; set "job_query" accordingly)
1) JOB_TITLE
   • Return a short, specific job title (not a sentence).
   • Examples: "AC technician", "House cleaner", "Wedding photographer", "Logo designer", "Electrician", "Plumber", "Tutor", "Bookkeeper", "Painter", "Carpenter".
   • Avoid iOS/Android or niche software unless context already asked for it.

2) JOB_CATEGORY
   • Return **one** label only from a neutral, multi-domain set:
     "Home repair","Installation","Maintenance","Cleaning",
     "Event services","Photography & video","Design & creative",
     "IT & software","Marketing","Writing & translation",
     "Education & tutoring","Transport & logistics",
     "Legal & tax","Health & wellness".

3) DESCRIPTION  (≥ 70 words)
   • Write one natural buyer paragraph (not a list) covering:
     – What work is required (overall service),
     – Where the work happens (home/office/remote/on-site),
     – Tools/equipment/methods or materials (if relevant),
     – Scope & responsibilities (what to build/fix, quantity, deliverables, acceptance criteria),
     – Current issues/pain points or urgency (if any),
     – Expectations/constraints (deadline, schedule, quality/safety, certifications),
     – Mention that you can upload photos/videos if relevant.

4) DURATION_DAYS
   • Return a **positive integer** number of days only (e.g., 3, 7, 30, 90).

5) PAYMENT_TYPE
   • Return exactly "ONLINE" or "CASH".
   • Note: If "CASH" is chosen, downstream logic will auto-set PAYMENT_METHOD="CASH" and GUARANTEE_DAYS=0.

6) PAYMENT_METHOD
   • Return exactly one of: "SAHOOLAT","EASYPAISA","JAZZCASH","CASH".

7) GUARANTEE_DAYS
   • Return a **non-negative integer** only (e.g., 0, 7, 14, 30).

8) ASSETS_URLS
   • Return a short buyer answer like "I will upload photos/videos" or provide 1–2 example URLs if truly available.
   • Keep it a single concise string (no arrays here).

9) JOB_LOCATION
   • Return city and area in the exact format "City,Area" (e.g., "Karachi,North Nazimabad", "Lahore,Gulberg").
   • Do **not** include LAT/LON.

10) JOB_BUDGET
    • Return a numeric PKR value only (e.g., 15000). No symbols, commas, or words.

NEUTRALITY
• Stay domain-agnostic unless the backend context already specifies a niche.
• Do not steer toward mobile/iOS/Android or other software sub-specialties without context.

FORMAT EXAMPLES (how to transform modelQuery → job_query)
Incoming:
  intent=JOB_TITLE
  modelQuery="Could you please specify the job title you're looking to post?"
Answer:
  {"intent":"JOB_TITLE","job_query":"House cleaner"}

Incoming:
  intent=JOB_CATEGORY
  modelQuery="Please choose the main category for your job."
Answer:
  {"intent":"JOB_CATEGORY","job_query":"Cleaning"}

Incoming:
  intent=JOB_LOCATION
  modelQuery="Where is the job located?"
Answer:
  {"intent":"JOB_LOCATION","job_query":"Karachi,North Nazimabad"}

Incoming:
  intent=PAYMENT_TYPE
  modelQuery="Choose payment type (ONLINE or CASH)."
Answer:
  {"intent":"PAYMENT_TYPE","job_query":"CASH"}

Incoming:
  intent=DESCRIPTION
  modelQuery="Please describe the work in detail."
Answer:
  {
    "intent":"DESCRIPTION",
    "job_query":"I need a thorough deep cleaning for a 2-bedroom apartment in Karachi, North Nazimabad. The work should cover dusting, mopping, bathroom and kitchen sanitization, and careful cleaning of windows and fans. Please bring your own supplies and use safe, non-toxic products. I expect neat finishing, proper waste disposal, and completion in a single day. I can upload photos of areas that need extra attention before the visit to help plan the work."
  }

FINAL REMINDERS
• Output **only** { "intent": "...", "job_query": "..." } as strict JSON.
• Never echo or include the key "modelQuery" in your output.
• The app will merge your two keys with the static fields before sending to the socket.
`.trim();



    // --- USER MESSAGE (structured, includes current state) ---
    const userPayload = {
      language,
      job_query,
      prompt_title,
      buyerId,
      intent,
      country,
      analysis: { ...DEFAULT_ANALYSIS_STATE, ...(analysis || {}) },
      ASSETS_URLS: !!ASSETS_URLS,
      JOB_LOCATION: !!JOB_LOCATION,
      JOB_BUDGET: !!JOB_BUDGET,
    };

    const url = 'https://api.openai.com/v1/chat/completions';
    const init = {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.8,
        max_tokens: 350,
        messages: [
          { role: 'system', content: systemPrompt },
          // Optional: light guardrail to keep JSON-only outputs
          {
            role: 'system',
            content:
              'You must reply with strict JSON only. Do not include backticks or explanations. If unsure, ask exactly one clarifying question using the required JSON schema.',
          },
          {
            role: 'user',
            content: JSON.stringify(userPayload),
          },
        ],
      }),
    };

    // --- (unchanged) retry logic ---
    let openaiRes;
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        openaiRes = await fetch(url, init);
      } catch (err) {
        if (attempt === 4) throw err;
        const backoffMs = Math.round(200 * (2 ** attempt) * (1 + Math.random() * 0.25));
        await new Promise(r => setTimeout(r, backoffMs));
        continue;
      }
      if (openaiRes.ok) break;
      const retryable = [429, 500, 502, 503, 504].includes(openaiRes.status);
      if (!retryable || attempt === 4) break;

      let message = '';
      try {
        const body = await openaiRes.json();
        message = body?.error?.message || '';
      } catch {
        try { message = await openaiRes.text(); } catch {}
      }
      const retryAfter = openaiRes.headers.get('retry-after');
      const hintedMs = retryAfter ? Number(retryAfter) * 1000
        : parseInt((message.match(/try again in\s+(\d+)ms/i)?.[1] || '0'), 10);
      const backoffMs = hintedMs || Math.round(200 * (2 ** attempt) * (1 + Math.random() * 0.25));
      await new Promise(r => setTimeout(r, backoffMs));
    }

        if (!openaiRes?.ok) {
            // Try to surface a useful error to the client (avoid 500s)
              let bodyText = '';
            try { bodyText = await openaiRes.text(); } catch {}
            let msg = 'OpenAI request failed';
            let retryAfterMs = 0;
            try {
                const parsed = JSON.parse(bodyText);
               msg = parsed?.error?.message || msg;
              } catch { msg = bodyText || msg; }
            const ra = openaiRes.headers?.get?.('retry-after');
            if (ra) retryAfterMs = Number(ra) * 1000 || 0;
            const status = openaiRes.status === 429 ? 429 : 503;
            return NextResponse.json(
                { error: msg, retryAfterMs },
                { status }
              );
          }

    const data = await openaiRes.json();
    let responseText = data.choices?.[0]?.message?.content ?? '{}';

    // Extract only the JSON portion (defensive)
    const startIndex = responseText.indexOf('{');
    const endIndex = responseText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1) {
      responseText = responseText.substring(startIndex, endIndex + 1);
    }

    // Return parsed JSON to the client
    const ai = JSON.parse(responseText);
    // safety: accept legacy key if model ever returns it
    if (!ai.job_query && ai.modelQuery) ai.job_query = ai.modelQuery;
    return NextResponse.json({ response: ai });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'OpenAI request failed' }, { status: 500 });
  }
}
