import { Skeleton } from "../ui/skeleton";

// generate automatically an array of 12 elements
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function DashboardEventListSkeleton(){
  return <div
  className="grid mt-5 g"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "1rem",
      }}
  >

    {items.map((item, index) => (
      <Skeleton key={index} className="border p-5 m-2 rounded-md flex gap-2">
        <div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div>
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
      </Skeleton>
    ))}


  </div>
}