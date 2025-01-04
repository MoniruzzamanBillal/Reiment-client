import { TUserProfile } from "@/types/user.profile";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "../button";

const defaultImg =
  "https://i.postimg.cc/T19x1Pzh/istockphoto-1341046662-612x612.jpg";

const DashboardProfile = ({ userData }: { userData: TUserProfile }) => {
  //   console.log(userData);
  return (
    <div className="profileSection">
      {/*  */}
      <div className="ProfileImgSectionContainer   rounded-md ">
        <div className="profileImgWrapper flex flex-col xsm:flex-row justify-between items-center gap-y-8  ">
          {/* left section starts  */}
          <div className="profileLeftSection  flex  items-center gap-x-5 ">
            {/* left image section starts  */}
            <div className="imgSection rounded-full overflow-auto w-[8rem] sm:w-[10rem] md:w-[10rem] xmd:w-[12rem] ">
              <img
                src={
                  userData?.profilePicture
                    ? userData?.profilePicture
                    : defaultImg
                }
                alt=""
              />
            </div>
            {/* left image section ends */}

            {/* left name section starts  */}
            <div className="nameSection   ">
              <div className="nameTopSection flex items-center gap-x-2 mb-2 ">
                <p className=" text-xl sm:text-2xl font-semibold   ">
                  {userData?.name}
                </p>
              </div>

              <p className=" text-sm font-medium text-gray-600 mb-2 ">
                {userData?.email}
              </p>
            </div>
            {/* left name section ends  */}

            {/*  */}
          </div>
          {/* left section ends  */}

          {/* right section starts  */}
          <div className="profileRightSection  ">
            <Link to={`/dashboard/update-profile/${userData?._id}`}>
              <Button className=" bg-prime50 hover:bg-prime100  font-semibold text-sm sm:text-base  ">
                <FiEdit className="  " />
                Edit profile
              </Button>
            </Link>
          </div>
          {/* right section ends  */}

          {/*  */}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default DashboardProfile;
