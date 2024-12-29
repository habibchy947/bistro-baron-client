import Header from "../../../Components/Header";
import featured from '../../../assets/assets/home/featured.jpg';
const Featured = () => {
    return (
        <div className="bg-FeaturedBg  text-white py-20 md:py-28 bg-[#151515]/70 bg-blend-overlay">
            <Header subHeading={'Check it out'} heading={'Featured Item'} />
            <div className="md:flex w-11/12 space-y-5 md:space-y-0 md:w-10/12 mx-auto justify-center items-center gap-8 px-10 pt-14">
                <div>
                <img src={featured} alt="" />
                </div>
                <div className="md:ml-10 space-y-2">
                    <p className="text-lg">March, 20, 2023</p>
                    <h3 className="text-xl">Where Can I Get Some</h3>
                    <p>Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Error voluptate facere, deserunt
                        dolores maiores quod nobis quas
                        quasi. Eaque repellat recusandae
                        ad laudantium tempore consequatur
                        consequuntur omnis ullam maxime
                        tenetur.
                    </p>
                    <button
                     className="btn border-t-0 border-x-0 hover:bg-neutral text-white border-b-black bg-transparent border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;