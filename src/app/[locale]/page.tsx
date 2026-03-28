"use client";

import { FontModal } from "@/components/font-modal";
import GroqChatbot from "@/components/groq-ai/groq-chat-bot";
import LanguageToggle from "@/components/language-toggle";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations('home');
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
       <h1 className="text-3xl font-bold mt-4">{t('title')}</h1>
      <p>{t('description')}</p>
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
        <LanguageToggle />
        <FontModal />
      </div>
    </main>
  );
}
