'use client';

import { Card } from '@/components/ui/Card';
import { PortalLink } from '@/components/ui/PortalLink';
import { useI18n } from '@/lib/i18n/I18nProvider';

export interface EpisodeSummary {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
  characters: string[];
}

function formatDate(value: string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function EpisodeCard({ episode }: { episode: EpisodeSummary }) {
  const { t, lang } = useI18n();
  const locale = lang === 'kk' ? 'kk-KZ' : 'ru-RU';

  return (
    <PortalLink href={`/episodes/${episode.id}`} className="group block h-full">
      <Card className="flex h-full flex-col gap-3 p-5 transition-transform duration-300 group-hover:-translate-y-1">
        <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
          {episode.name}
        </h3>
        <p className="text-sm text-[var(--accent)]">{episode.episode}</p>
        <div className="space-y-1 text-sm text-[var(--muted)]">
          <p>
            {t('episode.airDate')}: {episode.air_date}
          </p>
          <p>
            {t('episode.created')}: {formatDate(episode.created, locale)}
          </p>
          <p>
            {t('episode.characters')}: {episode.characters.length}
          </p>
        </div>
      </Card>
    </PortalLink>
  );
}
