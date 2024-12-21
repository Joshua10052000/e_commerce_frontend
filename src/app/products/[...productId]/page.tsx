import { useProduct } from "@/features/products/hooks/use-product";
import { useReviews } from "@/features/reviews/hooks/use-reviews";
import { useParams } from "react-router";
import { Separator } from "@/components/ui/separator";
import { ReviewCard } from "@/features/reviews/components/review-card";
import { ReviewAverageCard } from "@/features/reviews/components/review-average-card";
import {
  ProductDetails,
  ProductDetailsSkeleton,
} from "@/features/products/components/product-details";

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    throw new Error("Product id not defined");
  }
  const product = useProduct(productId);
  const reviews = useReviews({ productId });

  if (product.isPending) {
    return <ProductDetailsSkeleton />;
  }

  if (product.isError) {
    return <div>Uh-oh, something went wrong!</div>;
  }

  return (
    <div className="container mx-auto space-y-6">
      <ProductDetails product={product.data.product} />
      <Separator />
      <div className="grid grid-cols-6 gap-6">
        <ReviewAverageCard
          className="col-span-2 max-h-max"
          productId={product.data.product.id}
        />
        <div className="col-span-4 space-y-6">
          {reviews.data?.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
