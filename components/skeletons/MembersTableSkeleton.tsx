import { Skeleton } from "../ui/skeleton"

export const MembersTableSkeleton = () => {

  return <>
  <div className="space-y-0.5 min-h-[60vh] rounded-sm">
   
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    </div>
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    </div>
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    </div>
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    </div>
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    <Skeleton className="h-14  w-32 flex-grow rounded-xl" />
    </div>
  
  </div>

{/* pagination */}
<div className="flex justify-center gap-2">
<Skeleton className="h-14  w-1/6  rounded-xl" />
</div>

  </>
}