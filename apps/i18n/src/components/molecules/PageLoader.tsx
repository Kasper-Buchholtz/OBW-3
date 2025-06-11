"use client"
import React, { useEffect, useState } from "react";
import gsap from "gsap";

const PageLoader = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handlePageLoad = () => {
            // Trigger GSAP animation
            const tl = gsap.timeline();
            const animation = tl.to(".preloader", {
                duration: 0.5,
                ease: "expo.inOut",
                clipPath: "inset(0% 0% 100% 0%)",
                onComplete: () => {
                    setIsLoaded(true); // Set loaded state to true
                },
            });

            return () => animation.kill(); // Cleanup GSAP animation
        };

        if (document.readyState === "complete") {
            handlePageLoad();
        } else {
            window.addEventListener("load", handlePageLoad);
        }

        return () => {
            window.removeEventListener("load", handlePageLoad);
        };
    }, []);

    if (isLoaded) {
        return null; // Hide the preloader when the page is loaded
    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-darks-900 flex justify-center items-center z-[9999] preloader">
            <svg width="389" height="181" viewBox="0 0 389 181" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <g clipPath="url(#clip0_663_4)">
                    <path d="M90.0106 0C114.414 0 135.384 8.82031 152.981 26.4609C170.517 44.1015 179.347 65.6623 179.347 91.0207C179.347 116.195 170.701 137.45 153.349 154.845C135.997 172.241 114.966 181 90.2558 181C64.3809 181 42.8593 172.057 25.691 154.172C8.58412 136.286 0 115.031 0 90.4694C0 73.9926 3.98548 58.802 11.9564 45.0203C19.9274 31.1773 30.9028 20.2132 44.8827 12.1279C58.8625 4.04264 73.8847 0 90.0106 0ZM89.6427 32.0961C73.7008 32.0961 60.2727 37.6701 49.3587 48.7567C38.5059 59.8433 33.0488 73.9313 33.0488 91.0819C33.0488 110.131 39.9161 125.199 53.5894 136.286C64.2582 144.984 76.4599 149.271 90.1945 149.271C105.769 149.271 119.013 143.636 129.988 132.427C140.963 121.157 146.42 107.314 146.42 90.8369C146.42 74.4213 140.902 60.5783 129.865 49.1855C118.89 37.7926 105.462 32.0961 89.6427 32.0961Z" fill="white" />
                    <path d="M356.915 4.34902L332.205 114.358L300.934 4.34902H273.649L242.869 114.358L217.975 4.34902H186.704H179.714H157.764C169.843 4.28777 180.696 8.69792 180.696 8.69792C189.893 11.7605 197.373 16.7832 203.076 23.7047C209.514 31.545 212.763 40.8553 212.763 51.5131C212.763 58.4346 211.292 64.7436 208.349 70.4401C205.957 75.034 202.401 79.3829 197.618 83.4868C195.84 84.9568 194.001 86.3656 194.001 86.3656C195.84 87.2231 197.925 88.3257 198.967 88.8769C207.552 93.5934 214.051 99.2898 218.404 105.905C223.555 113.745 226.13 122.994 226.13 133.652C226.13 143.881 223.493 153.253 218.159 161.706C217.546 162.686 216.871 163.666 216.197 164.646C210.801 171.935 204.179 176.712 204.179 176.712H218.834H255.99L287.2 65.2949L318.961 176.712H350.477L389.228 4.34902H356.915Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_663_4">
                        <rect width="389" height="181" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        </div>
    );
};


export default PageLoader;