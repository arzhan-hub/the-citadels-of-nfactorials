import { Input } from '@/components/ui/Input';

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
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Input label="Episode name" placeholder="Pickle Rick" value={name} onChange={(e) => onNameChange(e.target.value)} />
      <Input
        label="Episode code"
        placeholder="S03E03"
        value={episodeCode}
        onChange={(e) => onEpisodeChange(e.target.value)}
      />
    </div>
  );
}
