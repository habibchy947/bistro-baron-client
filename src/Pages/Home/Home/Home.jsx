import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Service from "../Service/Service";
// import PopularItems from "../Popular/PopularItems";

const Home = () => {
    return (
        <div>
            <Banner />
            <Category></Category>
            {/* <PopularItems/> */}
            <Service/>
        </div>
    );
};

export default Home;