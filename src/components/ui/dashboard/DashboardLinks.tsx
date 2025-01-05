import { TDashboardLinks } from "@/types/globalTypes";
import { userRoleConts } from "@/utils/constants";
import { UseGetUser } from "@/utils/SharedFunction";
import { CiBookmark, CiViewList } from "react-icons/ci";
import { FaBoxOpen } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const LinkItem = ({ link }: { link: TDashboardLinks }) => {
  return (
    <NavLink to={link.path}>
      <div className="linksContainer flex items-center gap-x-1  my-6 ">
        {link.icon}
        <p>{link.name}</p>
      </div>
    </NavLink>
  );
};

const DashboardLinks = () => {
  // const userRole = GetUserRole();
  const userInfo = UseGetUser();

  // console.log(userInfo?.userRole);

  let links;
  // !  user links

  if (userInfo?.userRole === userRoleConts.user) {
    links = [
      {
        name: "Home",
        path: "/",
        icon: <CiBookmark className="text-xl font-bold" />,
      },
      {
        name: "Manage Orders",
        path: "/dashboard/user/manage-order",
        icon: <CiViewList className=" text-xl font-bold " />,
      },
    ];
  }

  // ! admin role links
  if (userInfo?.userRole === userRoleConts.admin) {
    links = [
      // {
      //   name: "Manage Users",
      //   path: "/dashboard",
      //   icon: <CiBookmark className=" text-xl font-bold " />,
      // },

      {
        name: "Manage Products",
        path: "/dashboard/admin/manage-product",
        icon: <FaBoxOpen className=" text-xl font-bold " />,
      },
      {
        name: "Manage Orders",
        path: "/dashboard/admin/manage-order",
        icon: <CiViewList className=" text-xl font-bold " />,
      },
    ];
  }

  return (
    <div>
      {links && links?.map((item) => <LinkItem key={item?.name} link={item} />)}
    </div>
  );
};

export default DashboardLinks;
