import { TDashboardLinks } from "@/types/globalTypes";
import { CiBookmark } from "react-icons/ci";
import { NavLink } from "react-router-dom";

import { FaBoxOpen } from "react-icons/fa";

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

  // let links = [
  //   {
  //     name: "Home",
  //     path: "/",
  //     icon: <CiBookmark className="text-xl font-bold" />,
  //   },
  //   {
  //     name: "Followed Shops",
  //     path: "/dashboard/customer/followed-shops",
  //     icon: <CiBookmark className="text-xl font-bold" />,
  //   },
  //   {
  //     name: "Order History",
  //     path: "/dashboard/customer/order-history",
  //     icon: <CiBookmark className="text-xl font-bold" />,
  //   },
  // ];

  const links = [
    {
      name: "Manage Users",
      path: "/dashboard",
      icon: <CiBookmark className=" text-xl font-bold " />,
    },

    {
      name: "Manage Products",
      path: "/dashboard/admin/manage-product",
      icon: <FaBoxOpen className=" text-xl font-bold " />,
    },
    {
      name: "Manage Coupon",
      path: "/dashboard",
      icon: <CiBookmark className=" text-xl font-bold " />,
    },
    {
      name: "Manage Orders",
      path: "/dashboard",
      icon: <CiBookmark className=" text-xl font-bold " />,
    },
    {
      name: "Manage Payment",
      path: "/dashboard",
      icon: <CiBookmark className=" text-xl font-bold " />,
    },
    {
      name: "Monitor Review ",
      path: "/dashboard",
      icon: <CiBookmark className=" text-xl font-bold " />,
    },
  ];

  // ! admin role links
  // if (userRole === UserRoleConst.ADMIN) {
  //   links = [
  //     {
  //       name: "Manage Users",
  //       path: "/dashboard/admin/manage-user",
  //       icon: <CiBookmark className=" text-xl font-bold " />,
  //     },
  //     {
  //       name: "Manage Shops",
  //       path: "/dashboard/admin/manage-shop",
  //       icon: <CiBookmark className=" text-xl font-bold " />,
  //     },
  //     {
  //       name: "Categories",
  //       path: "/dashboard/admin/categories",
  //       icon: <CiBookmark className=" text-xl font-bold " />,
  //     },
  //     {
  //       name: "Coupons",
  //       path: "/dashboard/admin/manage-coupon",
  //       icon: <CiBookmark className=" text-xl font-bold " />,
  //     },
  //     {
  //       name: "Monitor Transaction ",
  //       path: "/dashboard/admin/monitor-transaction",
  //       icon: <CiBookmark className=" text-xl font-bold " />,
  //     },
  //     {
  //       name: "Monitor Review ",
  //       path: "/dashboard/admin/monitor-review",
  //       icon: <CiBookmark className=" text-xl font-bold " />,
  //     },
  //   ];
  // }

  return (
    <div>
      {links && links?.map((item) => <LinkItem key={item?.name} link={item} />)}
    </div>
  );
};

export default DashboardLinks;
