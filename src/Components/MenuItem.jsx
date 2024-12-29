/* eslint-disable react/prop-types */

const MenuItem = ({item}) => {
    const {image, recipe, name, price} = item
    return (
        <div className="flex gap-3">
            <img className="w-[118px] h-[104px] rounded-tr-full rounded-b-full" src={image} alt="" />
            <div className="space-y-1">
                <h2 className="text-xl">{name}--------</h2>
                <p>{recipe}</p>
            </div>
            <p className="text-[#D99904]">${price}</p>
        </div>
    );
};

export default MenuItem;