import { Link, useNavigate } from "react-router-dom";
import signUpImg from '../../assets/assets/others/authentication.gif'
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin";

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(() => {
                // console.log(result.user)
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        // SAVE USERS DATA TO DATABASE
                        const userInfo = {
                            name : data.name,
                            email: data.email
                        } 
                        // use axios public
                        axiosPublic.post('/users', userInfo)
                        .then(res => {
                            // console.log(res.data)
                            if(res.data.insertedId){
                                // console.log('users data saved database successfully')
                                // console.log('user profile updated')
                                toast.success('account created successfully')
                                navigate('/')
                            }
                        })
                    })
                    .catch(error => toast.error(error))
            })
            .catch(() => {
                // console.log(error)
            })
    }

    return (
        <div className="bg-loginBg py-16 min-h-screen">
            <Helmet>
                <title>Bistro Baron || Sign up</title>
            </Helmet>
            <div className="w-10/12 mx-auto shadow-xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-12 px-20">
                <div>
                    <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} name='name' placeholder="enter your name" className="input rounded-sm" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Photo URL</span>
                            </label>
                            <input type="url" {...register("photo", { required: true })} name='photo' placeholder="enter photo URL" className="input rounded-sm" />
                            {errors.photo && <span className="text-red-600">Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input rounded-sm" required />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input type="text" {...register("password",
                                {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                                })}
                                name='password'
                                placeholder="enter your password"
                                className="input rounded-sm"
                            />
                            {errors.password?.type === "required" && (
                                <p className="text-red-600">Password is required</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-600">Password must be at least 6 characters.</p>
                            )}
                            {errors.password?.type === "maxLength" && (
                                <p className="text-red-600">Password must be less than 20 characters.</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-600">Password must have 1 uppercase and lowercase letter, 1 number, 1 special character and length must be at least 6 character.</p>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn text-white font-semibold rounded-sm border-none bg-[#D1A054]">Sign Up</button>
                        </div>
                    </form>
                    <Link to='/login' className='text-[#D1A054] flex justify-center'>Already Registered? go to login</Link>
                    <SocialLogin></SocialLogin>
                </div>
                <div>
                    {/* <Lottie animationData={signUpLottie} loop={true}></Lottie> */}
                    <img src={signUpImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;