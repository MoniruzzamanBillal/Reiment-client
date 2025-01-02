import {
  ReimentForm,
  ReimentImageInput,
  ReimentInput,
  ReimentTextArea,
  RementMultiSelect,
} from "@/components/form";
import {
  FormSubmitLoading,
  TableDataError,
  TableDataLoading,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  useGetSingleProductsQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/product.api";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let content = null;
  let defaultValues;

  const [preview, setPreview] = useState<string | null>(null);

  const {
    data: productData,
    isLoading: productDataLoading,
    isError: productDataError,
  } = useGetSingleProductsQuery(id as string, { skip: !id });

  const [updateProduct, { isLoading: productUpdationLoading }] =
    useUpdateProductMutation();

  // ! for updating product
  const handleUpdateProduct = async (data: FieldValues) => {
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

    if (productImage) {
      formData.append("prodImg", productImage);
    }

    try {
      const toastId = toast.loading("Updating Product....");

      const result = await updateProduct({ formData, id });

      console.log(result);

      //  *  for any  error
      if (result?.error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorMessage = (result?.error as any)?.data?.message;
        console.log(errorMessage);
        toast.error(errorMessage, {
          id: toastId,
          duration: 1400,
        });
      }

      // * for successful insertion
      if (result?.data) {
        const successMsg = result?.data?.message;

        toast.success(successMsg, {
          id: toastId,
          duration: 1000,
        });

        setTimeout(() => {
          navigate("/dashboard/admin/manage-product");
        }, 700);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating product !!!", {
        duration: 1400,
      });
    }
  };

  defaultValues = {
    name: productData?.data?.name,
    detail: productData?.data?.detail,
    price: productData?.data?.price,
    size: productData?.data?.size,
    color: productData?.data?.color,
    material: productData?.data?.material,
    stockQuantity: productData?.data?.stockQuantity,
  };

  // ! effect for storing default value
  useEffect(() => {
    if (productData?.data) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      defaultValues = {
        name: productData?.data?.name,
        detail: productData?.data?.detail,
        price: productData?.data?.price,
        size: productData?.data?.size,
        color: productData?.data?.color,
        material: productData?.data?.material,
        stockQuantity: productData?.data?.stockQuantity,
      };
      setPreview(productData?.data?.productImage);
    }
  }, [productData?.data]);

  if (productDataLoading) {
    content = (
      <tr>
        <td colSpan={8} className="p-4">
          <TableDataLoading />
        </td>
      </tr>
    );
  } else if (!productDataLoading && productDataError) {
    content = (
      <tr>
        <td colSpan={8} className="p-4">
          <TableDataError message="Something went wrong" />
        </td>
      </tr>
    );
  } else if ((!productDataLoading || !productDataError) && productData?.data) {
    content = (
      <ReimentForm defaultValues={defaultValues} onSubmit={handleUpdateProduct}>
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
        <RementMultiSelect label="Size :" name="size" options={sizeOptions} />

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
            productUpdationLoading
              ? " cursor-not-allowed bg-gray-600 "
              : "bg-prime50 hover:bg-prime100  "
          }   `}
        >
          Update Product
        </Button>
      </ReimentForm>
    );
  }

  return (
    <>
      {(productUpdationLoading || productDataLoading) && <FormSubmitLoading />}

      <div className="UpdateProductContainer py-8 bg-gray-100 border border-gray-200 p-3 shadow rounded-md ">
        <div className="UpdateProductWrapper ">
          <h1 className="mb-8 px-3 xsm:px-4 sm:px-5 md:px-6 font-bold text-2xl md:text-3xl text-center">
            Update Product
          </h1>

          <div className="UpdateProductForm p-1 w-[95%] xsm:w-[85%] sm:w-[78%] md:w-[70%] xmd:w-[65%] lg:w-[55%] m-auto">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
