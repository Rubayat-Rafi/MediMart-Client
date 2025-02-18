
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import LoadingSpinner from "./LoadingSpinner";

const Banner = () => {
    const axiosSecure = useAxiosSecure();
  
    const { data: banners = [], isLoading } = useQuery({
      queryKey: ["banner"],
      queryFn: async () => {
        const { data } = await axiosSecure.get("/active-banner");
        return data;
      },
    });

    if(isLoading) return <LoadingSpinner />


  return (
    <>
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      
    >
      {banners.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            style={{
              backgroundImage: `url(${slide.photoURL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="relative flex flex-col justify-center items-center text-white text-center px-6 transition-transform h-[400px] md:h-[500px] lg:h-[600px]"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>
            {/* Content */}
            <div className="relative z-10 mx-auto">
              <h1 className="z-10  text-2xl md:text-4xl font-bold font-Montserrat mb-2 md:mb-4 ">
                {slide.medicineName}
              </h1>
              <p className="px-[5%] md:px-[10%]  lg:px-[20%] text-sm md:text-lg">{slide.description}</p>
              <Link to={`/shop`}>
                <button className="mt-4 md:mt-6 md:px-6 md:py-2 text-sm py-1 px-2 md:text-lg transition-all duration-300 bg-mainColor font-medium hover:bg-secondBgColor rounded-md">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </>
  );
};

export default Banner;
