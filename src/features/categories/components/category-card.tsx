import * as React from "react";
import { cn } from "@/lib/utils";

import { CreditCardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Category } from "@/features/categories/types";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card> & {
    category: Category;
  }
>(({ className, category, ...props }, ref) => {
  return (
    <Card
      className={cn("h-72 overflow-hidden shadow-2xl", className)}
      ref={ref}
      {...props}
    >
      <CardContent className="relative h-full p-0">
        <img
          src={category.image}
          className="absolute z-0 h-full w-full object-cover"
        />
        <div className="d relative z-10 flex h-full flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg font-bold capitalize tracking-tight text-muted-foreground">
              {category.name
                .split("_")
                .map((word) => word.replace("and", "&"))
                .join(" ")}
            </CardTitle>
            <CardDescription className="line-clamp-3 overflow-ellipsis leading-5 tracking-tighter text-primary-foreground">
              {category.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="overflow-hidden border-t border-border/50 bg-primary-foreground/30 p-4 backdrop-blur backdrop-saturate-150">
            <Button className="rounded-full shadow-lg" asChild>
              <Link to={`/products?category-name=${category.name}`}>
                <span>Browse</span>
                <CreditCardIcon />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
});

const CategoryCardSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("h-72 overflow-hidden shadow-2xl", className)}
      {...props}
      ref={ref}
    >
      <div className="relative h-full p-0">
        {/* Image Skeleton */}
        <Skeleton className="absolute z-0 h-full w-full" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="space-y-3 p-4">
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-3/4" />
            {/* Description Skeleton */}
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Footer Skeleton */}
          <div className="overflow-hidden border-t border-border/50 bg-primary-foreground/30 p-4 backdrop-blur backdrop-saturate-150">
            <Skeleton className="h-8 w-1/3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
});

export { CategoryCard, CategoryCardSkeleton };
