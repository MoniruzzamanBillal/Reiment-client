import { Skeleton } from "./skeleton";

const ProductSkeleton = () => (
  <div className="ProductCardContainer bg-white border border-gray-300 shadow-md rounded-md overflow-auto">
    <div className="ProductCardWrapper flex flex-col justify-between gap-y-1">
      {/* Skeleton image */}
      <Skeleton className="prodImg h-[15rem] w-full" />

      <div className="prodDes mb-1 p-3">
        {/* Skeleton name */}
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />

        {/* Skeleton price */}
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
    </div>

    {/* Skeleton button */}
    <div className="addToCartBtn text-center pb-3">
      <Skeleton className="h-10 w-2/3 mx-auto" />
    </div>
  </div>
);

export default ProductSkeleton;
