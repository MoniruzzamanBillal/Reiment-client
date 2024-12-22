import {
  ReimentForm,
  ReimentInput,
  ReimentTextArea,
  RementMultiSelect,
} from "@/components/form";
import { FormSubmitLoading } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useAddProductMutation } from "@/redux/features/product/product.api";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    formData.append("image", productImage);

    try {
      const taostId = toast.loading("Creating Product....");

      const result = await addProduct(formData);

      console.log(result);

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
        const successMsg = result?.data?.message;

        toast.success(successMsg, {
          id: taostId,
          duration: 1000,
        });

        setTimeout(() => {
          navigate("/dashboard/admin/manage-product");
        }, 700);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while crating product !!!", {
        duration: 1400,
      });
    }
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
              <ReimentInput
                type="file"
                label="Product Images :"
                name="productImage"
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
    </>
  );
};

export default AddProduct;
