import { FaRegAddressCard } from "react-icons/fa";

type TAddress = {
  street: string;
  district: string;
  division: string;
  postalCode: string;
};

const OrderDetailAddress = ({ addressData }: { addressData: TAddress }) => {
  return (
    <div className="OrderDetailAddressContainer">
      <h1 className=" font-medium text-lg mb-1 "> Address </h1>

      <div className="cardBody flex gap-x-2">
        <div className="leftIcon  ">
          <FaRegAddressCard className=" text-4xl text-prime100 " />
        </div>

        <div className="rightDetail">
          <p>
            division :
            <span className=" font-semibold "> {addressData?.division} </span>
          </p>
          <p>
            district :
            <span className=" font-semibold ">{addressData?.district}</span>
          </p>
          <p>
            street :
            <span className=" font-semibold ">{addressData?.street}</span>
          </p>

          <p>
            postalCode :
            <span className=" font-semibold ">{addressData?.postalCode}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAddress;
