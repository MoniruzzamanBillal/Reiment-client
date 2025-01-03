import DeleteModal from "@/components/shared/DeleteModal";
import { FormSubmitLoading } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  OrderDetailCustomerCard,
  OrderDetailPaymentCard,
  OrderDetailProduct,
} from "@/components/ui/dashboard";
import {
  approveCustomerOrder,
  cancelCustomerOrder,
} from "@/functions/OrderManagement.function";
import {
  useApproveOrderMutation,
  useCancelOrderMutation,
  useGetSingleDataQuery,
} from "@/redux/features/order/order.api";

import { useParams } from "react-router-dom";

const alertMessage =
  " This action cannot be undone. This will cancel the Order .";

const OrderDetail = () => {
  const { id } = useParams();

  //   console.log(id);

  const {
    data: orderData,
    isLoading: orderDataLoading,
    refetch: orderDataRefetch,
  } = useGetSingleDataQuery(id as string, { skip: !id });

  const [approveOrder, { isLoading: orderApprovingLoading }] =
    useApproveOrderMutation();

  const [cancelOrder, { isLoading: cancelOrderLoading }] =
    useCancelOrderMutation();

  //   console.log(orderData?.data);
  console.log(orderData?.data?.status);

  // ! for approving order
  const handleApproveOrder = async (id: string) => {
    approveCustomerOrder(id, orderDataRefetch, approveOrder);
  };

  // ! for canceling order
  const handleCancelOrder = async (id: string) => {
    cancelCustomerOrder(id, orderDataRefetch, cancelOrder);
  };

  return (
    <>
      {(orderDataLoading || orderApprovingLoading || cancelOrderLoading) && (
        <FormSubmitLoading />
      )}

      <div className="OrderDetailContainer">
        <div className="OrderDetailWrapper bg-gray-100 border border-gray-300  shadow rounded-md p-4">
          <h3 className="brand text-2xl font-medium mb-4 "> Order Detail </h3>

          <div className="orderDetail">
            <div className="headSection mb-8 flex justify-between items-center">
              <div className="headLeft   ">
                <h1 className=" font-medium text-lg  "> Order id : #{id} </h1>
                <h1 className={` font-medium   `}>
                  Status :{" "}
                  <span
                    className={` ${
                      orderData?.data?.status === "pending"
                        ? "text-orange-500"
                        : orderData?.data?.status === "canceled"
                        ? "text-red-600"
                        : "text-green-600"
                    } `}
                  >
                    {" "}
                    {orderData?.data?.status}{" "}
                  </span>
                </h1>
              </div>

              {orderData?.data?.status === "pending" && (
                <div className="headRight flex gap-x-2 ">
                  <div className="approve">
                    <Button
                      onClick={() => handleApproveOrder(orderData?.data?._id)}
                      className=" bg-green-600 hover:bg-green-700 "
                    >
                      Approve
                    </Button>
                  </div>

                  <div className="cancelOrderBtn">
                    <DeleteModal
                      handleDeleteFunction={handleCancelOrder}
                      id={orderData?.data?._id}
                      btnText="cancel"
                      alertMessage={alertMessage}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="dataBody mb-4 w-[90%] flex justify-between  ">
              {/* customer card  */}
              <OrderDetailCustomerCard customerData={orderData?.data?.user} />

              {/* payment card  */}
              <OrderDetailPaymentCard paymentData={orderData?.data?.payment} />
            </div>

            {/* product card  */}
            <OrderDetailProduct productItems={orderData?.data?.orderItems} />

            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
