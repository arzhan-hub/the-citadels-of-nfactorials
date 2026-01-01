'use client';

import { Card } from '@/components/ui/Card';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { translateCharacterName } from '@/lib/i18n/characterTranslations';

export interface CharacterDetailData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
}

export function CharacterDetail({ character }: { character: CharacterDetailData }) {
  const { t, lang } = useI18n();
  const displayName = translateCharacterName(character.name, lang);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-80 w-full md:h-auto md:w-1/2">
          <img src={character.image} alt={character.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
          <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">{displayName}</h1>
            <div className="mt-3 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  character.status === 'Alive'
                    ? 'bg-green-500 text-black'
                    : character.status === 'Dead'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {character.status}
              </span>
              <span className="text-sm text-[var(--muted)]">{character.species}</span>
            </div>
          </div>

          <div className="grid gap-4 text-sm text-[var(--muted)]">
            <div>
              <p className="text-xs uppercase text-[var(--muted-2)]">{t('character.gender')}</p>
              <p className="text-base text-[var(--foreground)]">{character.gender}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-[var(--muted-2)]">{t('character.origin')}</p>
              <p className="text-base text-[var(--foreground)]">{character.origin.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-[var(--muted-2)]">{t('character.lastLocation')}</p>
              <p className="text-base text-[var(--accent)]">{character.location.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-[var(--muted-2)]">{t('character.episodes')}</p>
              <p className="text-base text-[var(--foreground)]">
                {character.episode.length} {t('character.episodes')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
