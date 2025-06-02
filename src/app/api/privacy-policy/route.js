import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

const PrivacyPolicySchema = new mongoose.Schema({
  title: String,
  content: String,
  lastUpdated: Date,
});

const PrivacyPolicy =
  mongoose.models.PrivacyPolicy || mongoose.model('PrivacyPolicy', PrivacyPolicySchema);

const AUTH_KEY = process.env.TERMS_UPDATE_KEY ;

export async function GET() {
  try {
    await connectToDatabase();
    const doc = await PrivacyPolicy.findOne();
    if (!doc) return NextResponse.json({ message: 'No privacy policy found' }, { status: 404 });

    return NextResponse.json(doc);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { key, title, content } = body;

    if (key !== AUTH_KEY) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const result = await PrivacyPolicy.findOneAndUpdate(
      {},
      { title, content, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: 'Privacy policy updated', result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
