import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "./button";

const ProductCard = () => {
  // console.log(product?.discount);
  return (
    <div className="ProductCardContainer bg-white border border-gray-300 shadow-md group  rounded-md overflow-auto hover:shadow-lg hover:scale-[1.01] duration-200 ">
      <Link to={`/product/detail/123`}>
        <div className="ProductCardWrapper flex flex-col justify-between gap-y-1  ">
          {/* product image section  */}
          <div className="prodImg  h-[15rem]  ">
            <img
              className=" w-full h-full "
              // src={product?.productImg as string}
              src={
                "https://i.postimg.cc/bvMhnjph/png-clipart-t-shirt-polo-shirt-sleeve-collar-men-s-polo-shirts-tshirt-angle.png"
              }
              alt=""
            />
          </div>

          <div className="prodDes mb-1 p-3 group-hover:text-prime100  ">
            {/* prod name  */}
            <h1 className=" font-medium mb-2 text-lg "> product?.name </h1>

            <div className="productPriceShopName flex justify-between items-center ">
              {/* prod price  */}
              <div className="prodPrice flex items-center gap-x-2 ">
                <p className=" font-semibold  text-lg ">$ product?.price</p>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </Link>
      <div className="addToCartBtn  text-center pb-3  ">
        <Button className="bg-prime50 group-hover:bg-prime100  ">
          <BsCart3 className=" font-medium text-lg " />
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
