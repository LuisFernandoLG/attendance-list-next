import { Skeleton } from "../ui/skeleton"

export const MembersTableSkeleton = () => {

  return <>
  <div className="space-y-0.5 min-h-[60vh] rounded-sm">
   
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    </div>
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    </div>
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    </div>
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    </div>
    <div className="flex gap-2 p-2">
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    <Skeleton className="h-14 bg-slate-200 w-32 flex-grow rounded-none" />
    </div>
  
  </div>

{/* pagination */}
<div className="flex justify-center gap-2">
<Skeleton className="h-14 bg-slate-200 w-1/6  rounded-none" />
</div>

  </>
}