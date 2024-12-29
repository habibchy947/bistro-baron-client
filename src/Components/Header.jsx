/* eslint-disable react/prop-types */
const Header = ({subHeading, heading}) => {
    return (
        <div className="w-6/12 md:w-4/12 mx-auto text-center">
            <p className="text-[#D99904] mb-2">--- {subHeading} ---</p>
            <h2 className="text-4xl border-y-2 uppercase py-2">{heading}</h2>
        </div>
    );
};

export default Header;