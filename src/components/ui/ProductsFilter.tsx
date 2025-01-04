import { Button } from "./button";
import { Slider } from "./slider";

type TProductsFilterProps = {
  priceRange: number | null;
  setPriceRange: (range: number) => void;
  handleAddReset: () => void;
};

const ProductsFilter = ({
  priceRange,
  setPriceRange,
  handleAddReset,
}: TProductsFilterProps) => {
  return (
    <div className="ProductsFilterContainer flex flex-col gap-y-6">
      <h1 className=" mb-3   font-semibold text-indigo-500 text-lg xsm:text-xl sm:text-3xl md:text-2xl xl:text-3xl text-shadow-blue">
        Filtered By :
      </h1>

      {/*  price range type starts   */}
      <div className="priceRange bg-gray-50 shadow-md rounded border border-gray-300 py-2 px-4">
        <h1 className="font-medium mb-6 text-gray-800">Price Range :</h1>

        <div className="priceRangeInput">
          <Slider
            value={[priceRange ?? 0]}
            onValueChange={(value) => setPriceRange(value[0])}
            max={2000}
            step={1}
            className="w-full h-2 accent-red-500 rounded-lg "
          />

          {/* price labal   */}
          <div className="priceLabel mt-2 text-lg font-medium text-gray-800 flex justify-between">
            <span>0</span>
            <span>{priceRange ? priceRange : 1000}</span>
          </div>
        </div>

        {/*  */}
      </div>
      {/* price range type ends   */}

      {/* reset btn  */}
      <div className="resetBtn w-[98%] m-auto   ">
        <Button
          className="bg-red-600 hover:bg-red-700 hover:shadow-md hover:scale-[1.02] active:scale-100 duration-200 w-full  "
          onClick={() => handleAddReset()}
        >
          Reset
        </Button>
      </div>
      {/* reset btn  */}
    </div>
  );
};

export default ProductsFilter;
