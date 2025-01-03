import {
  ReimentForm,
  ReimentImageInput,
  ReimentInput,
  ReimentTextArea,
  RementMultiSelect,
} from "@/components/form";
import { FormSubmitLoading } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { manageAddProduct } from "@/functions/ProductManagement.function";
import { useAddProductMutation } from "@/redux/features/product/product.api";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [addProduct, { isLoading: productAddingLoading }] =
    useAddProductMutation();

  const [preview, setPreview] = useState<string | null>(null);

  const handleNavigate = () => {
    navigate("/dashboard/admin/manage-product");
  };

  // ! for adding product
  const handleAddProduct = async (data: FieldValues) => {
    const {
      name,
      detail,
      price,
      size,
      color,
      material,
      stockQuantity,
      productImage,
    } = data;

    const payload = {
      name,
      detail,
      price: parseFloat(price),
      size,
      color,
      material,
      stockQuantity: parseFloat(stockQuantity),
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(payload));
    formData.append("prodImg", productImage);

    await manageAddProduct(formData, addProduct, handleNavigate);
  };

  return (
    <>
      {productAddingLoading && <FormSubmitLoading />}

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
              <ReimentImageInput
                label="Product Images :"
                name="productImage"
                preview={preview}
                setPreview={setPreview}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className={`px-3 xsm:px-4 sm:px-5 md:px-6 font-semibold text-xs sm:text-sm md:text-base active:scale-95 duration-500    ${
                  productAddingLoading
                    ? " cursor-not-allowed bg-gray-600 "
                    : "bg-prime50 hover:bg-prime100  "
                }   `}
              >
                Add Product
              </Button>
            </ReimentForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
