import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
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
import { userRoleConts } from "@/utils/constants";
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
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                <ManageProducts />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/add-product",
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                <AddProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/update-product/:id",
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                <UpdateProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/admin/manage-coupon",
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                {" "}
                <ManageCoupon />{" "}
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/add-coupon",
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                {" "}
                <AddCoupon />{" "}
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/admin/manage-order",
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                {" "}
                <ManageOrder />{" "}
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
