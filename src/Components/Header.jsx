/* eslint-disable react/prop-types */
const Header = ({subHeading, heading}) => {
    return (
        <div className="w-3/5 md:w-5/12 mx-auto py-2  text-center">
            <p className="text-[#D99904] mb-2">--- {subHeading} ---</p>
            <h2 className="text-4xl border-y-2 uppercase py-2">{heading}</h2>
        </div>
    );
};

export default Header;