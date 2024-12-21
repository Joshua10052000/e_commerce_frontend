import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MinusCircleIcon, PlusCircleIcon, ShoppingBagIcon } from "lucide-react";
import { formatCents } from "../lib/utils";
import { Product } from "../types";
import { useAddToCart } from "@/features/cart/hooks/use-add-cartitem";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetails = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { product: Product }
>(({ className, product, ...props }, ref) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);
  const addCartitem = useAddToCart();

  return (
    <div
      className={cn("grid grid-cols-2 gap-6", className)}
      ref={ref}
      {...props}
    >
      <div className="mx-auto space-y-2">
        <Carousel
          setApi={(api) => {
            if (!api) return;

            api.scrollTo(selectedImage);
            api.on("select", (e) => {
              setSelectedImage(e.selectedScrollSnap());
            });
          }}
        >
          <CarouselContent>
            {product.images.map((image, i) => (
              <CarouselItem key={`${image}-${i}`}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-[500px]">
                      <img
                        src="/placeholder.svg"
                        className="h-full max-h-full w-full max-w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          setApi={(api) => {
            if (!api) return;

            api.scrollTo(selectedImage);
          }}
          opts={{ dragFree: true, containScroll: "keepSnaps", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {product.images.map((image, i) => (
              <CarouselItem
                key={`${image}-${i}`}
                className="cursor-pointer pl-3 md:basis-1/3 lg:basis-1/4"
                onClick={() => {
                  setSelectedImage(i);
                }}
              >
                <Card
                  className={cn(
                    "overflow-hidden",
                    i === selectedImage ? "border-primary" : "",
                  )}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <div>
                      <img
                        src="/placeholder.svg"
                        className="h-full max-h-full w-full max-w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{product.name}</h3>
          <p
            className="text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        </div>
        <div className="space-y-6">
          <p className="text-2xl font-bold">
            ${formatCents(product.priceCents)}
          </p>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="border-collapse"
              onClick={() => {
                if (selectedQuantity <= 1) return;

                setSelectedQuantity((quantity) => quantity - 1);
              }}
            >
              <MinusCircleIcon />
            </Button>
            <Input
              type="number"
              min={1}
              value={selectedQuantity}
              onChange={(e) => {
                const targetValue = parseInt(e.target.value);

                if (isNaN(targetValue)) return;

                setSelectedQuantity(targetValue);
              }}
              className="w-auto max-w-10 px-1 text-center [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setSelectedQuantity((quantity) => quantity + 1);
              }}
            >
              <PlusCircleIcon />
            </Button>
            <Button
              disabled={addCartitem.isPending}
              size="sm"
              onClick={() => {
                addCartitem.mutate({
                  productId: product.id,
                  quantity: selectedQuantity,
                });
              }}
            >
              <ShoppingBagIcon />
              <span>Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

const ProductDetailsSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div className={`grid grid-cols-2 gap-6 ${className}`} ref={ref} {...props}>
      <div className="mx-auto space-y-2">
        <div className="h-[500px] w-full">
          <Skeleton className="h-full max-h-full w-full" />
        </div>
        <div className="flex w-full space-x-2 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 w-24">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <Skeleton className="mb-2 h-8 w-3/4" />
          <Skeleton className="mb-4 h-6 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-12 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
});

export { ProductDetails, ProductDetailsSkeleton };
