import type { Language } from './translations';
import translations from '@/lib/data/character-translations.json';

type CharacterMap = Record<string, { ru?: string; kk?: string; en?: string }>;

const characterMap = translations as CharacterMap;

export function translateCharacterName(name: string, lang: Language) {
  if (lang === 'en') return name;
  const entry = characterMap[name];
  if (!entry) return name;
  return entry[lang] || entry.ru || entry.kk || name;
}
