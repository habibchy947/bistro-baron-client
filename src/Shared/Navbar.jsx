import { Link, NavLink } from "react-router-dom";
import profile from '../assets/assets/others/profile.png'
const Navbar = () => {
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Our Menu</NavLink></li>
        <li><NavLink to='/order/salad'>Order Food</NavLink></li>
    </>
    return (
        <div className="navbar fixed max-w-screen-2xl z-10 bg-opacity-30 bg-black text-white px-3 py-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="flex flex-col">
                    <span className="text-2xl font-semibold">Bistro Baron</span>
                    <span>Restaurant</span>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-2">
                <Link to='/login' className="text-lg font-bold hover:text-[#D1A054]">Sign In</Link>
                <img className="h-9 w-9 rounded-full" src={profile} alt="" />
            </div>
        </div>
    );
};

export default Navbar;