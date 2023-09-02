import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() { 
    return (
          <div className="mt-10 space-y-2">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
      )
  }