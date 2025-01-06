type TUser = {
  name: string;
  email: string;
  profilePicture: string;
  status: string;
};

const OrderDetailCustomerCard = ({ customerData }: { customerData: TUser }) => {
  return (
    <div className="customerCard  ">
      <h1 className=" font-medium text-lg mb-1 "> Customer </h1>

      <div className="cardBody flex gap-x-2 ">
        <div className="leftLogo ">
          <img
            src={customerData?.profilePicture}
            className=" size-12 rounded-full "
            alt=""
          />
        </div>

        <div className="rightDetail  ">
          <p>
            Name :<span className=" font-semibold ">{customerData?.name}</span>
          </p>
          <p>
            Email :
            <span className=" font-semibold ">{customerData?.email}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCustomerCard;
