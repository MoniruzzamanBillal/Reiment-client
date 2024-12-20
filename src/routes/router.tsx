import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  AddCoupon,
  AddProduct,
  Dashboard,
  ManageCoupon,
  ManageOrder,
  ManageProducts,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <p>about us </p>,
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
