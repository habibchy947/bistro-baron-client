import Header from "../../../Components/Header";
import MenuItem from "../../../Components/MenuItem";
import useMenu from "../../../Hooks/useMenu";
const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')
    
    console.log(popular)
    return (
        <div className="py-14 w-11/12  mx-auto">
            <Header
                subHeading={'Check it out'}
                heading={'Popular Items'}>
            </Header>
            <div className="pt-12 pb-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }

            </div>
            <div className="flex justify-center">
                <button className="btn border-t-0 border-x-0 hover:bg-neutral hover:text-white border-b-black bg-white border-b-4">View Full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;