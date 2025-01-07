import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const handleGoogle = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err =>
                console.log(err)
            )
    }
    return (
        <div>
            <h2 className='text-center pt-2'>Or sign in with</h2>
            <div className='flex justify-center pt-4 gap-4'>
                <span onClick={handleGoogle} className='p-2 rounded-full border-2 text-xl'><FcGoogle /></span>
                <span className='p-2 rounded-full border-2 text-xl'><IoLogoGithub /></span>
            </div>
        </div>
    );
};

export default SocialLogin;