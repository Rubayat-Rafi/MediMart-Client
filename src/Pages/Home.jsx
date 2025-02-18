import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import Category from "../Components/Category";
import DiscountProduct from "../Components/DiscountProduct";
import ArticalSection from "../Components/ArticalSection";
import Faqs from "../Components/Faqs";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MediMart</title>
      </Helmet>
      <div>
        <Banner />
        <Category/>
        <DiscountProduct/>
        <ArticalSection/>
        <Faqs/>
      </div>
    </>
  );
};

export default Home;
