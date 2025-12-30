import { CharacterCard, type CharacterSummary } from './CharacterCard';

export function CharacterList({ characters, emptyMessage }: { characters: CharacterSummary[]; emptyMessage: string }) {
  if (characters.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] py-16 text-center text-[var(--muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
