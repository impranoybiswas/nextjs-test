"use client";

import GroqChatbot from "@/components/groq-ai/groq-chat-bot";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold text-primary">
        NextJS App with Better Auth
      </h1>
      <div className="flex gap-4">
        <Link href="/sign-in" className="btn-primary">
          Sign In
        </Link>
        <Link href="/sign-up" className="btn-primary">
          Sign Up
        </Link>
        <GroqChatbot/>
      </div>
    </main>
  );
}
