import pk from './pk';
import en from './en';
import ur from './ur';
import type { TranslationKey } from './en';

export type Lang = 'pk' | 'en' | 'ur';

const translations = { pk, en, ur };

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return (translations[lang] as Record<string, string>)[key] ?? pk[key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const first = url.pathname.split('/').filter(Boolean)[0];
  if (first === 'ur') return 'ur';
  if (first === 'en') return 'en';
  return 'pk';
}

export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'ur') return `/ur${clean}`;
  if (lang === 'en') return `/en${clean}`;
  return clean;
}
