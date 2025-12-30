import { EpisodeCard, type EpisodeSummary } from './EpisodeCard';

export function EpisodeList({ episodes, emptyMessage }: { episodes: EpisodeSummary[]; emptyMessage: string }) {
  if (episodes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] py-16 text-center text-[var(--muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}
