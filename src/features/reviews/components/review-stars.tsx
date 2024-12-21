import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import * as React from "react";

const ReviewStars = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { count?: number; stars: number }
>(({ className, count = 5, stars, ...props }, ref) => {
  const starsArray = Array.from({ length: count });

  return (
    <div className={cn("flex", className)} ref={ref} {...props}>
      {starsArray.map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${
            i + 1 <= stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
});

export { ReviewStars };
