/* eslint-disable react/prop-types */
import { Parallax } from 'react-parallax';
const Cover = ({ image, title }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={image}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div
                className="hero lg:h-[650px] h-[450px] md:h-[550px] max-h-[650px]">
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center py-12 md:py-16 lg:py-24 px-4 md:px-32 lg:px-48 bg-[#151515] bg-blend-overlay bg-opacity-60">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-3xl md:text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;