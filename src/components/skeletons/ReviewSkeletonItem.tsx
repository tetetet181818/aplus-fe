export default function ReviewSkeletonItem() {
  return (
    <div className="flex animate-pulse gap-4 py-4">
      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-2 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  )
}
