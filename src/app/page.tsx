import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsTablet } from "@/hooks/use-tablet";
import AutoPlay from "embla-carousel-autoplay";

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
];

const Homepage = () => {
  const isTablet = useIsTablet();

  return (
    <article className="container mx-auto space-y-6 pt-4">
      <section>
        <Carousel
          plugins={[
            AutoPlay({ playOnInit: true, delay: 3000, stopOnMouseEnter: true }),
          ]}
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.name}>
                <div className="relative mx-auto aspect-video w-full border p-0 before:absolute before:inset-x-0 before:bottom-0 before:z-10 before:aspect-video before:w-full before:bg-gradient-to-t before:from-primary/75 before:to-transparent">
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {!isTablet && (
            <>
              <CarouselNext />
              <CarouselPrevious />
            </>
          )}
        </Carousel>
      </section>
      <section>
        <div className="grid grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle></CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>
    </article>
  );
};

export default Homepage;
