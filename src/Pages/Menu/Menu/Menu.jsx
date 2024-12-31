import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover";
import menuBg from '../../../assets/assets/menu/banner3.jpg'
import dessertBg from '../../../assets/assets/menu/dessert-bg.jpeg'
import pizzaBg from '../../../assets/assets/menu/pizza-bg.jpg'
import saladBg from '../../../assets/assets/menu/salad-bg.jpg'
import soupBg from '../../../assets/assets/menu/soup-bg.jpg'
import useMenu from "../../../Hooks/useMenu";
import Header from "../../../Components/Header";
import MenuCategory from "./MenuCategory";
const Menu = () => {
    const [menu] = useMenu()

    const offered = menu.filter(item => item.category === 'offered')
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const pizza = menu.filter(item => item.category === 'pizza')

    return (
        <div>
            <Helmet>
                <title>Bistro Baron | Menu</title>
            </Helmet>
            <Cover img={menuBg} title={'our menu'}></Cover>
            <section className="w-11/12 mx-auto">
            <Header subHeading={"Don't miss"} heading={"Today's Offer"}></Header>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} img={dessertBg} title='dessert'></MenuCategory>
            <MenuCategory items={pizza} img={pizzaBg} title='pizza'></MenuCategory>
            <MenuCategory items={salad} img={saladBg} title='salad'></MenuCategory>
            <MenuCategory items={soup} img={soupBg} title='soup'></MenuCategory>
            </section>
        </div>
    );
};

export default Menu;