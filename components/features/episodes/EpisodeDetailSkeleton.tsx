import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function EpisodeDetailSkeleton() {
  return (
    <Card className="flex flex-col gap-6 p-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-2/3" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-28 w-full" />
    </Card>
  );
}
