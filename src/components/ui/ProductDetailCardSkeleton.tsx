import { Skeleton } from "./skeleton";

const ProductDetailCardSkeleton = () => {
  return (
    <div className="ProductDetailCardContainer">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <Skeleton className="h-64 w-full" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="md:py-8 space-y-4">
            {/* Title Skeleton */}
            <Skeleton className="h-8 w-3/4" />

            {/* Price Skeleton */}
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/2" />

            {/* Stock Info Skeleton */}
            <Skeleton className="h-5 w-1/4" />

            {/* Shipping Info Skeleton */}
            <Skeleton className="h-5 w-1/2" />

            {/* Buttons Skeleton */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Description Skeleton */}
            <div>
              <Skeleton className="h-5 w-1/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCardSkeleton;
