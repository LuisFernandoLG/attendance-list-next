import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-700", className)}
      {...props}
    />
  )
}

export { Skeleton }
