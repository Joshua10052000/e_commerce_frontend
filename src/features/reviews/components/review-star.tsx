import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import * as React from "react";

const ReviewStar = React.forwardRef<
  React.ElementRef<typeof StarIcon>,
  React.ComponentPropsWithoutRef<typeof StarIcon> & {
    filled?: boolean | "indeterminate";
  }
>(({ className, filled, ...props }, ref) => {
  return (
    <StarIcon
      className={cn(
        "size-4 transition-colors",
        className,
        filled === true
          ? "fill-primary text-primary"
          : filled === "indeterminate"
            ? "text-primary"
            : "",
      )}
      ref={ref}
      {...props}
    />
  );
});

export { ReviewStar };
