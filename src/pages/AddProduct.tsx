import {
  ReimentForm,
  ReimentInput,
  ReimentTextArea,
  RementMultiSelect,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";

const sizeOptions = [
  { name: "M", value: "M" },
  { name: "L", value: "L" },
  { name: "XL", value: "XL" },
  { name: "XXL", value: "XXL" },
];

const colorOptions = [
  { name: "Red", value: "Red" },
  { name: "Blue", value: "Blue" },
  { name: "Green", value: "Green" },
  { name: "Black", value: "Black" },
  { name: "White", value: "White" },
];

const AddProduct = () => {
  // ! for adding product
  const handleAddProduct = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="AddProductContainer py-8 bg-gray-100 border border-gray-300 p-3 shadow rounded-md">
      <div className="AddProductWrapper">
        <h1 className="mb-8 px-3 xsm:px-4 sm:px-5 md:px-6 font-bold text-2xl md:text-3xl text-center">
          Add Product
        </h1>

        {/* Add Product Form */}
        <div className="AddProductForm p-1 w-[95%] xsm:w-[85%] sm:w-[78%] md:w-[70%] xmd:w-[65%] lg:w-[55%] m-auto">
          <ReimentForm onSubmit={handleAddProduct}>
            {/* Product Name */}
            <ReimentInput
              type="text"
              label="Product Name :"
              name="name"
              placeholder="Enter Product Name"
            />

            {/* Product Detail */}
            <ReimentTextArea
              label="Product Detail :"
              name="detail"
              placeholder="Enter Product Detail"
            />

            {/* Product Price */}
            <ReimentInput
              type="number"
              label="Price :"
              name="price"
              placeholder="Enter Product Price"
            />

            {/* Product Size */}
            <RementMultiSelect
              label="Size :"
              name="size"
              options={sizeOptions}
            />

            {/* Product Color */}
            <RementMultiSelect
              label="Color :"
              name="color"
              options={colorOptions}
            />

            {/* Product Material */}
            <ReimentInput
              type="text"
              label="Material :"
              name="material"
              placeholder="Enter Product Material"
            />

            {/* Stock Quantity */}
            <ReimentInput
              type="number"
              label="Stock Quantity :"
              name="stockQuantity"
              placeholder="Enter Stock Quantity"
            />

            {/* Product Images */}
            <ReimentInput
              type="file"
              label="Product Images :"
              name="productImages"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="px-3 xsm:px-4 sm:px-5 md:px-6 font-semibold text-xs sm:text-sm md:text-base active:scale-95 duration-500 bg-prime50 hover:bg-prime100"
            >
              Add Product
            </Button>
          </ReimentForm>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
