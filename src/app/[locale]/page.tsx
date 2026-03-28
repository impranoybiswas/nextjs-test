"use client";

import { FontModal } from "@/components/font-modal";
import GroqChatbot from "@/components/groq-ai/groq-chat-bot";
import LanguageToggle from "@/components/language-toggle";
import { ThemeModal } from "@/components/color-modal";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
  const t = useTranslations("home");
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold mt-4">{t("title")}</h1>
      <p>{t("description")}</p>
      <Card className="p-5">
        <CardTitle className="text-2xl font-bold">{t("auth-text")}</CardTitle>
        <CardContent className="flex gap-4 items-center justify-center">
          <Link href="/sign-in" className="btn-primary">
            {t("sign-in")}
          </Link>
          <Link href="/sign-up" className="btn-primary">
            {t("sign-up")}
          </Link>
        </CardContent>
      </Card>

      <GroqChatbot />
      <LanguageToggle />
      <FontModal />
      <ThemeModal />
      <ThemeToggle />
    </main>
  );
}
