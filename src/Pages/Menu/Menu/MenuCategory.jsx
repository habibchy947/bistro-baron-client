/* eslint-disable react/prop-types */
import MenuItem from "../../../Components/MenuItem";
import Cover from "../../../Shared/Cover";

const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div>
            {title && <Cover image={coverImg} title={title}></Cover>}
            <div className="pt-12 pb-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }

            </div>
        </div>
    );
};

export default MenuCategory;