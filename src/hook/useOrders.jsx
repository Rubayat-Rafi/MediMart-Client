import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useOrders = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {
        data: orders = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/orders-history/${user?.email}`);
          return data;
        },
      });


    return [orders, isLoading, refetch]
};

export default useOrders;