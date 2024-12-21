import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useReviews } from "../hooks/use-reviews";
import { getAverageStars } from "../lib/utils";
import { ReviewStars } from "./review-stars";
import { StarIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ReviewAverageCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card> & { productId: string }
>(({ className, productId, ...props }, ref) => {
  const reviews = useReviews({ productId });
  const allReviews = reviews.data ? reviews.data.reviews : [];
  const averageStars = getAverageStars(allReviews);
  const starsBreakdown = allReviews.reduce<Record<number, number>>(
    (acc, review) => {
      acc[review.stars] = (acc[review.stars] || 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <Card className={cn(className)} ref={ref} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between tracking-tight">
          <span className="text-2xl">Customer Reviews</span>
          <span className="text-3xl font-bold">{averageStars.toFixed(1)}</span>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <ReviewStars stars={averageStars} />
          <span className="font-bold">{allReviews.length} reviews</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <div className="inline-flex gap-1">
                <StarIcon className="size-4" />
                <span className="text-xs">{star}</span>
              </div>
              <Progress
                value={(starsBreakdown[star] / allReviews.length) * 100}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

export { ReviewAverageCard };
