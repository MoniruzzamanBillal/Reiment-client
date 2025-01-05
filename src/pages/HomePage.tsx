import {
  FAQsection,
  HeroBanner,
  HomeProducts,
  Testimonial,
} from "@/components/ui/home";

const HomePage = () => {
  return (
    <div className="HomePageContainer">
      <HeroBanner />
      <HomeProducts />
      <Testimonial />
      <FAQsection />
    </div>
  );
};

export default HomePage;
