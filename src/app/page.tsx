import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import { useCategories } from "@/features/categories/hooks/use-categories";
import {
  CategoryCard,
  CategoryCardSkeleton,
} from "@/features/categories/components/category-card";
import { cn } from "@/lib/utils";

interface Banner {
  name: string;
  image: string;
}

const banners: Banner[] = [
  {
    name: "Electronics",
    image: "/placeholder.svg",
  },
  {
    name: "Clothing",
    image: "/placeholder.svg",
  },
  {
    name: "Home & Garden",
    image: "/placeholder.svg",
  },
  {
    name: "Sports",
    image: "/placeholder.svg",
  },
  {
    name: "Books",
    image: "/placeholder.svg",
  },
];

const Homepage = () => {
  const categories = useCategories();

  return (
    <article className="container mx-auto space-y-6">
      <section>
        <Carousel
          plugins={[AutoPlay({ playOnInit: true, delay: 3000 })]}
          className="select-none"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.name}>
                <Card className="relative mx-auto aspect-video w-full overflow-hidden border p-0 before:absolute before:inset-x-0 before:bottom-0 before:z-10 before:aspect-video before:w-full before:bg-gradient-to-t before:from-primary/75 before:to-transparent">
                  <img
                    src="/placeholder.svg"
                    className="h-full max-h-full w-full max-w-full object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 z-10 space-y-2 p-4 text-primary-foreground md:p-6">
                    <div>
                      <h3 className="text-lg font-semibold leading-6 tracking-tight">
                        Unwrap the Best Deals of the Season!
                      </h3>
                      <p className="line-clamp-2 text-balance text-xs text-muted sm:text-sm">
                        Discover exclusive offers, new arrivals, and unbeatable
                        prices on everything you love. Shop our wide range of
                        products from fashion to electronics, all with free
                        shipping and easy returns. Don't miss out - limited-time
                        discounts are waiting for you!
                      </p>
                    </div>
                    <Button className="hidden md:inline-flex">Shop Now</Button>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Browse by categories</h2>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {categories.isPending
            ? Array.from({ length: 5 }, (_, i) => (
                <CategoryCardSkeleton
                  className={cn(
                    i === 3
                      ? "col-span-3"
                      : i === 4
                        ? "col-span-3"
                        : "col-span-2",
                  )}
                  key={i}
                />
              ))
            : categories.data?.categories.slice(0, 7).map((category, index) => {
                return (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    className={
                      index === 3
                        ? "col-span-6 sm:col-span-4"
                        : index === 4
                          ? "col-span-6 sm:col-span-2"
                          : index === 5
                            ? "col-span-6 sm:col-span-3"
                            : index === 6
                              ? "col-span-6 sm:col-span-3"
                              : "col-span-6 sm:col-span-2"
                    }
                  />
                );
              })}
        </div>
      </section>
    </article>
  );
};

export default Homepage;
