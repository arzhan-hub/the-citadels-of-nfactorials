import { Input } from '@/components/ui/Input';

export function CharacterSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <Input
        placeholder="Search characters..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
