import DeleteModal from "@/components/shared/DeleteModal";
import { TableDataError, TableDataLoading } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { Link } from "react-router-dom";

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

  console.log(allProduct?.data);

  // ! for deleting product
  const handleDeleteProduct = (id: string) => {
    console.log(id);
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
    content = allProduct?.data?.map((product) => (
      <tr key={product.id} className="border-b">
        <td className="p-4 text-center">{product.name}</td>
        <td className="p-4 text-center">{product.price}</td>
        <td className="p-4 text-center">
          <img
            src={product.productImage as string}
            alt={product.name}
            className="w-16 h-16 object-cover rounded "
          />
        </td>
        <td className="p-4 text-center">product.size</td>
        <td className="p-4 text-center">product.color</td>
        <td className="p-4 text-center">{product.material}</td>
        <td className="p-4 text-center">{product.stockQuantity}</td>

        <td className="p-4 text-center">
          <Link to={`/dashboard/vendor/update-products/${product.id}`}>
            <Button className="px-4 font-semibold text-sm bg-prime100 hover:bg-prime100 active:scale-95 duration-500">
              Update
            </Button>
          </Link>
        </td>
        <td className="p-4 text-center">
          <DeleteModal
            id={product._id}
            handleDeleteFunction={handleDeleteProduct}
            alertMessage={alertMessage}
          />
        </td>
      </tr>
    ));
  }

  return (
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
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
