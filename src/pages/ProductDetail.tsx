import Wrapper from "@/components/shared/Wrapper";
import {
  CommentInput,
  ProductDetailCard,
  ProductDetailCardSkeleton,
  UserCommentCard,
} from "@/components/ui";
import { useGetSingleProductsQuery } from "@/redux/features/product/product.api";
import { addRecentProduct } from "@/redux/features/recentProducts/recentproduct.slice";
import {
  useCheckReviewEligibilityQuery,
  useGiveReviewMutation,
  useProductReviewQuery,
} from "@/redux/features/review/review.api";
import { useAppDispatch } from "@/redux/hook";
import { UseGetUser } from "@/utils/SharedFunction";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState<string | null>(null);
  const [rating, setRating] = useState(0);

  const {
    data: productData,
    isLoading: productDataLoading,
    refetch: productDataRefetch,
  } = useGetSingleProductsQuery(id as string, { skip: !id });

  const { data: reviewEligibility, refetch: checkEligibility } =
    useCheckReviewEligibilityQuery(id as string, { skip: !id });

  const { data: productReview, isLoading: productReviewLoading } =
    useProductReviewQuery(id as string, { skip: !id });

  const [giveReview, { isLoading: reviewGivingLoading }] =
    useGiveReviewMutation();

  const userInfo = UseGetUser();

  // console.log(productDataLoading);
  // console.log(userInfo);
  // console.log(id);
  // console.log(reviewEligibility?.data);
  // console.log(productReview?.data);

  //   ! for adding comment
  const handleAddComment = async () => {
    if (!comment?.trim()) {
      toast.error("Add  comment !!");
      return;
    }
    if (rating < 1) {
      toast.error("Give a rating !!");
      return;
    }

    const payload = {
      userId: userInfo?.userId,
      productId: id,
      rating,
      comment,
    };

    try {
      const taostId = toast.loading("Giving review....");

      const result = await giveReview(payload);

      console.log(result);

      //  *  for any  error
      if (result?.error) {
        const errorMessage = (result?.error as any)?.data?.message;
        console.log(errorMessage);
        toast.error(errorMessage, {
          id: taostId,
          duration: 1400,
        });
      }
      // * for successful insertion
      if (result?.data) {
        productDataRefetch();
        checkEligibility();
        const successMsg = result?.data?.message;

        toast.success(successMsg, {
          id: taostId,
          duration: 1000,
        });

        setComment("");
        setRating(0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while giving review!!", {
        duration: 1500,
      });
    }
  };

  //
  useEffect(() => {
    if (productData?.data?._id) {
      dispatch(addRecentProduct(productData?.data?._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData?.data]);

  return (
    <div className="ProductDetailContainer bg-gray-100  py-8  ">
      <div className="bg-gray-100   ">
        {productDataLoading && <ProductDetailCardSkeleton />}

        {/* product detail section starts  */}

        {!productDataLoading && (
          <ProductDetailCard product={productData?.data} />
        )}

        {/* review section starts  */}
        <Wrapper className="reviewSection mt-10    ">
          <h1 className="   font-semibold text-2xl mt-2 mb-6   ">Reviews</h1>

          {/* comment input section  */}
          {reviewEligibility?.data && (
            <CommentInput
              comment={comment}
              setComment={setComment}
              handleAddComment={handleAddComment}
              rating={rating}
              setRating={setRating}
              reviewGivingLoading={reviewGivingLoading}
            />
          )}

          {/* user comment card  section  */}
          {productReview?.data &&
            productReview?.data?.map((comment: any) => (
              <UserCommentCard review={comment} />
            ))}
        </Wrapper>
        {/* review section ends  */}

        {/* product detail section ends */}
      </div>
    </div>
  );
};

export default ProductDetail;
