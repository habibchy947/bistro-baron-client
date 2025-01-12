import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
   const {data: cart = [], refetch} = useQuery({
    queryKey : ['cart', user?.email], 
    queryFn : async () => {
        const {data} = await axiosSecure.get(`/carts?email=${user?.email}`)
        return data
    }
   })
    return [cart, refetch]
};

export default useCart;