import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { TProduct } from "@/types/product.types";
import { UseGetUser } from "@/utils/SharedFunction";
import { toast } from "sonner";
import { Button } from "./button";
import FormSubmitLoading from "./FormSubmitLoading";
import GlassZoomImage from "./GlassZoomImage";

const ProductDetailCard = ({ product }: { product: TProduct }) => {
  //   console.log(product);

  const userInfo = UseGetUser();

  // console.log(userInfo);

  const [addToCart, { isLoading: productAddToCartLoading }] =
    useAddToCartMutation();

  // ! for adding item in cart
  const handleAddToCart = async (product: TProduct) => {
    const payload = {
      userId: userInfo?.userId,
      productId: product?._id,
      quantity: 1,
      price: product?.price,
    };

    console.log(payload);

    try {
      const toastId = toast.loading("Adding to cart ");

      const result = await addToCart(payload);

      //  *  for any  error
      if (result?.error) {
        const errorMessage = (result?.error as any)?.data?.message;
        console.log(errorMessage);
        toast.error(errorMessage, {
          duration: 1400,
          id: toastId,
        });
      }
      if (result?.data?.success) {
        toast.success(result?.data?.message, { duration: 1500, id: toastId });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong while adding to cart ");
    }
  };

  return (
    <>
      {productAddToCartLoading && <FormSubmitLoading />}

      <div className="ProductDetailCardContainer">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* images - start  */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <GlassZoomImage imageSrc={product?.productImage} />
              </div>
            </div>
            {/* images - end  */}

            {/* {/* content - start  */}
            <div className="md:py-8">
              {/* {/* name - start  */}
              <div className="mb-6 md:mb-10">
                <h2 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
                  {product?.name}
                </h2>
              </div>
              {/* name - end  */}

              {/* price - start  */}
              <div className="mb-6">
                <div className="  text-lg mb-1.5  ">
                  Price :
                  <span className=" font-bold text-gray-800 md:text-2xl">
                    {product?.price} $
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  incl. VAT plus shipping
                </span>
              </div>
              {/* price - end  */}

              {/* stock  starts  */}
              <div className="mb-2 flex items-center gap-2 text-gray-600">
                <span className="text-sm text-gray-800 font-medium ">
                  Available stock :
                </span>
                {product?.stockQuantity}
              </div>
              {/* stock  ends  */}

              {/* {/* shipping notice - start  */}
              <div className="mb-6 flex items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>

                <span className="text-sm">2-4 day shipping</span>
              </div>
              {/* shipping notice - end  */}

              {/* {/* buttons - start  */}
              <div className="   ">
                <div className="btnSection flex items-center gap-x-4 ">
                  {/*  */}

                  <Button
                    disabled={product?.stockQuantity === 0 ? true : false}
                    className={`   text-center text-sm font-semibold text-white transition duration-100  ${
                      product?.stockQuantity === 0
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-prime50 hover:bg-prime100 active:bg-prime50"
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {product?.stockQuantity === 0
                      ? "Out of Stock"
                      : `  Add to cart  `}
                  </Button>

                  {/*  */}

                  <Button
                    disabled={product?.stockQuantity === 0 ? true : false}
                    className={`   text-center text-sm font-semibold text-white transition duration-100  ${
                      product?.stockQuantity === 0
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-prime50 hover:bg-prime100 active:bg-prime50"
                    }`}
                  >
                    Buy Now
                  </Button>

                  {/*  */}
                </div>
              </div>
              {/* buttons - end  */}

              {/* {/* description - start  */}
              <div className="mt-6 ">
                <div className="mb-1 text-lg font-semibold text-gray-900">
                  Description
                </div>

                <p className="text-gray-700"> {product?.detail} </p>
              </div>
              {/* description - end  */}
            </div>
            {/* content - end  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailCard;
