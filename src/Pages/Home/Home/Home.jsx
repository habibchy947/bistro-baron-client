import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../Popular/PopularMenu";
import Service from "../Service/Service";
// import PopularItems from "../Popular/PopularItems";

const Home = () => {
    return (
        <div>
            <Banner />
            <Category></Category>
            <Service/>
            <PopularMenu/>
        </div>
    );
};

export default Home;