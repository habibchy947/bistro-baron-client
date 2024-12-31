/* eslint-disable react/prop-types */

import MenuCard from "../Components/MenuCard";

const OrderTab = ({items}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
                items.map(item => <MenuCard key={item._id} item={item} />)
            }
        </div>
    );
};

export default OrderTab;