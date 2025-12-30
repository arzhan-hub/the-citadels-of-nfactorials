'use client';

import { useEffect, useState } from 'react';
import type { CharacterSummary } from '@/components/features/characters/CharacterCard';

interface ApiResponse {
  results: CharacterSummary[];
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export function useCharacters(name: string, page: number) {
  const [characters, setCharacters] = useState<CharacterSummary[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), name });
        const res = await fetch(`/api/characters?${params}`);
        const data: ApiResponse = await res.json();

        if (!isMounted) return;
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      } catch (error) {
        if (!isMounted) return;
        setCharacters([]);
        setTotalPages(1);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCharacters, 400);
    return () => {
      isMounted = false;
      clearTimeout(debounce);
    };
  }, [name, page]);

  return { characters, totalPages, loading };
}
