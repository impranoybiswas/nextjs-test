import { SessionProvider } from "@/app/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { FontProvider } from "@/contexts/font-context";
import { ColorProvider } from "@/contexts/color-context";
import { ThemeProvider } from "next-themes";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="app-theme"
        >
          <FontProvider>
            <ColorProvider>
              <Toaster />
              {children}
            </ColorProvider>
          </FontProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
