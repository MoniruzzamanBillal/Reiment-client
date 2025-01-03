import { logOut } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUser } from "@/types/globalTypes";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

type TProtectedRouteProps = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  const user = verifyToken(token!) as TUser;

  const { userRole } = user;

  if (role !== undefined && role !== userRole) {
    dispatch(logOut());

    toast.error(`This route is not accessible to ${userRole}`, {
      duration: 2000,
    });

    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
