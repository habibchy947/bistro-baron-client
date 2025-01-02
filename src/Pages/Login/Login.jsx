import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/assets/others/authentication2.png'
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io';
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    validateCaptcha
} from 'react-simple-captcha';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const [disabled, setDisabled] = useState(true)
    const { signInUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
        signInUser(email, password)
            .then(result => {
                console.log(result.user)
                toast.success('user logged in successfully')
                navigate(from, { replace: true })
            })
            .catch(error => console.log(error))
    }

    const handleValidateCaptcha = (e) => {
        const captcha = e.target.value
        console.log(captcha)

        if (validateCaptcha(captcha) == true) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }
    return (
        <div className="bg-loginBg py-16 min-h-screen">
            <Helmet>
                <title>Bistro Baron || Sign in</title>
            </Helmet>
            <div className="w-10/12 mx-auto shadow-xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-12 px-20">
                <div>
                    <img src={loginImg} alt="" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-center'>Login</h2>
                    <form onSubmit={handleFormSubmit} className="card-body pb-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input rounded-sm" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input type="text" name='password' placeholder="enter your password" className="input rounded-sm" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="write above captcha" className="input rounded-sm" required />
                        </div>
                        <div className="form-control mt-6">
                            <button disabled={disabled} className="btn text-white font-semibold rounded-sm bg-[#D1A054]">Login</button>
                        </div>
                    </form>
                    <Link to='/signup' className='text-[#D1A054] flex justify-center'>New here? Create an account</Link>
                    <h2 className='text-center pt-2'>Or sign in with</h2>
                    <div className='flex justify-center pt-4 gap-4'>
                        <span className='p-2 rounded-full border-2 text-xl'><FcGoogle /></span>
                        <span className='p-2 rounded-full border-2 text-xl'><IoLogoGithub /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;