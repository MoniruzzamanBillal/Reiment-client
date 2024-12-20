import { Button } from "@/components/ui/button";

const ManageProducts = () => {
  let content = null;

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
