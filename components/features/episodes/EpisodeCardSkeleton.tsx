import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export function EpisodeCardSkeleton() {
  return (
    <Card className="flex flex-col gap-3 p-5">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
    </Card>
  );
}
