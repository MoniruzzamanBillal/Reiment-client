import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

export const MainLayout = () => {
  return (
    <div className="MainLayoutContainer  ">
      {/* nav starts  */}
      <div className="navContainer   ">
        <Navbar />
      </div>
      {/* nav ends */}

      {/* child component  */}
      <div className="childComponent mt-[4.2rem]   ">
        <Outlet />
      </div>
      {/* child component  */}

      <div className="footerContainer   ">
        <Footer />
      </div>
    </div>
  );
};
