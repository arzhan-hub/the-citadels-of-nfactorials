import { Card } from '@/components/ui/Card';

export interface LocationSummary {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export function LocationCard({ location }: { location: LocationSummary }) {
  return (
    <Card className="flex h-full flex-col gap-3 p-5">
      <h3 className="text-lg font-semibold text-[var(--foreground)]">{location.name}</h3>
      <p className="text-sm text-[var(--accent)]">{location.type || 'Unknown type'}</p>
      <p className="text-sm text-[var(--muted)]">Dimension: {location.dimension || 'Unknown'}</p>
    </Card>
  );
}
