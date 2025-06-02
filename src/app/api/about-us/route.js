import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  missionTitle: String,
  missionDescription: String,
  workflowTitle: String,
  workflowSteps: [
    {
      icon: String,
      title: String,
      description: String,
    },
  ],
  tagline: [String],
});

const About = mongoose.models.About || mongoose.model("About", AboutSchema);

export async function GET() {
  await connectToDatabase();

  const about = await About.findOne();

  if (!about) {
    return new Response(JSON.stringify({
      missionTitle: "Our Mission",
      missionDescription: "At Sahoolat AI, we leverage the power of AI-driven voice search and intuitive workflows. We’re committed to making everyday tasks simpler, faster, and more reliable so everyone can focus on what truly matters.",
      workflowTitle: "How Sahoolat AI Works",
      workflowSteps: [
        {
          icon: "FaMicrophoneAlt",
          title: "Say It",
          description: "Use our voice or text input to let us know what service or solution you need. Seamless, hands-free, and quick."
        },
        {
          icon: "FaSearch",
          title: "We Find It",
          description: "Our AI instantly searches and recommends the best service providers or professionals based on your request."
        },
        {
          icon: "FaHandshake",
          title: "Connect & Discuss",
          description: "Compare providers, chat or call directly, and negotiate terms. You’re always in control of the final decision."
        },
        {
          icon: "FaCheckCircle",
          title: "Get It Done",
          description: "Hire the right person or team, schedule your job, and relax as Sahoolat AI ensures a hassle-free experience from start to finish."
        }
      ],
      tagline: ["Say It.", "Find it.", "Get it done!"],
      lastUpdated: new Date().toISOString()
    }), { status: 200 });
  }

  return new Response(JSON.stringify(about), { status: 200 });
}

export async function PUT(req) {
  await connectToDatabase();
  const body = await req.json();
  const { missionTitle, missionDescription, workflowTitle, workflowSteps, tagline, key } = body;

  const SECRET_KEY = process.env.TERMS_UPDATE_KEY;
  if (key !== SECRET_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized: Invalid key." }), { status: 401 });
  }

  const updated = await About.findOneAndUpdate(
    {},
    {
      missionTitle,
      missionDescription,
      workflowTitle,
      workflowSteps,
      tagline,
      lastUpdated: new Date(),
    },
    { upsert: true, new: true }
  );

  return new Response(JSON.stringify({ message: "About Us content updated successfully", updated }), { status: 200 });
}