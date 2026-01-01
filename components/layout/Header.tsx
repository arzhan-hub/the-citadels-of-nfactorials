'use client';

import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageToggle } from '@/components/layout/LanguageToggle';
import { CursorToggle } from '@/components/layout/CursorToggle';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { PortalLink } from '@/components/ui/PortalLink';

const navItems = [
  { href: '/', labelKey: 'nav.characters' },
  { href: '/episodes', labelKey: 'nav.episodes' },
  { href: '/locations', labelKey: 'nav.locations' },
  { href: '/truth-tortoise-ai', labelKey: 'nav.truthTortoise' },
];

export function Header() {
  const { t } = useI18n();

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6">
        <PortalLink
          href="/"
          data-portal-pulse="true"
          className="flex items-center gap-4 text-xl font-bold tracking-wide text-[var(--foreground)]"
        >
          <img src="/citadel.svg" alt="Citadel logo" className="h-20 w-20 object-contain" />
          <span className="flex flex-col leading-[1.1]">
            <span className="text-base uppercase tracking-[0.2em] text-[var(--muted)]">
              {t('brand.citadelOf')}
            </span>
            <span className="text-2xl">{t('brand.nFactorials')}</span>
          </span>
        </PortalLink>
        <nav className="flex flex-wrap items-center gap-5 text-base font-semibold text-[var(--muted)]">
          {navItems.map((item) => {
            const label = t(item.labelKey);
            const isTortoise = item.labelKey === 'nav.truthTortoise';
            return (
              <PortalLink
                key={item.href}
                href={item.href}
                data-portal-pulse="true"
                className={`transition-colors hover:text-[var(--foreground)] ${
                  isTortoise ? 'text-[var(--accent)]' : ''
                }`}
              >
                {label}
              </PortalLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <CursorToggle />
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
