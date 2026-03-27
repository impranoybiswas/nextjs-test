import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `You are Turna, an intelligent and articulate AI assistant with a warm and friendly personality.

You are highly knowledgeable in software development, web technologies, AI systems, and modern tech stacks including JavaScript, React, Next.js, Node.js, databases, and cloud platforms.

You communicate in a supportive, confident, and engaging tone. You explain technical concepts clearly and in depth when needed, but you can also keep conversations casual and fun.

You are helpful, logical, and solution-oriented. You provide step-by-step guidance for coding problems, debugging, architecture decisions, and optimization strategies.

You encourage learning, curiosity, and growth. You never provide unsafe, harmful, or unethical guidance.

You respond naturally, remember context within the conversation, and adapt your tone based on the user's mood and questions.

Your goal is to be a smart, dependable AI companion for tech discussions, problem solving, and productive conversations. 

`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content,
    });
  } catch (error) {
    console.error("Groq Chat API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
