import { MdOutlinePayment } from "react-icons/md";

type TPayment = {
  amount: number;
  paymentStatus: string;
  transactionId: string;
};

const OrderDetailPaymentCard = ({ paymentData }: { paymentData: TPayment }) => {
  return (
    <div className="paymentCard">
      <h1 className=" font-medium text-lg mb-1 "> Payment Info </h1>

      <div className="cardBody flex gap-x-2">
        <div className="leftIcon ">
          <MdOutlinePayment className=" text-4xl text-prime100 " />
        </div>

        <div className="rightDetail">
          <p>
            Status :
            <span className=" font-semibold ">
              {paymentData?.paymentStatus}
            </span>
          </p>
          <p>
            Amount :
            <span className=" font-semibold ">{paymentData?.amount}</span>
          </p>
          <p>
            TransactionId :
            <span className=" font-semibold ">
              {paymentData?.transactionId}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPaymentCard;
