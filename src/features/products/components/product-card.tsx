import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBagIcon, StarIcon } from "lucide-react";

import { Product } from "@/features/products/types";
import { formatCents } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { useReviews } from "@/features/reviews/hooks/use-reviews";
import { getAverageStars } from "@/features/reviews/lib/utils";
import { useAddToCart } from "@/features/cart/hooks/use-add-cartitem";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  product: Product;
}

const ProductCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  ProductCardProps
>(({ className, product, ...props }, ref) => {
  const reviews = useReviews({ productId: product.id });
  const addToCart = useAddToCart();
  const averageStars = getAverageStars(reviews.data?.reviews || []);

  return (
    <Card
      className={cn("flex flex-col overflow-hidden", className)}
      ref={ref}
      {...props}
    >
      <CardContent className="flex-1 p-0">
        <div>
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="space-y-2 p-4">
          <h3 className="line-clamp-2 font-bold leading-4 tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <StarIcon className="size-4" />
              <span className="text-sm font-semibold">{averageStars}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviews.data?.reviews.length}){" "}
              {reviews.data && reviews.data.reviews.length <= 0
                ? "review"
                : "reviews"}
            </span>
          </div>
          <p className="line-clamp-4 text-sm tracking-tight">
            {product.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-between p-4 pt-0">
        <p className="font-bold">${formatCents(product.priceCents)}</p>
        <Button
          disabled={addToCart.isPending}
          onClick={() =>
            addToCart.mutate({ productId: product.id, quantity: 1 })
          }
          size="sm"
        >
          <ShoppingBagIcon />
          <span>Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
});

const ProductCardSkeleton = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, children, ...props }, ref) => {
  return (
    <Card
      className={cn("animate-pulse space-y-4", className)}
      ref={ref}
      {...props}
    >
      <Skeleton className="h-48 w-full rounded-lg"></Skeleton>
      <CardContent className="space-y-2 p-4">
        <Skeleton className="h-6 w-3/4 rounded"></Skeleton>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full"></Skeleton>
            <Skeleton className="h-4 w-12 rounded"></Skeleton>
          </div>
          <Skeleton className="h-4 w-16 rounded"></Skeleton>
        </div>
      </CardContent>
      <div className="space-y-2 p-4 pt-0">
        <Skeleton className="h-6 w-1/4 rounded"></Skeleton>
        <Skeleton className="h-10 w-32 rounded"></Skeleton>
      </div>
      {children}
    </Card>
  );
});

export { ProductCard, ProductCardSkeleton };
