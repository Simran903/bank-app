import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-md font-bold transition-colors hover:text-gray-500"
      >
        Overview
      </Link>
      <Link
        href="/transferfunds"
        className="text-md font-bold text-muted-foreground transition-colors hover:text-gray-500"
      >
        Transfer Funds
      </Link>
    </nav>
  )
}