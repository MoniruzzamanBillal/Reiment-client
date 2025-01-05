import DeleteModal from "@/components/shared/DeleteModal";
import {
  FormSubmitLoading,
  TableDataError,
  TableDataLoading,
} from "@/components/ui";
import { Button } from "@/components/ui/button";
import { cancelCustomerOrder } from "@/functions/OrderManagement.function";
import {
  useCancelOrderMutation,
  useGetAllUserOrderQuery,
} from "@/redux/features/order/order.api";
import { TOrder } from "@/types/order.types";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const alertMessage =
  " This action cannot be undone. This will cancel the Order .";

const ManageUserOrder = () => {
  let content = null;

  const {
    data: allUserOrder,
    isLoading: orderDataLoading,
    isError: orderDataError,
    refetch: allOrderRefetch,
  } = useGetAllUserOrderQuery(undefined);

  // console.log(allUserOrder?.data);

  const [cancelOrder, { isLoading: cancelOrderLoading }] =
    useCancelOrderMutation();

  // ! for canceling order
  const handleCancelOrder = async (id: string) => {
    await cancelCustomerOrder(id, allOrderRefetch, cancelOrder);
  };

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
  else if (
    !orderDataLoading &&
    !orderDataError &&
    allUserOrder?.data?.length < 1
  ) {
    content = (
      <tr>
        <td colSpan={10}>
          <TableDataError message="Nothing Found" />
        </td>
      </tr>
    );
  }

  // render data
  else {
    content = allUserOrder?.data?.map((order: TOrder) => (
      <tr key={order._id} className="border-b">
        <td className="p-4 text-center">
          {format(new Date(order?.createdAt), "dd-MMM-yyyy")}
        </td>

        <td className="p-4 text-center"> {order?.totalAmount} </td>
        <td
          className={`p-4 text-center font-semibold ${
            order?.payment?.paymentStatus === "Completed"
              ? "text-green-600 "
              : " text-red-600 "
          } `}
        >
          {order?.payment?.paymentStatus}
        </td>

        <td
          className={`p-4 text-center font-semibold ${
            order?.status === "pending"
              ? "text-orange-500"
              : order?.status === "canceled"
              ? "text-red-600"
              : "text-green-600"
          }  `}
        >
          {order?.status}
        </td>

        <td className="p-4 text-center">
          {/* detail button  */}
          <div className="approve">
            <Link to={`/dashboard/user/order-detail/${order?._id}`}>
              <Button className=" bg-prime100 hover:bg-prime100 ">
                Detail
              </Button>
            </Link>
          </div>
        </td>

        {order?.status === "pending" && (
          <td className="p-4 text-center  ">
            <div className="cancelOrderBtn">
              <DeleteModal
                handleDeleteFunction={handleCancelOrder}
                id={order?._id}
                btnText="cancel"
                alertMessage={alertMessage}
              />
            </div>
          </td>
        )}

        {/*  */}
      </tr>
    ));
  }

  return (
    <>
      {(orderDataLoading || cancelOrderLoading) && <FormSubmitLoading />}

      <div className="ManageOrderContainer">
        <div className="ManageOrderWrapper bg-gray-100 border border-gray-300  shadow rounded-md p-3 ">
          <h3 className="brand text-2xl font-medium mb-4 "> Manage Order </h3>

          {/* table starts  */}
          <div className="flex justify-center items-center ">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Order Date</th>

                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>

                  <th>detail</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
          {/* table ends  */}
        </div>
      </div>
    </>
  );
};

export default ManageUserOrder;
