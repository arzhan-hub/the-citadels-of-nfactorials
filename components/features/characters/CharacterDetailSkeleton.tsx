import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function CharacterDetailSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="h-80 w-full md:h-auto md:w-1/2" />
        <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="grid gap-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    </Card>
  );
}
