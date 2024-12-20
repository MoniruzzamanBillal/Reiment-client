import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Dashboard, ManageProducts } from "@/pages";
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
        ],
      },
    ],
  },
]);

export default router;
