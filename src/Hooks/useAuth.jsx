import { useContext } from "react"
import { AuthContext } from "../Context/Providers/AuthProviders"

const useAuth = () => {
    const authContext = useContext(AuthContext)
    return authContext
}

export default useAuth