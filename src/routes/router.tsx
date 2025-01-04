import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import {
  AddAddress,
  AddCoupon,
  AddProduct,
  AllProducts,
  Dashboard,
  HomePage,
  Login,
  ManageCoupon,
  ManageOrder,
  ManageProducts,
  OrderDetail,
  ProductDetail,
  RecentProducts,
  UpdateAddress,
  UpdateProduct,
  UpdateProfile,
  UserCart,
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
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/recent-products",
        element: <RecentProducts />,
      },
      {
        path: "/product/detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <UserCart />,
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
            path: "/dashboard/update-profile/:id",
            element: <UpdateProfile />,
          },
          {
            path: "/dashboard/add-address",
            element: <AddAddress />,
          },
          {
            path: "/dashboard/update-address",
            element: <UpdateAddress />,
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
                <ManageCoupon />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/add-coupon",
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                <AddCoupon />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/admin/manage-order",
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                <ManageOrder />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/admin/order-detail/:id",
            element: (
              <ProtectedRoute role={userRoleConts.admin}>
                <OrderDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
