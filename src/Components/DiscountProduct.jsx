// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hook/useAxiosPublic';
import DiscountCard from './DiscountCard';

const DiscountProduct = () => {
  const axiosPublic = useAxiosPublic()

  const {data: discountMedicine=[]} = useQuery({
    queryKey: ['medicines'],
    queryFn: async ()=> {
      const {data} = await axiosPublic.get('/shop-medicine')
      return data;
    }
  })

 

  return (
    <div className="w-11/12 max-w-[1440px] mx-auto my-8 md:my-14">
      <h1 className="text-center text-xl mb-8 font-bold">Discount Products</h1>
      <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="flex items-center justify-center"
        breakpoints={{
          1440: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 10,
          },

          // Adjusts for medium devices (e.g., tablets)
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          // Adjusts for small devices (e.g., phones)
          480: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          // Extra small devices
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
        }}
      >
        {
          discountMedicine.map(product => (
            <SwiperSlide key={product._id}>
            <DiscountCard product={product}></DiscountCard>
          </SwiperSlide>
          ))
        }
      </Swiper>
    </>
    </div>
  );
};

export default DiscountProduct;
