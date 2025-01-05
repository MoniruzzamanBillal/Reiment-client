import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";

export type TTestimonial = {
  review: string;
  name: string;
  img: string;
};

const testimonials: TTestimonial[] = [
  {
    review:
      "I recently purchased a custom-designed T-shirt, and the entire process was seamless. The product quality was outstanding, and I appreciated the easy-to-navigate site. The detailed size guide and filtering options made shopping a breeze. Five stars!",

    name: "Abu Ubaida",
    img: "https://i.ibb.co/Kqrjj24/Doc-P-754782-638436953125887126.png",
  },
  {
    review:
      "I ordered a T-shirt with a custom design, and the detailed product page helped me choose the perfect material and size. The reviews from other customers were super helpful too. Great experience!",

    name: "Ismail Hania",
    img: "https://i.ibb.co/FxHzzq7/images.jpg",
  },
  {
    review:
      "I ordered a T-shirt with a custom design, and the detailed product page helped me choose the perfect material and size. The reviews from other customers were super helpful too. Great experience!",

    name: "Abdel Malek ",
    img: "https://i.ibb.co/X3QBnnF/Abdel-Malik-al-Houthi-blue-background-png.jpg",
  },

  {
    review:
      "The payment gateway integration is excellent! and the process was smooth and secure. I even received an instant order confirmation. Truly a professional service!",

    name: "Yahya Sinwar",
    img: "https://i.ibb.co/bdpwbzK/131779399-yahya-sinwar-epa.jpg",
  },

  {
    review:
      "The integration with local delivery services was fantastic. I received real-time updates on my package, and it arrived on time. The ability to track my delivery was very reassuring. Highly satisfied!",

    name: "Seikh Tamim",
    img: "https://i.ibb.co/qgw9Mkf/emir-qatar-sheikh-tamim-bin-hamad-al-440nw-10143881d.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className="TestimonialContainer py-8 ">
      <div className="TestimonialWrapper w-[96%] sm:w-[92%] md:w-[90%] m-auto ">
        <h1 className="  text-center font-semibold text-prime100 text-xl xsm:text-2xl sm:text-3xl md:text-3xl xl:text-4xl text-shadow-blue ">
          What others say about us
        </h1>

        <div className="testimonialCardContainer">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {testimonials &&
              testimonials?.map((testimonial: TTestimonial, ind: number) => (
                <SwiperSlide key={ind}>
                  {/* testimonial starts  */}
                  <TestimonialCard testimonial={testimonial} />
                  {/* testimonial ends  */}
                </SwiperSlide>
              ))}

            {/*  */}

            {/*  */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
