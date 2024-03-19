import { Skeleton } from "../ui/skeleton";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function AttendanceTableSkeleton() {
  return (
    <article
      className="p-5 grid"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr)" }}
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
    </article>
  );
}
