import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth()
    return (
        <div>
            <h2 className="text-4xl mt-6 pl-3 uppercase font-semibold">
                <span>Hi! Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default UserHome;