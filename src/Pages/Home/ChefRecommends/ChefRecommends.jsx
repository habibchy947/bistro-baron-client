import { useEffect, useState } from "react";
import Header from "../../../Components/Header";
import axios from "axios";
import MenuCard from "../../../Components/MenuCard";

const ChefRecommends = () => {
    const [menus, setMenus] = useState([])
    useEffect(() => {
        axios.get('menu.json')
            .then(res => {
                setMenus(res.data.slice(0,3))
            })
    }, [])
    console.log(menus)
    return (
        <div className="w-11/12 mx-auto">
            <Header subHeading={'Should try'} heading={'Chef Recommends'}></Header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                {
                    menus.map(menu => <MenuCard key={menu._id} item={menu}/>)
                }
            </div>
        </div>
    );
};

export default ChefRecommends;