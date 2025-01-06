import { ProductDetailCard, ProductDetailCardSkeleton } from "@/components/ui";
import { useGetSingleProductsQuery } from "@/redux/features/product/product.api";
import { addRecentProduct } from "@/redux/features/recentProducts/recentproduct.slice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data: productData, isLoading: productDataLoading } =
    useGetSingleProductsQuery(id as string, { skip: !id });

  //
  useEffect(() => {
    if (productData?.data?._id) {
      dispatch(addRecentProduct(productData?.data?._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData?.data]);

  return (
    <div className="ProductDetailContainer bg-gray-100  py-6 sm:py-8 lg:py-12 ">
      <div className="bg-gray-100  py-6 sm:py-8 lg:py-12">
        {productDataLoading && <ProductDetailCardSkeleton />}

        {/* product detail section starts  */}
        <ProductDetailCard product={productData?.data} />
        {/* product detail section ends */}
      </div>
    </div>
  );
};

export default ProductDetail;
