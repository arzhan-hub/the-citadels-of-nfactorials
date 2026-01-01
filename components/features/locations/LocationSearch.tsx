'use client';

import { Input } from '@/components/ui/Input';
import { useI18n } from '@/lib/i18n/I18nProvider';

export function LocationSearch({
  name,
  type,
  dimension,
  onNameChange,
  onTypeChange,
  onDimensionChange,
}: {
  name: string;
  type: string;
  dimension: string;
  onNameChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onDimensionChange: (value: string) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      <Input
        label={t('locations.searchName')}
        placeholder={t('locations.searchNamePlaceholder')}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Input
        label={t('locations.searchType')}
        placeholder={t('locations.searchTypePlaceholder')}
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
      />
      <Input
        label={t('locations.searchDimension')}
        placeholder={t('locations.searchDimensionPlaceholder')}
        value={dimension}
        onChange={(e) => onDimensionChange(e.target.value)}
      />
    </div>
  );
}
