import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import {
  AboutUs,
  AddAddress,
  AddCoupon,
  AddProduct,
  AllProducts,
  Dashboard,
  EmailResetConfirmation,
  ForgotPassword,
  HomePage,
  Login,
  ManageCoupon,
  ManageOrder,
  ManageProducts,
  ManageUserOrder,
  OrderDetail,
  OrderSuccess,
  ProductDetail,
  RecentProducts,
  Register,
  ResetPassword,
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
        path: "/sign-up",
        element: <Register />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/email-reset-confirmation/:email",
        element: <EmailResetConfirmation />,
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
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/product/detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute role={userRoleConts.user}>
            <UserCart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
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
          {
            path: "/dashboard/user/manage-order",
            element: (
              <ProtectedRoute role={userRoleConts.user}>
                <ManageUserOrder />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/user/order-detail/:id",
            element: (
              <ProtectedRoute role={userRoleConts.user}>
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
