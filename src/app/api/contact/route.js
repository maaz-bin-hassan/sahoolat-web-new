import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export async function POST(request) {
  try {
    const { email, phone } = await request.json()

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Either email or phone is required' },
        { status: 400 }
      )
    }

    const toList = (process.env.CONTACT_RECIPIENTS || '')
      .split(',')
      .map(addr => addr.trim())
      .filter(Boolean)

    const message = email
      ? `New lead received:\nEmail: ${email}`
      : `New lead received:\nPhone: ${phone}`

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: toList,
      subject: 'New Lead Submission',
      text: message
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('🛑 Error sending lead email', err)
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 })
  }
}