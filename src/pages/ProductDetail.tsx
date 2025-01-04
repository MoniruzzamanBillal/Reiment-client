import { ProductDetailCard } from "@/components/ui";
import { useGetSingleProductsQuery } from "@/redux/features/product/product.api";
import { addRecentProduct } from "@/redux/features/recentProducts/recentproduct.slice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const {
    data: productData,
    isLoading: productDataLoading,
    refetch: productDataRefetch,
  } = useGetSingleProductsQuery(id as string, { skip: !id });

  // console.log(productData?.data);

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
        {/* product detail section starts  */}
        <ProductDetailCard product={productData?.data} />
        {/* product detail section ends */}

        {/* detail bottom section starts  */}
        {/* <Wrapper className=" flex flex-col gap-y-8  ">
        
              <div className="reviewSection    ">
                <h1 className="   font-semibold text-2xl mt-2 mb-6   ">
                  Reviews
                </h1>

          
                {checkEligibelForReview?.data && (
                  <CommentInput
                    comment={comment}
                    setComment={setComment}
                    handleAddComment={handleAddComment}
                    rating={rating}
                    setRating={setRating}
                    reviewGivingLoading={reviewGivingLoading}
                  />
                )}

             
                {productData?.data?.review &&
                  productData?.data?.review?.map((comment: any) => (
                    <UserCommentCard review={comment} />
                  ))}
              </div> */}
        {/* review section ends  */}

        {/*  */}
        {/* </Wrapper> */}
        {/* detail bottom section ends   */}
      </div>
    </div>
  );
};

export default ProductDetail;
