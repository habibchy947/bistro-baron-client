import { useQuery } from "@tanstack/react-query";
import Header from "../../../Components/Header";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    // get all users
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users', {
                headers: {
                    authorization : `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return data
        }
    })

    // make admin
    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                .then(res => {
                    console.log(res.data)
                    if(res.data.modifiedCount > 0){
                        refetch()
                        Swal.fire({
                          title: "Status Updated",
                          text: `${user.name} is Admin now.`,
                          icon: "success"
                        });
                    }
                })
            }
          });
    }

    // delete user
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        .then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    }
    return (
        <div>
            <Header subHeading={'How Many ?'} heading={'Manage All Users'}></Header>
            <div className=" md:mx-20 px-5 my-3 py-3 bg-base-100 rounded-sm">
                <div className="">
                    <h2 className="text-lg md:text-3xl font-semibold">Total Users : {users.length}</h2>
                </div>
                <div className="overflow-x-auto mt-5  rounded-t-lg">
                    <table className="table ">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white font-semibold uppercase">
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((user, index) => (
                                    <tr key={user._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            {user.name}
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="bg-[#D1A054] p-3 text-xl rounded-md text-white">
                                                <FaUsers />
                                            </button>}
                                        </td>
                                        <th>
                                            <button onClick={() => handleDelete(user._id)} className="btn btn-ghost btn-xs bg-red-600 text-white rounded-md py-1"><FaTrashAlt />
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

export default AllUsers;