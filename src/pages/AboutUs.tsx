import Wrapper from "@/components/shared/Wrapper";
import { MapContainer, TeamMember } from "@/components/ui/about";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="AboutUsContainer bg-gray-100 py-8 ">
      <div className="aboutUsWrapper">
        <h1 className=" mb-6  md:mb-8 xmd:mb-12 lg:mb-14 text-center font-semibold text-prime100 text-lg xsm:text-xl sm:text-3xl md:text-3xl xl:text-4xl text-shadow-blue">
          About us
        </h1>

        <div className="bodyContent flex flex-col gap-y-14">
          {/* mission statement  */}
          <Wrapper className=" missionStatement ">
            <h1 className="font-semibold text-3xl mb-4 ">Our mission </h1>
            <p className=" font-medium text-lg text-gray-700 ">
              At Raiment, our mission is to redefine the way people experience
              fashion by offering high-quality, customizable T-shirts that cater
              to individual styles and preferences. We are committed to
              delivering exceptional products that combine comfort,
              sustainability, and innovation. Our core values of creativity,
              quality, and customer satisfaction guide every aspect of our
              business, from product design to customer service. We strive to
              build a community of fashion enthusiasts who share our passion for
              self-expression and sustainable living, making every T-shirt a
              unique and meaningful statement.
            </p>
          </Wrapper>
          {/* team member section  */}
          <div className="teamMember">
            <TeamMember />
          </div>

          {/* contact section  */}
          <div className="contactStatement w-[96%] sm:w-[92%] md:w-[90%] m-auto ">
            <h1 className="font-semibold text-3xl mb-8 ">Contact us </h1>
            <p className=" font-medium  text-gray-700 mb-2 ">
              <span className=" font-bold "> phone :</span> 019064545
            </p>
            <p className=" font-medium  text-gray-700 mb-2 ">
              <span className=" font-bold "> Email :</span> abc@d.com
            </p>
            <p className=" font-medium  text-gray-700 mb-2 ">
              <span className=" font-bold "> Address :</span> joydebpur ,
              Gazipur
            </p>

            {/* social media link   */}
            <div className=" mt-8 flex flex-col gap-y-3 ">
              <div className="mr-12 hidden lg:block">
                <span className=" font-medium  text-gray-700  ">
                  Get connected with us on social networks:
                </span>
              </div>
              {/* <!-- Social network icons container --> */}
              <div className="flex ">
                {/* facebook icon  */}
                <Link
                  to={"https://www.facebook.com/"}
                  className="mr-6 text-3xl text-neutral-600 hover:text-blue-700"
                >
                  <FaFacebook />
                </Link>

                {/* linkedin icon  */}
                <Link
                  to={"https://bd.linkedin.com/"}
                  className="mr-6 text-3xl text-neutral-600 hover:text-blue-800"
                >
                  <FaLinkedin />
                </Link>
                {/* github icon  */}
                <Link
                  to={"https://github.com/MoniruzzamanBillal"}
                  className="mr-6 text-3xl text-neutral-600 hover:text-neutral-800"
                >
                  <FaGithub />
                </Link>
              </div>
            </div>

            {/*  */}
          </div>

          {/* map section starts  */}
          <div className=" mt-6 mapSection  w-[96%] sm:w-[92%] md:w-[90%] m-auto">
            <MapContainer />
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
