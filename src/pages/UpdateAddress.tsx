/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReimentForm, ReimentInput } from "@/components/form";
import { FormSubmitLoading } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetUserAddressQuery,
  useUpdateAddressMutation,
} from "@/redux/features/address/address.api";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UpdateAddress = () => {
  const navigate = useNavigate();
  let content;

  const {
    data: userAddress,
    isLoading: userAddressLoading,
    refetch: addressRefetch,
  } = useGetUserAddressQuery(undefined);

  const [updateAddress, { isLoading: updateAddressLoading }] =
    useUpdateAddressMutation();

  //   console.log(userAddress?.data[0]);

  let defaultValues;
  defaultValues = {
    street: userAddress?.data[0]?.street,
    district: userAddress?.data[0]?.district,
    division: userAddress?.data[0]?.district,
    postalCode: userAddress?.data[0]?.district,
  };

  //   ! for updating address
  const handleUpdateAddress = async (data: FieldValues) => {
    console.log(data);
    const { street, district, division, postalCode } = data;

    const payload = {
      street,
      district,
      division,
      postalCode,
    };

    try {
      const toastId = toast.loading("Updating address...");
      const result = await updateAddress({
        payload,
        id: userAddress?.data[0]?._id,
      });

      // Handle errors
      if (result?.error) {
        const errorMessage = (result?.error as any)?.data?.message;
        toast.error(errorMessage, {
          id: toastId,
          duration: 1400,
        });
      }

      // Handle success
      if (result?.data) {
        addressRefetch();
        toast.success("Address updated successfully!", {
          id: toastId,
          duration: 1000,
        });

        setTimeout(() => {
          navigate("/dashboard"); // Navigate to the dashboard after success
        }, 700);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the address!", {
        duration: 1400,
      });
    }
  };

  useEffect(() => {
    if (userAddress?.data) {
      defaultValues = {
        street: userAddress?.data[0]?.street,
        district: userAddress?.data[0]?.district,
        division: userAddress?.data[0]?.district,
        postalCode: userAddress?.data[0]?.district,
      };
    }
  }, [userAddress?.data]);

  if (userAddressLoading) {
    content = (
      <div className="space-y-6">
        {/* Street Input Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-300" />
          <Skeleton className="h-10 w-full bg-gray-200 rounded" />
        </div>

        {/* District Input Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-300" />
          <Skeleton className="h-10 w-full bg-gray-200 rounded" />
        </div>

        {/* Division Input Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-300" />
          <Skeleton className="h-10 w-full bg-gray-200 rounded" />
        </div>

        {/* Postal Code Input Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-300" />
          <Skeleton className="h-10 w-full bg-gray-200 rounded" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-12 w-full bg-prime50 rounded" />
      </div>
    );
  } else {
    content = (
      <ReimentForm onSubmit={handleUpdateAddress} defaultValues={defaultValues}>
        <ReimentInput
          type="text"
          label="District :"
          name="district"
          placeholder="Enter your district"
        />
        <ReimentInput
          type="text"
          label="Division :"
          name="division"
          placeholder="Enter your division"
        />
        <ReimentInput
          type="text"
          label="Street :"
          name="street"
          placeholder="Enter your street"
        />
        <ReimentInput
          type="text"
          label="Postal Code :"
          name="postalCode"
          placeholder="Enter your postal code"
        />
        <Button
          className={`px-3 xsm:px-4 sm:px-5 md:px-6 font-semibold text-xs sm:text-sm md:text-base active:scale-95 duration-500 bg-prime50 hover:bg-prime100 `}
        >
          Update Address
        </Button>
      </ReimentForm>
    );
  }

  return (
    <>
      {(userAddressLoading || updateAddressLoading) && <FormSubmitLoading />}

      <div className="AddAddressContainer py-8 bg-gray-100 border border-gray-300 p-3 shadow rounded-md">
        <div className="AddAddressWrapper">
          <h1 className="mb-8 px-3 xsm:px-4 sm:px-5 md:px-6 font-bold text-2xl md:text-3xl text-center">
            Add Address
          </h1>

          {/* Address form container */}
          <div className="addressForm p-1 w-[95%] xsm:w-[85%] sm:w-[78%] md:w-[70%] xmd:w-[65%] lg:w-[55%] m-auto">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAddress;
