import { useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import AdsModal from "../../../Modal/AdsModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import toast from "react-hot-toast";

const ManageAds = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: ads = [], refetch } = useQuery({
    queryKey: ["ads", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/ads-request/${user?.email}`);
      return data;
    },
  });

  const handleDeleteBanner = async(id) => {
    try{
      await axiosSecure.delete(`/ads-delete/${id}`)
      toast.error('Ads request deleted successfully!')
      refetch();
    }catch(error){
      toast.error(error)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Manage Ads</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-mainColor hover:bg-secondBgColor text-white p-2 rounded"
        >
          Ask for Ads
        </button>
      </div>

      {/* table */}
      {ads.length === 0 ? (
        <div>No Data Found...</div>
      ) : (
        <div className="overflow-x-auto border  rounded-lg">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Ads Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
            {ads.map((ad, idx) => (
              <tr key={ad._id}>
              <th>{idx + 1}</th>
              <td>
                <img
                  src={ad.photoURL}
                  alt="medicine image"
                  className="w-16 h-16 object-cover rounded-lg"
                /> 
              </td>
              <td>{ad.medicineName.substring(0, 20)}...</td>
              <td>{ad.description.substring(0, 20)}...</td>
              <td> <span className={`${ad.status === 'pending' && 'bg-yellow-500/30 text-black'
                } ${ad.status === 'inactive' && 'bg-red-500/30 text-black'} ${ad.status === 'active' && 'bg-green-500/30 text-black'}  py-1 px-3 rounded-full text-[10px]`} >{ad.status}</span>  </td>
  
              <td>
                <button 
                onClick={()=>handleDeleteBanner(ad._id)}
                className="text-xl hover:scale-105 transition text-red-500">
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
            ))}

            </tbody>
          </table>
        </div>
      )}

      {/* open ads post modal  */}
      {isModalOpen && <AdsModal refetch={refetch} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ManageAds;
