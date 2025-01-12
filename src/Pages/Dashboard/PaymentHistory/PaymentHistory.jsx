import { useQuery } from "@tanstack/react-query";
import Header from "../../../Components/Header";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: payments = []} = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/payments/${user?.email}`)
            return data
        }
    })
    return (
        <div>
            <Header subHeading='At a Glance' heading='Payment History'></Header>
            <div className="overflow-x-auto mt-5  rounded-t-lg">
                                <table className="table ">
                                    {/* head */}
                                    <thead className="bg-[#D1A054] text-white font-semibold uppercase">
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>Email</th>
                                            <th>Price</th>
                                            <th>Transaction Id</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {
                                            payments.map((payment, index) => (
                                                <tr key={payment._id}>
                                                    <th>
                                                        {index + 1}
                                                    </th>
                                                    <td>
                                                        {payment.email}
                                                    </td>
                                                    <td>${payment.price}</td>
                                                    <td>
                                                       {payment.transaction_id}
                                                    </td>
                                                    <th>
                                                        {payment.status}
                                                    </th>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
            
                                </table>
                            </div>
        </div>
    );
};

export default PaymentHistory;