import Link from 'next/link';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const navItems = [
  { href: '/', label: 'Characters' },
  { href: '/episodes', label: 'Episodes' },
  { href: '/locations', label: 'Locations' },
];

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6">
        <Link href="/" className="text-lg font-bold tracking-wide text-[var(--foreground)]">
          Citadel Explorer
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-[var(--muted)]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
