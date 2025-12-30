'use client';

import { useEffect, useState } from 'react';
import type { LocationSummary } from '@/components/features/locations/LocationCard';

interface ApiResponse {
  results: LocationSummary[];
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export function useLocations(name: string, type: string, dimension: string, page: number) {
  const [locations, setLocations] = useState<LocationSummary[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page) });
        if (name) params.set('name', name);
        if (type) params.set('type', type);
        if (dimension) params.set('dimension', dimension);

        const res = await fetch(`/api/locations?${params}`);
        const data: ApiResponse = await res.json();

        if (!isMounted) return;
        setLocations(data.results || []);
        setTotalPages(data.info?.pages || 1);
      } catch (error) {
        if (!isMounted) return;
        setLocations([]);
        setTotalPages(1);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const debounce = setTimeout(fetchLocations, 400);
    return () => {
      isMounted = false;
      clearTimeout(debounce);
    };
  }, [name, type, dimension, page]);

  return { locations, totalPages, loading };
}
