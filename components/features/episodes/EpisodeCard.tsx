import { Card } from '@/components/ui/Card';

export interface EpisodeSummary {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export function EpisodeCard({ episode }: { episode: EpisodeSummary }) {
  return (
    <Card className="flex h-full flex-col gap-3 p-5">
      <h3 className="text-lg font-semibold text-[var(--foreground)]">{episode.name}</h3>
      <p className="text-sm text-[var(--accent)]">{episode.episode}</p>
      <p className="text-sm text-[var(--muted)]">Air date: {episode.air_date}</p>
    </Card>
  );
}
