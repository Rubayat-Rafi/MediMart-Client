import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

import {toast} from 'react-hot-toast';


const BannerAdvertise = () => {

  const axiosSecure = useAxiosSecure();


  const { data: banners = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-banner");
      return data;
    },
  });

  // toggle handle function
  const handleToggle = async(e, id) => {
    const newStatus = e.target.checked ? "active" : "inactive";
    try{
    await axiosSecure.patch(`/banner/status/${id}`, { status: newStatus});
     if(newStatus === "active"){
       toast.success(`Banner is ${newStatus} now.`);
      }
      else{
        toast.error(`Banner is ${newStatus} now.`);
      }
    }catch(err){
      toast.error(err, ' aitece');
    }
  };


  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Banner Advertise</h2>

      {/* table */}
      {banners.length === 0 ? (
        <div>No Data Found...</div>
      ) : (
        <div className=" border rounded-lg">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Seller Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* body  */}
                {banners.map((banner) => (
                  <tr key={banner._id}>
                    <td>
                      <img
                        src={banner.photoURL}
                        alt="medicine image"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td>{banner.medicineName.substring(0, 20)}...</td>
                    <td>{banner.description.substring(0, 20)}...</td>
                    <td>{banner.sellerEmail}</td>
                    {/* toggle button  */}
                    <td>
                      <div className="flex items-center justify-cente gap-2">
                        <input
                          type="checkbox"
                          className="toggle toggle-sm toggle-success"
                          defaultChecked={banner.status === "active" ? true : false}
                          onChange={(e)=> handleToggle(e, banner._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerAdvertise;
