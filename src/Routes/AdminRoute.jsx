/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if(loading || isAdminLoading) {
        return <Loading/>
    }
    if(user && isAdmin) {
        return children
    }
    return <Navigate to='/' state={{from : location}} replace></Navigate>
};

export default AdminRoute;