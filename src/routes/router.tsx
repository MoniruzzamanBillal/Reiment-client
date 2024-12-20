import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
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
            element: <p>dashboard </p>,
          },
        ],
      },
    ],
  },
]);

export default router;
