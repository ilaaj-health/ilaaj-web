import pk from './pk';
import en from './en';
import ur from './ur';
import type { TranslationKey } from './en';

export type Lang = 'pk' | 'en' | 'ur';

const translations = { pk, en, ur };

export function useTranslations(lang: Lang) {
  const dict = (translations[lang] ?? pk) as Record<string, string>;
  return function t(key: TranslationKey): string {
    return dict[key] ?? pk[key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const first = url.pathname.split('/').filter(Boolean)[0];
  if (first === 'ur') return 'ur';
  if (first === 'pk') return 'pk';
  return 'en';
}

export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'ur') return `/ur${clean}`;
  if (lang === 'pk') return `/pk${clean}`;
  return clean; // EN = root
}
