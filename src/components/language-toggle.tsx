// src/components/LanguageToggle.tsx
'use client';

import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'bn' : 'en';

    // pathname থেকে current locale replace করে নতুন locale দিয়ে navigate করো
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="px-4 py-2 rounded-full border border-gray-300 font-medium transition hover:bg-gray-100 disabled:opacity-50 flex items-center gap-2"
    >
      <Languages scale={12}/> {locale === 'en' ? 'বাংলা' : ' English'}
    </button>
  );
}