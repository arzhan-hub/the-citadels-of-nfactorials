'use client';

import { Card } from '@/components/ui/Card';
import { PortalLink } from '@/components/ui/PortalLink';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { translateCharacterName } from '@/lib/i18n/characterTranslations';

export interface CharacterSummary {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: { name: string };
}

export function CharacterCard({ character }: { character: CharacterSummary }) {
  const { t, lang } = useI18n();
  const displayName = translateCharacterName(character.name, lang);

  return (
    <PortalLink href={`/characters/${character.id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
        <div className="relative h-56 w-full">
          <img src={character.image} alt={character.name} className="h-full w-full object-cover" />
          <div className="absolute right-2 top-2">
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
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)]">
            {displayName}
          </h3>
          <p className="text-sm font-medium text-[var(--accent)]">{character.species}</p>
          <p className="text-sm text-[var(--muted)]">
            {t('character.lastLocation')}: {character.location.name}
          </p>
        </div>
      </Card>
    </PortalLink>
  );
}
