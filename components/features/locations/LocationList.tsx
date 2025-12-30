import { LocationCard, type LocationSummary } from './LocationCard';

export function LocationList({
  locations,
  emptyMessage,
}: {
  locations: LocationSummary[];
  emptyMessage: string;
}) {
  if (locations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] py-16 text-center text-[var(--muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
