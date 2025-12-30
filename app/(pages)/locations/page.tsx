'use client';

import { useEffect, useState } from 'react';
import { LocationList } from '@/components/features/locations/LocationList';
import { LocationSearch } from '@/components/features/locations/LocationSearch';
import { LocationCardSkeleton } from '@/components/features/locations/LocationCardSkeleton';
import { Button } from '@/components/ui/Button';
import { useLocations } from '@/lib/hooks/useLocations';

export default function LocationsPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');
  const [page, setPage] = useState(1);
  const { locations, totalPages, loading } = useLocations(name, type, dimension, page);

  useEffect(() => {
    setPage(1);
  }, [name, type, dimension]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Map</p>
        <h1 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Locations</h1>
        <p className="max-w-2xl text-base text-[var(--muted)]">
          Filter locations by name, type, or dimension. Explore everything from Earths to pocket realms.
        </p>
      </section>

      <section className="flex flex-col gap-8">
        <LocationSearch
          name={name}
          type={type}
          dimension={dimension}
          onNameChange={setName}
          onTypeChange={setType}
          onDimensionChange={setDimension}
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LocationCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <LocationList
            locations={locations}
            emptyMessage={`No locations found for "${name || type || dimension || 'all'}".`}
          />
        )}

        {locations.length > 0 ? (
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
