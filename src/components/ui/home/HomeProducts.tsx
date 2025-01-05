import Wrapper from "@/components/shared/Wrapper";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { TProduct } from "@/types/product.types";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import ProductSkeleton from "../ProductCardLoadingSceleton";

const HomeProducts = () => {
  const { data: allProducts, isLoading: allProductsLoading } =
    useGetAllProductsQuery({ limit: 8 });

  // console.log(allProducts?.data);

  return (
    <div className="HomeProductsContainer bg-gray-100 py-8 ">
      <Wrapper className="HomeProductsWrapper">
        {/* heading section  */}
        <div className="headingSection flex justify-between items-center ">
          <h1 className=" mb-8 font-semibold text-prime100 text-xl xsm:text-2xl sm:text-3xl md:text-3xl xl:text-4xl  ">
            Just For You
          </h1>

          <Link
            to={"/products"}
            className=" font-semibold text-prime100 hover:underline hover:text-prime100 py-2 px-4 rounded-md "
          >
            Show more
          </Link>
        </div>
        {/* heading section  */}

        <div className="products grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
          {allProductsLoading &&
            Array.from({ length: 4 })?.map((_, index) => (
              <ProductSkeleton key={index} />
            ))}

          {allProducts?.data &&
            allProducts?.data?.map((product: TProduct) => (
              <ProductCard product={product} />
            ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default HomeProducts;
