/* eslint-disable react/prop-types */

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";

const MenuCard = ({ item }) => {
    const {image, recipe, name,price, _id } = item || {}
    const location = useLocation()
    const navigate = useNavigate()
    const {user} = useAuth()
    const [,refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const handleAddToCart= () => {
        if(user && user?.email){
            // send data to database
            const cartItem = {
                menuId: _id,
                buyer_email:user.email,
                image,
                name,
                price
            }
            axiosSecure.post('/carts', cartItem)
            .then(res => {
                // console.log(res.data)
                if(res.data.insertedId){
                    refetch()
                    Swal.fire({
                        position: "middle-center",
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
            .catch(() => {
                // console.log(err)
            })
        }
        else{
            Swal.fire({
                title: "you are not logged in",
                text: "please login! to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
              }).then((result) => {
                if (result.isConfirmed) {
                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                //   });
                navigate('/login', {state : {from : location}})
                }
              });
        }
    }
    return (
        <div className="card bg-base-100 rounded-sm p-0 shadow-xl">
            <figure className="">
                <img
                    src={image}
                    className="w-full object-cover hover:scale-110 transition-transform duration-300"
                    alt="Shoes" />
            </figure>
            {
                location?.pathname === '/order/salad' && <p className="absolute bg-neutral text-white font-semibold px-4 py-1 rounded-md right-0 mr-4 mt-4">${price}</p>

            }
            <div className="card-body p-6 bg-slate-100 flex flex-col justify-center items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                    onClick={handleAddToCart}
                     className="btn border-b-4 border-b-[#BB8506] hover:bg-[#1F2937] text-[#BB8506]">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;