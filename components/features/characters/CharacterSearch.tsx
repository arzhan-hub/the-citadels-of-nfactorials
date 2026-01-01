'use client';

import { Input } from '@/components/ui/Input';
import { useI18n } from '@/lib/i18n/I18nProvider';

export function CharacterSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { t } = useI18n();

  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <Input
        placeholder={t('characters.searchPlaceholder')}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
