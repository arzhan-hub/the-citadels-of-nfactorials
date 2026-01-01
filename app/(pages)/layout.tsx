import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { PortalCursor } from '@/components/ui/PortalCursor';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
        <PortalCursor />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </I18nProvider>
  );
}
