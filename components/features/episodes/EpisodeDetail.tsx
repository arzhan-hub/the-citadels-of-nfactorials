'use client';

import { Card } from '@/components/ui/Card';
import { useI18n } from '@/lib/i18n/I18nProvider';

export interface EpisodeDetailData {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
  characters: string[];
}

export function EpisodeDetail({
  episode,
  description,
  source,
}: {
  episode: EpisodeDetailData;
  description?: string;
  source?: string;
}) {
  const { t } = useI18n();

  return (
    <Card className="flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">{episode.episode}</p>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">{episode.name}</h1>
      </div>
      <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
        <p>
          {t('episode.airDate')}: {episode.air_date}
        </p>
        <p>
          {t('episode.characters')}: {episode.characters.length}
        </p>
        <p>
          {t('episode.id')}: {episode.id}
        </p>
      </div>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--foreground)]">
        {description || t('episode.descriptionMissing')}
      </div>
      {source ? (
        <a
          href={source}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-[var(--accent)]"
        >
          {t('episode.source')}
        </a>
      ) : null}
    </Card>
  );
}
