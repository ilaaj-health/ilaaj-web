import en from './en';
import ur from './ur';
import type { TranslationKey } from './en';

export type Lang = 'en' | 'ur';

const translations = { en, ur };

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return (translations[lang] as Record<string, string>)[key] ?? en[key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const first = url.pathname.split('/').filter(Boolean)[0];
  return first === 'ur' ? 'ur' : 'en';
}

export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'ur' ? `/ur${clean}` : clean;
}
