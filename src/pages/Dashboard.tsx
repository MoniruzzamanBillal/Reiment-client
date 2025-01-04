import { FormSubmitLoading } from "@/components/ui";
import { Button } from "@/components/ui/button";
import DashboardProfile from "@/components/ui/dashboard/DashboardProfile";
import { useGetUserAddressQuery } from "@/redux/features/address/address.api";
import { useGetLoggedInUserQuery } from "@/redux/features/user/user.api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: userData, isLoading: userDataLoading } =
    useGetLoggedInUserQuery(undefined);

  const { data: userAddress } = useGetUserAddressQuery(undefined);

  // console.log(userData?.data);

  console.log(userAddress?.data);

  return (
    <>
      {userDataLoading && <FormSubmitLoading />}

      <div className="DashboardContainer">
        <div className=" DashboardWrapper bg-gray-100  shadow border border-gray-300 rounded-md p-3 flex flex-col gap-y-4 ">
          {/* profile section starts  */}
          <DashboardProfile userData={userData?.data} />
          {/* profile section ends  */}

          <div className="addressSection mt-7 ">
            {userAddress?.data?.length < 1 && (
              <Link to={"/dashboard/add-address"}>
                <Button className=" bg-prime50 hover:bg-prime100 ">
                  Add Address
                </Button>
              </Link>
            )}

            <div className="address text-lg ">
              <h1 className=" font-semibold ">User Address : </h1>

              <p>
                district : <span className=" font-semibold "> name </span>
              </p>
              <p>
                division : <span className=" font-semibold "> name </span>
              </p>
              <p>
                street : <span className=" font-semibold "> name </span>
              </p>

              <p>
                postalCode : <span className=" font-semibold "> name </span>
              </p>

              <Link to={"/dashboard/add-address"}>
                <Button className=" mt-4 bg-prime50 hover:bg-prime100 ">
                  Update Address
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
