import Wrapper from "@/components/shared/Wrapper";
import { ProductCard } from "@/components/ui";
import { useGetRecentProductQuery } from "@/redux/features/product/product.api";
import { useAppSelector } from "@/redux/hook";
import { TProduct } from "@/types/product.types";

const RecentProducts = () => {
  const { recentProducts } = useAppSelector((state) => state.recentProduct);

  console.log(recentProducts);

  const { data: recentProductsData } = useGetRecentProductQuery(
    recentProducts,
    {
      skip: !recentProducts,
    }
  );

  return (
    <div className="RecentProductsContainer py-4 bg-gray-100 min-h-screen ">
      <Wrapper className=" RecentProductsWrapper">
        <h1 className=" mb-8  font-semibold text-prime100 text-xl xsm:text-2xl sm:text-3xl md:text-3xl xl:text-4xl  ">
          Recent Products
        </h1>

        <div className="products  grid grid-cols-1 sm:grid-cols-2 xmd:grid-cols-3 xlm:grid-cols-4 gap-x-5 gap-y-8">
          {recentProductsData?.data &&
            recentProductsData?.data?.map((product: TProduct) => (
              <ProductCard product={product} key={product?._id} />
            ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default RecentProducts;
