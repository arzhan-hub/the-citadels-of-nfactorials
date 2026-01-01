'use client';

import { Card } from '@/components/ui/Card';
import { useI18n } from '@/lib/i18n/I18nProvider';

export interface LocationSummary {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export function LocationCard({ location }: { location: LocationSummary }) {
  const { t } = useI18n();

  return (
    <Card className="flex h-full flex-col gap-3 p-5">
      <h3 className="text-lg font-semibold text-[var(--foreground)]">{location.name}</h3>
      <p className="text-sm text-[var(--accent)]">{location.type || t('locations.unknownType')}</p>
      <p className="text-sm text-[var(--muted)]">
        {t('locations.searchDimension')}: {location.dimension || t('locations.unknownDimension')}
      </p>
    </Card>
  );
}
