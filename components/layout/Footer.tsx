export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-[var(--muted)]">
        <span>Powered by the Rick and Morty API.</span>
        <span>Citadel Explorer demo project.</span>
      </div>
    </footer>
  );
}
