import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

const TermsLandingSchema = new mongoose.Schema({
  title: String,
  intro: String,
  categories: [
    {
      title: String,
      key: String,
    },
  ],
  tagline: [String],
  lastUpdated: Date,
});

const TermsLanding =
  mongoose.models.TermsLanding || mongoose.model("TermsLanding", TermsLandingSchema);

export async function GET() {
  await connectToDatabase();

  const data = await TermsLanding.findOne();

  if (!data) {
    return new Response(
      JSON.stringify({
        title: "Terms & Conditions",
        intro: "At Sahoolat, we are committed to providing a safe, reliable, and user-friendly platform...",
        categories: [
          { title: "Terms of Use", key: "general" },
          { title: "User Terms", key: "users" },
          { title: "Service Provider Terms", key: "providers" },
          { title: "AI Voice Terms", key: "ai" },
        ],
        tagline: ["Clarity.", "Trust.", "Sahoolat."],
        lastUpdated: new Date().toISOString(),
      }),
      { status: 200 }
    );
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(req) {
  await connectToDatabase();
  const body = await req.json();
  const { title, intro, categories, tagline, key } = body;

  const SECRET_KEY = process.env.TERMS_UPDATE_KEY;
  if (key !== SECRET_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized: Invalid key." }), { status: 401 });
  }

  const updated = await TermsLanding.findOneAndUpdate(
    {},
    {
      title,
      intro,
      categories,
      tagline,
      lastUpdated: new Date(),
    },
    { upsert: true, new: true }
  );

  return new Response(JSON.stringify({ message: "Landing content updated successfully", updated }), {
    status: 200,
  });
}