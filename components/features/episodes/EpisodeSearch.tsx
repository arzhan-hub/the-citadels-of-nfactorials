'use client';

import { Input } from '@/components/ui/Input';
import { useI18n } from '@/lib/i18n/I18nProvider';

export function EpisodeSearch({
  name,
  episodeCode,
  onNameChange,
  onEpisodeChange,
}: {
  name: string;
  episodeCode: string;
  onNameChange: (value: string) => void;
  onEpisodeChange: (value: string) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Input
        label={t('episodes.searchName')}
        placeholder={t('episodes.searchNamePlaceholder')}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Input
        label={t('episodes.searchCode')}
        placeholder={t('episodes.searchCodePlaceholder')}
        value={episodeCode}
        onChange={(e) => onEpisodeChange(e.target.value)}
      />
    </div>
  );
}
