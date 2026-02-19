import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, subject, text } = await req.json();

  if(!name || !email || !text || !subject) {
    return new NextResponse(JSON.stringify({ success: false }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // Gmail App Password (not real password)
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER, subject, text,
    // subject: `New Message from ${name}`,
    // text: `PORTFOLIO MESSAGE\nName: ${name}\nEmail: ${email}\n\n${message}`,
    replyTo: email, // So replies go to sender
  };

  try {
    await transporter.sendMail(mailOptions);
    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return new NextResponse(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}