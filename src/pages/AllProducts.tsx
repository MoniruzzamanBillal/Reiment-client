import Wrapper from "@/components/shared/Wrapper";
import { NoProduct, ProductCard } from "@/components/ui";
import { Input } from "@/components/ui/input";
import ProductSkeleton from "@/components/ui/ProductCardLoadingSceleton";
import ProductsFilter from "@/components/ui/ProductsFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { TProduct } from "@/types/product.types";
import useDebounce from "@/utils/useDebounce";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [isXl, setIsXl] = useState(false);

  const [sort, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pprice, setPprice] = useState<number | null>(null);

  const debounceTerm = useDebounce(searchTerm, 400);

  const { data: allProducts, isLoading: allProductsLoading } =
    useGetAllProductsQuery({
      searchTerm: debounceTerm,
      sortBy: sort,
      price: pprice,
    });

  // console.log(allProducts?.data);

  //   ! for reseting all filter category
  const handleAddReset = () => {
    setSearchTerm("");
    setPprice(null);
    setSortBy("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsXl(window.innerWidth >= 1250);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="AllProductsContainer bg-gray-100 py-4 min-h-screen">
      <Wrapper className=" AllProductsWrapper ">
        {/* search section   */}
        <div className="searchSection bg-gray-50 border border-gray-300  w-[40%] m-auto py-1 px-5 rounded-full flex justify-center items-center mb-5  ">
          <Input
            type="text"
            placeholder="Looking for...."
            className=" border-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* search section ends  */}

        {/* content body starts  */}
        <div className="contentBody flex justify-between gap-x-3 ">
          {/* filter section   */}
          <div className="contentLeft w-0 xl:w-[30%] hidden xl:block  ">
            <ProductsFilter
              priceRange={pprice}
              setPriceRange={setPprice}
              handleAddReset={handleAddReset}
            />
            {/*  */}
          </div>
          {/* left section ends  */}

          {/* right section starts  */}
          <div className="contentRight w-[100%] xl:w-[70%] flex flex-col gap-y-4">
            {/* content top section  */}
            <div className="contentTop bg-gray-50 shadow-md rounded border border-gray-300 py-2 px-4 flex justify-between items-center ">
              {/* Conditional rendering of ProductsFilter */}
              {!isXl ? (
                <Sheet>
                  <SheetTrigger>
                    <div className="filterMenuIcon flex justify-between items-center gap-x-1 cursor-pointer ">
                      {/* icon starts  */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                        />
                      </svg>

                      {/* icon ends */}
                      <p className=" font-medium  ">Filter</p>
                    </div>
                  </SheetTrigger>
                  <SheetContent>
                    <ProductsFilter
                      priceRange={pprice}
                      setPriceRange={setPprice}
                      handleAddReset={handleAddReset}
                    />
                  </SheetContent>
                </Sheet>
              ) : (
                <h1 className=" text-lg font-medium ">Product name </h1>
              )}

              {/* sort input section starts  */}
              <div className="sortSection  flex  justify-between items-center gap-x-1 ">
                <p className="text-gray-600 "> sort by : </p>

                {/* input section  */}
                <Select
                  value={sort}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[14rem]  outline-none border-gray-400 ring-0 focus:ring-0  ">
                    <SelectValue placeholder="sort by price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Low to High</SelectItem>
                    <SelectItem value="desc">High to Low </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* sort input section ends  */}
            </div>
            {/* content top section ends */}

            {/* products content starts  */}
            {/* products content starts  */}
            <div className="productsContent  py-3 px-4 ">
              {/* all products  */}
              <div className="allProducts grid grid-cols-1 sm:grid-cols-2 xmd:grid-cols-3 gap-x-5 gap-y-8 ">
                {allProductsLoading &&
                  Array.from({ length: 6 })?.map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}

                {allProducts?.data?.length === 0 ? (
                  <NoProduct />
                ) : (
                  allProducts?.data &&
                  allProducts?.data?.map((product: TProduct) => (
                    <ProductCard product={product} />
                  ))
                )}
              </div>
            </div>
            {/* products content ends */}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default AllProducts;
