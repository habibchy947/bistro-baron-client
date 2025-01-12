/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { TfiWallet } from "react-icons/tfi";
import { FaUsers } from "react-icons/fa";
import FaChef from '../../../assets/assets/icon/chef 1.png'
import { RiTruckFill } from "react-icons/ri";
import Loading from "../../../Components/Loading";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-stats')
            return data
        }
    })
    const { data: chartData = [], isPending } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/order-stats')
            return data
        }
    })
    if (isPending) {
        return <Loading></Loading>
    }

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const piChartData = chartData.map(data => {
        return {
            name: data.category,
            value: data.revenue
        }
    })
    return (
        <div className="p-4">
            <h2 className="text-4xl uppercase mt-6 font-semibold">
                <span>Hi! Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
                {/* revenue */}
                <div className="rounded-lg px-4 md:px-7 justify-center text-white py-4 md:py-8 flex items-center gap-3 bg-gradient-to-r from-[#9834F5] to-[#FCDBFF]">
                    <TfiWallet className="text-5xl" />
                    <div className="space-y-1">
                        <h2 className="text-4xl font-semibold">{stats?.revenue?.toFixed(2)}</h2>
                        <p className="text-xl">Revenue</p>
                    </div>
                </div>
                {/* revenue */}
                <div className="rounded-lg px-4 md:px-7 justify-center text-white py-4 md:py-8 flex items-center gap-3 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
                    <FaUsers className="text-5xl" />
                    <div className="space-y-1">
                        <h2 className="text-4xl font-semibold">{stats.users}</h2>
                        <p className="text-xl">Users</p>
                    </div>
                </div>
                {/* revenue */}
                <div className="rounded-lg px-4 md:px-7 justify-center text-white py-4 md:py-8 flex items-center gap-3 bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
                    <img className="h-12 w-12" src={FaChef} alt="" />
                    <div className="space-y-1">
                        <h2 className="text-4xl font-semibold">{stats.menuItems}</h2>
                        <p className="text-xl">Menu items</p>
                    </div>
                </div>
                {/* revenue */}
                <div className="rounded-lg px-4 md:px-7 justify-center text-white py-4 md:py-8 flex items-center gap-3 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]">
                    <RiTruckFill className="text-5xl text-white" />
                    <div className="space-y-1">
                        <h2 className="text-4xl font-semibold">{stats.orders}</h2>
                        <p className="text-xl">Orders</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-10 shadow-lg mt-5">
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={piChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {piChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    <Legend></Legend>
                    </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;