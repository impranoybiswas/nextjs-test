import { sendMail } from "@/lib/mailer";
import { welcomeTemplate, contactTemplate } from "@/lib/email-templates";
import { NextRequest } from "next/server";

// Supported email types
type EmailType = "welcome" | "contact";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body;

    if (!type) {
      return Response.json(
        { error: "Email type is required" },
        { status: 400 }
      );
    }

    switch (type as EmailType) {
      case "welcome": {
        const { name, email } = data;
        if (!name || !email) {
          return Response.json(
            { error: "name, email required" },
            { status: 400 }
          );
        }
        await sendMail({
          to: email,
          subject: "Welcome to Our App!",
          html: welcomeTemplate(name),
        });
        break;
      }

      case "contact": {
        const { name, email, message } = data;
        if (!name || !email || !message) {
          return Response.json(
            { error: "name, email, message required" },
            { status: 400 }
          );
        }
        await sendMail({
          to: process.env.EMAIL_USER!, // তোমার নিজের email এ আসবে
          subject: `New message from ${name}`,
          html: contactTemplate({ name, email, message }),
        });
        break;
      }

      default:
        return Response.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}