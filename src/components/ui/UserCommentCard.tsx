import {
  useProductReviewQuery,
  useUpdateReviewMutation,
} from "@/redux/features/review/review.api";
import { UseGetUser } from "@/utils/SharedFunction";
import { format } from "date-fns";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";

const UserCommentCard = ({ review }: { review: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(review?.comment);
  const [rating, setRating] = useState(0);

  const userInfo = UseGetUser();

  const { refetch: productReviewRefetch } = useProductReviewQuery(
    review?.productId as string,
    { skip: !review?.productId }
  );

  const [updateReview, { isLoading: reviewUpdateLoading }] =
    useUpdateReviewMutation();

  // console.log(userInfo);

  // console.log(review?.userId);
  // console.log(review);
  // console.log(review?.productId);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // ! for updating comment
  const handleSaveClick = async () => {
    const payload = { reviewId: review?._id, comment: editedContent, rating };

    try {
      const taostId = toast.loading("Updating Review....");
      const result = await updateReview(payload);

      //  *  for any  error
      if (result?.error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorMessage = (result?.error as any)?.data?.message;
        console.log(errorMessage);
        toast.error(errorMessage, {
          id: taostId,
          duration: 1400,
        });
      }

      // * for successful insertion
      if (result?.data) {
        productReviewRefetch();
        setIsEditing(false);
        setRating(0);
        const successMsg = result?.data?.message;

        toast.success(successMsg, {
          id: taostId,
          duration: 1000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating profile!!!", {
        duration: 1400,
      });
    }
  };

  // ! for canceling updadteing edit
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(review?.comment);
    setRating(0);
  };

  //   ! fucntion for rendering star
  const renderStars = () => {
    const totalLength = 5;
    const filledStars = review?.rating || 0;

    return Array.from({ length: totalLength }, (_, index) => (
      <FaStar
        key={index}
        className={`  ${
          index < filledStars ? "text-orange-400" : "text-gray-500"
        }`}
      />
    ));
  };

  return (
    <div className="mainContainer">
      <div className="UserCommentCardContainer  my-3 p-3 rounded-md bg-gray-50 border border-gray-300   ">
        <div className="UserCommentWrapper   ">
          {/* writer info starts  */}
          <div className="writerInfo  flex items-center gap-3 mb-3  ">
            {/* writer image  */}
            <div className="writerImg   ">
              <img
                className=" w-8 h-8 xsm:w-9 xsm:h-9 sm:w-10 sm:h-10 rounded-full"
                src={review?.userId?.profilePicture}
                alt="user avatar"
              />
            </div>
            {/* writer image  */}

            {/* writer name  */}

            <div className="writerName   ">
              <p className=" text-gray-900 font-semibold text-xs sm:text-sm ">
                {review?.userId?.name}
              </p>
              <p className=" text-gray-600 font-medium text-xs  ">
                {format(new Date(review?.createdAt as string), "dd-MMMM-yyyy")}
              </p>
            </div>

            {/* writer name  */}
          </div>
          {/* writer info ends */}

          {/* review star starts  */}
          {!isEditing && (
            <div className="reviewStar paragraphFont text-sm sm:text-base mb-2 flex gap-x-.5 ">
              {renderStars()}
            </div>
          )}

          {/* review star ends  */}

          {/* User comment */}
          <div className="userComment paragraphFont text-sm sm:text-base mb-2 ">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="  border border-gray-300 rounded-md p-1  "
                />

                {/* Rating Section */}
                <div className=" pt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Rating (1-5)
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl ${
                          rating >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p> {review?.comment} </p>
            )}
          </div>
          {/* User comment */}

          {/* Edit delete button section */}

          {review?.userId?._id === userInfo?.userId && (
            <div className="mt-4 editDeleteBtn text-xs flex items-center gap-x-4">
              {isEditing ? (
                <>
                  <p
                    className="underline text-green-600 font-semibold cursor-pointer"
                    onClick={handleSaveClick}
                  >
                    Save
                  </p>
                  <p
                    className="underline text-red-600 font-semibold cursor-pointer"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </p>
                </>
              ) : (
                <>
                  <p
                    className="underline text-green-600 font-semibold cursor-pointer"
                    onClick={handleEditClick}
                  >
                    Edit
                  </p>
                </>
              )}
            </div>
          )}

          {/* Edit delete button section */}

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default UserCommentCard;
