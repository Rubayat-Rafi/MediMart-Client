import { Link } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
import LoadingSpinner from "./LoadingSpinner";
import { useQuery } from "@tanstack/react-query";


const Category = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: categorys = [],
    isLoading,
  } = useQuery({
    queryKey: ["categorys"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/categorys`);
      return data;
    },
  });



  if(isLoading) return <LoadingSpinner/>

  return (
    <div className="bg-base-200 py-10">
      <div className="w-11/12 max-w-[1440px] mx-auto my-8 md:my-14">
        
      <h3 className="text-center text-xl mb-6 font-bold">Product Categories</h3>
      <div className="flex items-center justify-center gap-5 flex-wrap">
        {categorys.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.categoryName}`}
            className="p-4 border  shadow hover:shadow-lg flex items-center rounded-full"
          >
            <img
              src={category.photoURL}
              alt={category.categoryName}
              className="object-cover h-10 "
            />
            <div className="ml-2">
              <h3 className="text-base font-bold mt-2">{category.categoryName}</h3>
              <p className="text-[10px]"> Medicines</p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Category;
