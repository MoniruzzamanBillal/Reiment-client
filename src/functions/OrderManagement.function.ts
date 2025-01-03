/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

// ! for canceling order
export const cancelCustomerOrder = async (
  id: string,
  refetch: () => QueryActionCreatorResult<any>,
  cancelOrder: (id: string) => Promise<any>
) => {
  try {
    const taostId = toast.loading("Canceling order....");

    const result = await cancelOrder(id);

    //  *  for any  error
    if (result?.error) {
      const errorMessage = (result?.error as any)?.data?.message;
      console.log(errorMessage);
      toast.error(errorMessage, {
        id: taostId,
        duration: 1400,
      });
    }
    // * for successful insertion
    if (result?.data) {
      const successMsg = result?.data?.message;

      refetch();

      toast.success(successMsg, {
        id: taostId,
        duration: 1000,
      });
    }
  } catch (error: any) {
    console.log(error);
    toast.error("Something went wrong while canceling order!!!", {
      duration: 1400,
    });
  }
};

// ! for approving order
export const approveCustomerOrder = async (
  id: string,
  refetch: () => QueryActionCreatorResult<any>,
  approveOrder: (id: string) => Promise<any>
) => {
  try {
    const taostId = toast.loading("Approving order....");

    const result = await approveOrder(id);

    //  *  for any  error
    if (result?.error) {
      const errorMessage = (result?.error as any)?.data?.message;
      console.log(errorMessage);
      toast.error(errorMessage, {
        id: taostId,
        duration: 1400,
      });
    }
    // * for successful insertion
    if (result?.data) {
      const successMsg = result?.data?.message;

      refetch();

      toast.success(successMsg, {
        id: taostId,
        duration: 1000,
      });
    }
  } catch (error: any) {
    console.log(error);
    toast.error("Something went wrong while approving order!!!", {
      duration: 1400,
    });
  }
};
