import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { TProduct } from "@/types/product.types";
import { UseGetUser } from "@/utils/SharedFunction";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./button";

const ProductCard = ({ product }: { product: TProduct }) => {
  // console.log(product);
  // console.log(product?.discount);

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
    <div className="ProductCardContainer bg-white border border-gray-300 shadow-md group  rounded-md overflow-auto hover:shadow-lg hover:scale-[1.01] duration-200 ">
      <Link to={`/product/detail/${product?._id}`}>
        <div className="ProductCardWrapper flex flex-col justify-between gap-y-1  ">
          {/* product image section  */}
          <div className="prodImg  h-[15rem]  ">
            <img
              className=" w-full h-full "
              src={product?.productImage}
              alt=""
            />
          </div>

          <div className="prodDes mb-1 p-3 group-hover:text-prime100  ">
            {/* prod name  */}
            <h1 className=" font-medium mb-2 text-lg  text-center ">
              {" "}
              {product?.name}{" "}
            </h1>

            {/* prod price  */}
            <div className="prodPrice  ">
              <p className=" font-semibold  text-lg  text-center">
                $ {product?.price}
              </p>
            </div>
          </div>

          {/*  */}
        </div>
      </Link>
      <div className="addToCartBtn  text-center pb-3  ">
        <Button
          onClick={() => handleAddToCart(product)}
          disabled={productAddToCartLoading}
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
