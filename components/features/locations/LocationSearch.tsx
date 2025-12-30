import { Input } from '@/components/ui/Input';

export function LocationSearch({
  name,
  type,
  dimension,
  onNameChange,
  onTypeChange,
  onDimensionChange,
}: {
  name: string;
  type: string;
  dimension: string;
  onNameChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onDimensionChange: (value: string) => void;
}) {
  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      <Input label="Location name" placeholder="Citadel of Ricks" value={name} onChange={(e) => onNameChange(e.target.value)} />
      <Input label="Type" placeholder="Space station" value={type} onChange={(e) => onTypeChange(e.target.value)} />
      <Input
        label="Dimension"
        placeholder="Dimension C-137"
        value={dimension}
        onChange={(e) => onDimensionChange(e.target.value)}
      />
    </div>
  );
}
