import Wrapper from "@/components/shared/Wrapper";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

type TMember = {
  name: string;
  designation: string;
  image: string;
  descriptiion: string;
};

const teamMembers: TMember[] = [
  {
    name: "Omar Khalid",
    designation: "Founder & CEO",
    image: "https://i.ibb.co/jkJn50G/images-3.jpg",
    descriptiion:
      "Omar leads the product development team, focusing on creating innovative camping gear and accessories. He ensures the products meet high-quality standards and cater to the needs of customers.",
  },

  {
    name: "Yusuf Ali",
    designation: "IT Manager",
    image: "https://i.ibb.co/VQvdBs8/images-1.jpg",
    descriptiion:
      "Yusuf is responsible for overseeing the company's IT infrastructure and security, ensuring that Camper Shop's online presence and internal systems are secure and efficient.",
  },

  {
    name: "Bilal Ahmed",
    designation: "Operations Manager",
    image: "https://i.ibb.co/DkN81C1/Team-memeber-01.png",
    descriptiion:
      "Bilal manages the day-to-day operations of Camper Shop, ensuring smooth and efficient business processes.",
  },

  {
    name: "Zain Malik",
    designation: "Marketing Director",
    image: "https://i.ibb.co/c1bkZDM/images.jpg",
    descriptiion:
      "Zain oversees all marketing activities, including digital campaigns and brand strategy, to increase brand awareness and attract new customers.",
  },

  {
    name: "Faisal Khan",
    designation: "Customer Service Manager",
    image: "https://i.ibb.co/6tHVKLQ/team2.jpg",
    descriptiion:
      "Faisal leads the customer service team, ensuring that customers receive excellent service and support.",
  },

  {
    name: "Hasan Raza",
    designation: "Supply Chain Coordinator",
    image: "https://i.ibb.co/xgm7qGY/images-2.jpg",
    descriptiion:
      "Hasan manages the logistics and supply chain, ensuring that inventory is well-stocked and that products are delivered on time.",
  },
];

const TeamMember = () => {
  return (
    <div className="TeamMemberContainer ">
      <div className="bg-white py-6 sm:py-8 lg:py-12   ">
        <Wrapper className="mx-auto   ">
          {/* text - start  */}
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Meet our Team
            </h2>
          </div>
          {/* text - end  */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* person - start  */}
            {teamMembers &&
              teamMembers?.map((member: TMember, ind: number) => (
                <div
                  key={ind}
                  className=" h-[23.5rem] xsm:h-[22.5rem] md:h-[24rem] lg:h-[24rem] flex flex-col items-center rounded-lg bg-gray-100 border border-gray-200 p-4 lg:p-8  w-[95%] xsm:w-[75%] sm:w-full m-auto shadow-lg "
                >
                  <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-200 shadow-lg md:mb-4 md:h-32 md:w-32">
                    <img
                      src={member?.image}
                      loading="lazy"
                      alt="Photo by Radu Florin"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div>
                    <div className="text-center font-bold text-indigo-500 md:text-lg">
                      {member?.name}
                    </div>
                    <p className="mb-3 text-center text-sm text-gray-500 md:mb-4 md:text-base">
                      {member?.designation}
                    </p>
                    <p className=" text-center   text-gray-500 md:mb-4 text-sm">
                      {member?.descriptiion}
                    </p>

                    {/* social - start  */}
                    <div className=" mt-6 flex justify-center">
                      <div className="flex gap-5">
                        {/* facebook icon  */}
                        <Link
                          to={"https://www.facebook.com/"}
                          className=" text-2xl text-neutral-600 hover:text-blue-700"
                        >
                          <FaFacebook />
                        </Link>

                        {/* linkedin icon  */}
                        <Link
                          to={"https://bd.linkedin.com/"}
                          className=" text-2xl text-neutral-600 hover:text-blue-800"
                        >
                          <FaLinkedin />
                        </Link>
                        {/* github icon  */}
                        <Link
                          to={"https://github.com/MoniruzzamanBillal"}
                          className=" text-2xl text-neutral-600 hover:text-neutral-800"
                        >
                          <FaGithub />
                        </Link>
                      </div>
                    </div>
                    {/* social - end  */}
                  </div>
                </div>
              ))}

            {/* person - end  */}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default TeamMember;
