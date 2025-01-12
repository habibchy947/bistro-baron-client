import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useMenu = () => {
    // const [menu, setMenu] = useState([])
    // const [loading,setLoading]  = useState(true)
    // useEffect(() => {
    //     fetch('https://bistro-boss-server-three-hazel.vercel.app/menus')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data)
    //             setLoading(false)
    //         })
    // }, [])
    const axiosPublic = useAxiosPublic()
    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const {data} = await  axiosPublic.get('/menus')
            return data
        }

    })
    return [menu, loading, refetch]
}

export default useMenu