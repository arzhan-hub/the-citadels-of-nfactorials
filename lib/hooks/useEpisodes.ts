'use client';

import { useEffect, useState } from 'react';
import type { EpisodeSummary } from '@/components/features/episodes/EpisodeCard';

interface ApiResponse {
  results: EpisodeSummary[];
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export function useEpisodes(name: string, episodeCode: string, page: number) {
  const [episodes, setEpisodes] = useState<EpisodeSummary[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page) });
        if (name) params.set('name', name);
        if (episodeCode) params.set('episode', episodeCode);

        const res = await fetch(`/api/episodes?${params}`);
        const data: ApiResponse = await res.json();

        if (!isMounted) return;
        setEpisodes(data.results || []);
        setTotalPages(data.info?.pages || 1);
      } catch (error) {
        if (!isMounted) return;
        setEpisodes([]);
        setTotalPages(1);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const debounce = setTimeout(fetchEpisodes, 400);
    return () => {
      isMounted = false;
      clearTimeout(debounce);
    };
  }, [name, episodeCode, page]);

  return { episodes, totalPages, loading };
}
