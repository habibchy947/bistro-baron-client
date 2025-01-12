import { FaTrashAlt } from "react-icons/fa";
import Header from "../../../Components/Header";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const  [cart, refetch ] = useCart()
    const axiosSecure = useAxiosSecure()
    const totalPrice = cart.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch()
                    })
                    .catch(() => {
                        // console.log(err)
                    })
            }
        });
    }
    return (
        <div>
            <Header subHeading={'My Cart'} heading={'Wanna Add More?'}></Header>
            <div className=" md:mx-20 px-5 my-3 py-3 bg-base-100 rounded-sm">
                <div className="flex flex-wrap justify-between items-center">
                    <h2 className="text-lg md:text-3xl font-semibold">Total Orders : {cart.length}</h2>
                    <h2 className="text-lg md:text-3xl font-semibold">Total Price : ${totalPrice}</h2>
                    {cart.length ? <Link to="/dashboard/payment">
                        <button className="bg-[#D1A054] btn text-white">Pay</button>
                    </Link>
                    :
                    <button disabled className="bg-[#D1A054] btn text-white">Pay</button>
                    }
                </div>
                <div className="overflow-x-auto mt-5  rounded-t-lg">
                    <table className="table ">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white font-semibold">
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cart.map((item, index) => (
                                    <tr key={item._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask rounded-md h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>${item.price}</td>
                                        <th>
                                            <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs bg-red-600 text-white rounded-md py-1"><FaTrashAlt />
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default Cart;