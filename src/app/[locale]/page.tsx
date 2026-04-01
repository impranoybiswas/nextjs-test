"use client";

import GroqChatbot from "@/components/groq/GroqChatBot";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ColorToggle from "@/components/settings/ColorToggle";
import FontToggle from "@/components/settings/FontToggle";
import { ThemeToggle } from "@/components/settings/ThemeToggle";
import LanguageToggle from "@/components/settings/LanguageToggle";
import SendMailForm from "@/components/SendMailForm";

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

      <Card>
        <CardTitle className="text-2xl font-bold">Send Test Email</CardTitle>
        <CardContent>
          <p>
            This will send a welcome email to the provided email address using
            our API route.
          </p>
          <div className="mt-4">
            <SendMailForm />
          </div>
        </CardContent>

      </Card>

      <GroqChatbot />
      <LanguageToggle />
      <ThemeToggle />
      <ColorToggle />
      <FontToggle />
    </main>
  );
}
