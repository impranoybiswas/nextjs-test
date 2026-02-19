import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function OPTIONS() {
  return NextResponse.json(
    {
      success: true,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const { email, subject, text } = await req.json();

  if (!email || !text || !subject) {
    return new NextResponse(JSON.stringify({ success: false }), {
      status: 400,
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER,
    subject,
    text,

    replyTo: email,
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
