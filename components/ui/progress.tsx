import * as React from "react"

interface ProgressProps {
  value?: number
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = "", value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-purple-500 transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(-${100 - Math.min(100, Math.max(0, value))}%)` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }