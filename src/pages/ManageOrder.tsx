import { TableDataError, TableDataLoading } from "@/components/ui";
import { useGetAllOrderQuery } from "@/redux/features/order/order.api";

const alertMessage =
  " This action cannot be undone. This will cancel the Order .";

const ManageOrder = () => {
  let content = null;

  const {
    data: allOrder,
    isLoading: orderDataLoading,
    isError: orderDataError,
    refetch: allOrderRefetch,
  } = useGetAllOrderQuery(undefined);

  console.log(allOrder?.data);

  if (orderDataLoading) {
    content = (
      <tr>
        <td colSpan={8} className="p-4">
          <TableDataLoading />
        </td>
      </tr>
    );
  }

  // *  if any error
  else if (!orderDataLoading && orderDataError) {
    content = (
      <tr>
        <td colSpan={8}>
          <TableDataError message="Something went wrong " />
        </td>
      </tr>
    );
  }

  // * for no data
  else if (!orderDataLoading && !orderDataError && allOrder?.data?.length < 1) {
    content = (
      <tr>
        <td colSpan={10}>
          <TableDataError message="Nothing Found" />
        </td>
      </tr>
    );
  }

  return (
    <div className="ManageOrderContainer">
      <div className="ManageOrderWrapper bg-gray-100 border border-gray-300  shadow rounded-md p-3 ">
        <h3 className="brand text-2xl font-medium mb-4 "> Manage Order </h3>

        {/* table starts  */}
        <div className="table">
          <table className="w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Total Amount</th>
                <th>Shipping Address</th>
                <th>Order Detail</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
        {/* table ends  */}
      </div>
    </div>
  );
};

export default ManageOrder;
