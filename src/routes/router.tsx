import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  AddCoupon,
  AddProduct,
  Dashboard,
  Login,
  ManageCoupon,
  ManageOrder,
  ManageProducts,
  UpdateProduct,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/admin/manage-product",
            element: <ManageProducts />,
          },
          {
            path: "/dashboard/add-product",
            element: <AddProduct />,
          },
          {
            path: "/dashboard/update-product/:id",
            element: <UpdateProduct />,
          },
          {
            path: "/dashboard/admin/manage-coupon",
            element: <ManageCoupon />,
          },
          {
            path: "/dashboard/add-coupon",
            element: <AddCoupon />,
          },
          {
            path: "/dashboard/admin/manage-order",
            element: <ManageOrder />,
          },
        ],
      },
    ],
  },
]);

export default router;
