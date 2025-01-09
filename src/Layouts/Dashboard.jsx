import { FaBars, FaBook, FaCalendar, FaHome, FaList, FaShopify, FaUsers, FaUtensils } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import reviewImg from '../assets/assets/icon/addReview.png'
import bookingImg from '../assets/assets/icon/myBoofking.png'
import { MdEmail } from "react-icons/md";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const { cart } = useCart()
    const [isAdmin] = useAdmin()
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-[#ffffff]">

                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
                    <FaBars></FaBars>
                </label>
                <Outlet></Outlet>
            </div>

            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#D1A054] text-base-content min-h-full w-80 p-4">
                    <a className="flex flex-col pl-4 pb-5">
                        <span className="text-2xl font-semibold">Bistro Baron</span>
                        <span>Restaurant</span>
                    </a>
                    {/* Sidebar content here */}
                    {
                        isAdmin ?
                            <>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/adminHome'><FaHome /> Admin Home</NavLink></li>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/addItems'><FaUtensils /> Add Items</NavLink></li>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/manageItems'><FaList /> Manage Items</NavLink></li>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/manageBookings'><FaBook/> MAnage Bookings</NavLink></li>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/allUsers'><FaUsers/> All Users</NavLink></li>
                            </>
                            :
                            <>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/userHome'><FaHome /> User Home</NavLink></li>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/reservation'><FaCalendar /> Reservation</NavLink></li>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/cart'><TiShoppingCart /> My Cart ({cart.length})</NavLink></li>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/review'><img className="h-4 w-4" src={reviewImg} alt="" /> Add review</NavLink></li>
                                <li className="text-lg font-semibold"><NavLink to='/dashboard/bookings'><img className="h-4 w-4" src={bookingImg} alt="" /> My Booking</NavLink></li>
                            </>
                    }
                    {/* shared nav */}
                    <div className="divider"></div>
                    <li className="text-lg font-semibold"><NavLink to='/'><FaHome />Home</NavLink></li>
                    <li className="text-lg font-semibold"><NavLink to='/menu'><FaBars />Menu</NavLink></li>
                    <li className="text-lg font-semibold"><NavLink to='/order/salad'><FaShopify />Shop</NavLink></li>
                    <li className="text-lg font-semibold"><NavLink to='/conatct'><MdEmail />Contact</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;