/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { TProduct } from "@/types/product.types";
import { UseGetUser } from "@/utils/SharedFunction";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./button";

const ProductCard = ({ product }: { product: TProduct }) => {
  const userInfo = UseGetUser();

  // console.log(userInfo);

  const [addToCart, { isLoading: productAddToCartLoading }] =
    useAddToCartMutation();

  // ! for adding item in cart
  const handleAddToCart = async (product: TProduct) => {
    if (!userInfo?.userId) {
      toast.error("Login for adding product in cart !!!!");
      return;
    }

    const payload = {
      userId: userInfo?.userId,
      productId: product?._id,
      quantity: 1,
      price: product?.price,
    };

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
    <div className="ProductCardContainer bg-white border border-gray-300 shadow-md group  rounded-md overflow-auto hover:shadow-lg hover:scale-[1.01] duration-200 flex flex-col justify-between  ">
      <Link to={`/product/detail/${product?._id}`}>
        <div className="ProductCardWrapper flex flex-col justify-between gap-y-2  ">
          {/* product image section  */}
          <div className="prodImg  h-[15rem] relative  ">
            <img
              className=" w-full h-full "
              src={product?.productImage}
              alt=""
            />

            <div
              className={`productAvailability text-sm absolute top-0 left-0 font-semibold ${
                product?.stockQuantity > 0
                  ? " text-green-600  "
                  : "text-red-600"
              } `}
            >
              {product?.stockQuantity > 0 ? "Available" : "Unavailable"}
            </div>
          </div>

          <div className="prodDes mb-3  group-hover:text-prime100 w-[85%] m-auto  ">
            {/* prod name  */}
            <h1 className=" font-medium  text-lg   ">{product?.name}</h1>
          </div>

          {/*  */}
        </div>
      </Link>
      <div className="addToCartBtn w-[85%] m-auto  text-center py-4 flex items-center justify-between group  ">
        {/* prod price  */}
        <div className="prodPrice  ">
          <p className=" font-semibold  text-xl  text-center group-hover:text-prime100">
            TK {product?.price}
          </p>
        </div>

        <Button
          onClick={() => handleAddToCart(product)}
          disabled={productAddToCartLoading || userInfo?.userRole === "admin"}
          className={`  ${
            productAddToCartLoading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-prime50 group-hover:bg-prime100 active:bg-prime50"
          }  `}
        >
          <BsCart3 className=" font-medium text-lg " />
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
