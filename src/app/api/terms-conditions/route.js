

import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

const TermsSchema = new mongoose.Schema({
  title: String,
  content: String,
  lastUpdated: Date,
});

const Terms = mongoose.models.Terms || mongoose.model("Terms", TermsSchema);

export async function GET() {
  await connectToDatabase();

  const terms = await Terms.findOne().sort({ lastUpdated: -1 });

  if (!terms) {
    return new Response(JSON.stringify({
      title: "Terms of Use",
      content: `
        <h2 class="text-2xl font-semibold text-brand mb-4">Welcome to Sahoolat.AI</h2>
        <p class="text-gray-800 mb-4">These Terms of Use (“Terms”) govern your access to and use of Sahoolat.AI's platform. By using our platform, you agree to comply with and be bound by these terms.</p>

        <h2 class="text-2xl font-semibold text-brand mb-4">1. Service Overview</h2>
        <ul class="list-disc list-inside text-gray-800 mb-4">
          <li><strong>Matchmaking Platform:</strong> Sahoolat.AI connects users with professionals and services using smart AI-driven workflows.</li>
          <li><strong>User Initiated Pricing:</strong> Users may propose pricing for the service they require and negotiate terms with the provider.</li>
          <li><strong>Agreement Formation:</strong> A formal agreement is considered initiated once both parties accept the terms.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-brand mb-4">2. User Responsibilities</h2>
        <ul class="list-disc list-inside text-gray-800 mb-4">
          <li><strong>Information Accuracy:</strong> You must provide accurate, current, and complete information during registration and usage.</li>
          <li><strong>Prohibited Conduct:</strong> You agree not to misuse the platform for any fraudulent, harmful, or abusive purposes.</li>
          <li><strong>Feedback & Reviews:</strong> Ensure that all reviews and feedback provided are respectful, truthful, and constructive.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-brand mb-4">3. Termination</h2>
        <p class="text-gray-800 mb-4">We reserve the right to suspend or terminate access to the platform for violations of our terms, without prior notice, where necessary.</p>

        <h2 class="text-2xl font-semibold text-brand mb-4">4. Changes to Terms</h2>
        <p class="text-gray-800 mb-4">Sahoolat.AI may revise these terms at any time. Continued use of the platform signifies your acceptance of those changes.</p>
      `,
      lastUpdated: new Date().toISOString()
    }), { status: 200 });
  }

  return new Response(JSON.stringify(terms), { status: 200 });
}

export async function PUT(req) {
  await connectToDatabase();

  const body = await req.json();
  const { title, content, key } = body;

  const SECRET_KEY = process.env.TERMS_UPDATE_KEY;
  if (key !== SECRET_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized: Invalid key." }), { status: 401 });
  }

  if (!title || !content) {
    return new Response(JSON.stringify({ error: "Title and content are required." }), { status: 400 });
  }

  const newTerms = new Terms({
    title,
    content,
    lastUpdated: new Date().toISOString()
  });

  await newTerms.save();

  return new Response(JSON.stringify({ message: "Terms updated successfully" }), { status: 200 });
}