"use client"

import { cn } from "@workspace/ui/lib/utils"

export function AnimatedCheck({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 52 52"
      className={cn(
        "h-16 w-16",
        "checkmark",
        className
      )}
    >
      <circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        className="checkmark-circle"
      />
      <path
        fill="none"
        d="M14 27l7 7 16-16"
        className="checkmark-check"
      />
    </svg>
  )
}
