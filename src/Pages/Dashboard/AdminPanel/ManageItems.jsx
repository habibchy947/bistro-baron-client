import { FaTrashAlt } from "react-icons/fa";
import Header from "../../../Components/Header";
import useMenu from "../../../Hooks/useMenu";
import { MdEdit } from "react-icons/md";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu()   
    const axiosSecure = useAxiosSecure()
    
    const handleDeleteItem =(id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const {data} = await axiosSecure.delete(`/menu/${id}`)
                // console.log(data)
                if(data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
                }
            }
          });
    }
    return (
        <div>
            <Header heading='Manage all Items' subHeading='Hurry Up'></Header>
            <div className=" md:mx-20 px-5 my-3 py-3 bg-base-100 rounded-sm">
                <div className="">
                    <h2 className="text-lg md:text-3xl font-semibold">Total Items : ({menu.length})</h2>
                </div>
                {loading ? <Loading />
                    :
                    <div className="overflow-x-auto mt-5  rounded-t-lg">
                        <table className="table ">
                            {/* head */}
                            <thead className="bg-[#D1A054] text-white font-semibold uppercase">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Item Image</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    menu.map((item, index) => (
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
                                            <td>
                                                <Link to={`/dashboard/updateItems/${item._id}`} className="bg-[#D1A054] btn p-3 text-xl rounded-md text-white">
                                                    <MdEdit />
                                                </Link>
                                            </td>
                                            <th>
                                                <button onClick={() => handleDeleteItem(item._id)} className="bg-red-600 p-3 text-xl rounded-md text-white"><FaTrashAlt />
                                                </button>
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                }
            </div>
        </div>
    );
};

export default ManageItems;