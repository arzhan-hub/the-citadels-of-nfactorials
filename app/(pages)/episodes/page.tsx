'use client';

import { useEffect, useState } from 'react';
import { EpisodeList } from '@/components/features/episodes/EpisodeList';
import { EpisodeSearch } from '@/components/features/episodes/EpisodeSearch';
import { EpisodeCardSkeleton } from '@/components/features/episodes/EpisodeCardSkeleton';
import { Button } from '@/components/ui/Button';
import { useEpisodes } from '@/lib/hooks/useEpisodes';

export default function EpisodesPage() {
  const [name, setName] = useState('');
  const [episodeCode, setEpisodeCode] = useState('');
  const [page, setPage] = useState(1);
  const { episodes, totalPages, loading } = useEpisodes(name, episodeCode, page);

  useEffect(() => {
    setPage(1);
  }, [name, episodeCode]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Archive</p>
        <h1 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Episodes</h1>
        <p className="max-w-2xl text-base text-[var(--muted)]">
          Search episodes by name or code, then paginate through the multiverse timeline.
        </p>
      </section>

      <section className="flex flex-col gap-8">
        <EpisodeSearch
          name={name}
          episodeCode={episodeCode}
          onNameChange={setName}
          onEpisodeChange={setEpisodeCode}
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EpisodeCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <EpisodeList
            episodes={episodes}
            emptyMessage={`No episodes found for "${name || episodeCode || 'all'}".`}
          />
        )}

        {episodes.length > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button variant="ghost" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page === 1}>
              Previous
            </Button>
            <span className="text-sm text-[var(--muted)]">
              Page <span className="font-semibold text-[var(--foreground)]">{page}</span> of {totalPages}
            </span>
            <Button
              variant="ghost"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
