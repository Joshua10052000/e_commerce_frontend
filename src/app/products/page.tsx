import { Button } from "@/components/ui/button";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/features/products/components/product-card";
import { useProducts } from "@/features/products/hooks/use-products";
import { useSearchParams } from "react-router";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const products = useProducts(Object.fromEntries(searchParams.entries()));
  const allProducts = products.data
    ? products.data.pages.flatMap((d) => d.products)
    : [];

  if (products.isPending) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {Array.from({ length: 4 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.isError) {
    return (
      <div className="flex items-center justify-center pt-20">
        <div className="max-w-sm">
          <div className="overflow-hidden">
            <div className="p-0">
              <img src="/placeholder.svg" />
            </div>
            <div className="space-y-2 text-balance text-center">
              <h3 className="text-2xl font-bold text-destructive">
                500 - Internal Server Error
              </h3>
              <p className="text-destructive">
                The page is currently unavailable. Please try again later.
              </p>
            </div>
            <div>
              <Button
                disabled={products.isRefetching}
                onClick={() => products.refetch()}
                className="w-full"
                variant="destructive"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="grid place-items-center">
        {products.hasNextPage ? (
          <Button
            disabled={products.isFetching}
            variant="link"
            onClick={() => products.fetchNextPage()}
          >
            {products.isFetching ? "Loading..." : "See more..."}
          </Button>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            You've reached the bottom of this page.
          </p>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
