import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://bistro-boss-server-three-hazel.vercel.app'
})
const useAxiosSecure = () => {
    const {logOut} = useAuth()
    const navigate = useNavigate()
    axiosSecure.interceptors.request.use(config => {
        // console.log('request stopped by interceptors')
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, error => {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(response => {
        return response;
    },async (error) => {
        // console.log(error)
        const status = error.response?.status
        if(status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;