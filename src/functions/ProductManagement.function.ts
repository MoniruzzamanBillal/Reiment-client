/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";

import { toast } from "sonner";

//  ! for deleting product
export const manageDeleteProduct = async (
  id: string,
  refetch: () => QueryActionCreatorResult<any>,
  deleteProduct: (id: string) => Promise<any>
) => {
  try {
    const taostId = toast.loading("Deleting product....");
    const result = await deleteProduct(id);

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
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while deleting product!!!", {
      duration: 1400,
    });
  }
};

// ! for adding product
export const manageAddProduct = async (
  formData: any,
  addProduct: any,
  navigate: () => void
) => {
  try {
    const taostId = toast.loading("Creating Product....");

    const result = await addProduct(formData);

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

      toast.success(successMsg, {
        id: taostId,
        duration: 1000,
      });

      setTimeout(() => {
        navigate();
      }, 700);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while crating product !!!", {
      duration: 1400,
    });
  }
};

// ! for updating product
export const manageUpdateProduct = async (
  id: string,
  formData: any,
  updateProduct: any,
  navigate: () => void
) => {
  try {
    const toastId = toast.loading("Updating Product....");

    const result = await updateProduct({ formData, id });

    //  *  for any  error
    if (result?.error) {
      const errorMessage = (result?.error as any)?.data?.message;
      console.log(errorMessage);
      toast.error(errorMessage, {
        id: toastId,
        duration: 1400,
      });
    }

    // * for successful insertion
    if (result?.data) {
      const successMsg = result?.data?.message;

      toast.success(successMsg, {
        id: toastId,
        duration: 1000,
      });

      setTimeout(() => {
        navigate();
      }, 700);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while updating product !!!", {
      duration: 1400,
    });
  }
};
