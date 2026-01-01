'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-[var(--muted)]">
        <span>{t('footer.powered')}</span>
        <span>{t('footer.project')}</span>
      </div>
    </footer>
  );
}
