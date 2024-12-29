import { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import axios from "axios";
import MenuItem from "../../../Components/MenuItem";
const PopularMenu = () => {
    const [popular, setPopular] = useState([])
    useEffect(() => {
        axios.get('menu.json')
            .then(res => {
                const menu = res.data.filter(product => product.category === 'popular')
                setPopular(menu)
            })
    }, [])
    console.log(popular)
    return (
        <div className="py-14">
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