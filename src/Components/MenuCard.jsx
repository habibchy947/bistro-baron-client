/* eslint-disable react/prop-types */

const MenuCard = ({ menu }) => {
    const {image, recipe, name, } = menu || {}

    return (
        <div className="card bg-base-100 rounded-sm p-0 shadow-xl">
            <figure className="">
                <img
                    src={image}
                    className="w-full object-cover hover:scale-110 transition-transform duration-300"
                    alt="Shoes" />
            </figure>
            <div className="card-body p-6 bg-slate-100 flex flex-col justify-center items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn border-b-4 border-b-[#BB8506] hover:bg-[#1F2937] text-[#BB8506]">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;