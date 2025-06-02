import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

const UserGuidelinesSchema = new mongoose.Schema({
  title: String,
  content: String,
  lastUpdated: Date,
});

const UserGuidelines =
  mongoose.models.UserGuidelines || mongoose.model('UserGuidelines', UserGuidelinesSchema);

const AUTH_KEY = process.env.TERMS_UPDATE_KEY ;

export async function GET() {
  try {
    await connectToDatabase();
    const doc = await UserGuidelines.findOne();
    if (!doc) return NextResponse.json({ message: 'No user guidelines found' }, { status: 404 });

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

    const result = await UserGuidelines.findOneAndUpdate(
      {},
      { title, content, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: 'User guidelines updated', result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
