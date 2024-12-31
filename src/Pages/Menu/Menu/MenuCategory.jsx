/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import MenuItem from "../../../Components/MenuItem";
import Cover from "../../../Shared/Cover";

const MenuCategory = ({ items, title,img }) => {
    return (
        <div>
            {title && <Cover img={img} title={title}></Cover>}
            <div className="pt-12 pb-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }

            </div>
            <div className="flex justify-center pb-10">
                <Link to={`/order/${title}`}>
                <button className="btn border-t-0 border-x-0 hover:bg-neutral hover:text-white border-b-black bg-white border-b-4">Order your favorite food</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;