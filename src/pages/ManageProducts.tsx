import DeleteModal from "@/components/shared/DeleteModal";
import {
  FormSubmitLoading,
  TableDataError,
  TableDataLoading,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/product.api";
import { TProduct } from "@/types/product.types";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const alertMessage =
  " This action cannot be undone. This will permanently delete the Product .";

const ManageProducts = () => {
  let content = null;

  const {
    data: allProduct,
    isLoading: productDataLoading,
    isError: productDataError,
    refetch: allProductRefetch,
  } = useGetAllProductsQuery(undefined);

  const [deleteProduct, { isLoading: productDeleteLoading }] =
    useDeleteProductMutation();

  // console.log(allProduct?.data);

  // ! for deleting product
  const handleDeleteProduct = async (prodId: string) => {
    try {
      const taostId = toast.loading("Deleting product....");
      const result = await deleteProduct(prodId);

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

        allProductRefetch();

        toast.success(successMsg, {
          id: taostId,
          duration: 1000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting product!!!", {
        duration: 1400,
      });
    }
  };

  if (productDataLoading) {
    content = (
      <tr>
        <td colSpan={8} className="p-4">
          <TableDataLoading />
        </td>
      </tr>
    );
  }

  // *  if any error
  else if (!productDataLoading && productDataError) {
    content = (
      <tr>
        <td colSpan={8}>
          <TableDataError message="Something went wrong " />
        </td>
      </tr>
    );
  }

  // * for no data
  else if (
    !productDataLoading &&
    !productDataError &&
    allProduct?.data?.length < 1
  ) {
    content = (
      <tr>
        <td colSpan={10}>
          <TableDataError message="Nothing Found" />
        </td>
      </tr>
    );
  }

  // * Render product data
  if (!productDataLoading && !productDataError && allProduct?.data?.length) {
    content = allProduct?.data?.map((product: TProduct) => (
      <tr key={product._id} className="border-b">
        <td className="p-4 text-center">{product.name}</td>
        <td className="p-4 text-center">{product.price}</td>
        <td className="p-4 text-center">
          <img
            src={product.productImage as string}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-md "
          />
        </td>
        <td className="p-4 text-center">
          {product?.size?.map((size: string) => (
            <p> {size} </p>
          ))}
        </td>
        <td className="p-4 text-center">
          {product?.color?.map((color: string) => (
            <p> {color} </p>
          ))}
        </td>

        <td className="p-4 text-center">{product.material}</td>
        <td className="p-4 text-center">{product.stockQuantity}</td>

        <td className="p-4 text-center flex gap-x-3">
          {/* update section  */}
          <div className="updateSection">
            <Link to={`/dashboard/update-product/${product?._id}`}>
              <Button className="px-4 font-semibold text-sm bg-prime100 hover:bg-prime100 active:scale-95 duration-500">
                Update
              </Button>
            </Link>
          </div>
          {/*  */}

          {/* delete section  */}
          <div className="deleteSection">
            <DeleteModal
              id={product._id}
              handleDeleteFunction={handleDeleteProduct}
              alertMessage={alertMessage}
            />
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <>
      {(productDataLoading || productDeleteLoading) && <FormSubmitLoading />}

      <div className="ManageProductContainer">
        <div className="ManageProductWrapper bg-gray-100 border border-gray-300  shadow rounded-md p-3">
          <h3 className="brand text-2xl font-medium mb-4 "> Manage Product </h3>

          <Button
            onClick={() => (window.location.href = "/dashboard/add-product")}
            className="mb-4 bg-prime100 hover:bg-prime100 cursor-pointer"
          >
            Add Product
          </Button>

          <table className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Sizes</th>
                <th>Colors</th>
                <th>Material</th>
                <th>Stock</th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
