import React, { useRef } from 'react';
import './Projects.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import type { SlideshowRef } from 'react-slideshow-image';

type ResumeProps = {
    onBack: () => void;
};


export const Projects: React.FC<ResumeProps> = ({ onBack }) => {

    const slideRef = useRef<SlideshowRef | null>(null);


    const properties = {
        duration: 5000,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: "ease",

        slidesToShow: 1,
        slidesToScroll: 0,
        indicators: (i?: number) => (
            <div className="indicator">{(i ?? 0) + 1}</div>
        ),
    };

    const slideImages = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91",
        "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b"
    ];
    return (
        <section>
            <button className="resume-back" onClick={onBack}>
                ← Back
            </button>

            <div className="App">
                <h3>Projects</h3>

                <div className="slide-container">
                    <Slide ref={slideRef} {...properties}>
                        {slideImages.map((each, index) => (
                            <div key={index} className="each-slide">
                                <img src={each} alt="sample" />
                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
        </section>

    );
};



