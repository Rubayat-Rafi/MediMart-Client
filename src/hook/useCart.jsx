import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {
        data: carts = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["carts", user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/carts/${user?.email}`);
          return data;
        },
      });

    return [carts, isLoading, refetch]
};

export default useCart;