import { Suspense, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { defaultOptions } from "@/hooks/useAnimate";
import Photo from "../atoms/Photo";
import { CreditsList } from "./CreditsList";

export const VimeoPlayer = ({
    videoId,
    credits,
    fallbackImage
}: {
    videoId: string;
    credits?: { name: string; role: string }[];
    fallbackImage: string | any;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const ShowVideo = () => {
        setIsVisible(!isVisible);
    }
    const togglePlayPause = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const skipTime = (seconds: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime += seconds;
    };

    return (
        <div className="flex flex-col items-center text-white col-span-full relative">
            <button className="w-full h-full" onClick={ShowVideo}>
                {fallbackImage.asset.url ? (
                    <Photo
                        image={fallbackImage}
                        className="w-full h-screen/1.6 md:h-full object-cover cursor-pointer"
                    />
                ) : null}
            </button>

            <AnimatePresence>
                {isVisible ? (
                    <VideoDropdown
                        videoURl={videoId}
                        onClose={ShowVideo}
                        fallbackImage={fallbackImage}
                        skipTime={skipTime}
                        togglePlayPause={togglePlayPause}
                        isPlaying={isPlaying}
                        credits={credits}
                    />
                ) : null}
            </AnimatePresence>



        </div>
    );
};





const VideoDropdown = ({ videoURl, onClose, fallbackImage, skipTime, togglePlayPause, isPlaying, credits }) => {
    //a11y
    const CloseOnEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", CloseOnEscape);
        return () => {
            document.removeEventListener("keydown", CloseOnEscape);
        };
    }, [onClose]);


    return (
        <motion.div
            data-lenis-prevent="true"
            initial={{ clipPath: "inset(0% 0% 100% 0%)", }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: defaultOptions.duration } }}
            transition={{ duration: defaultOptions.duration + .25, delay: .25, ease: defaultOptions.ease }}
            className="fixed inset-0 size-full z-[99999999]"
        >
            <button className="absolute top-4 right-4 z-[99999999] size-10 border-white rounded-full border text-white" onClick={onClose} autoFocus>
                <span
                    className={`block absolute transition-all h-0.5 rotate-45 w-full bg-lights-0 transform duration-500 ease-in-out `}
                    aria-hidden="true" /* ${isOpen ? 'rotate-45 ' : '-translate-y-1.5 group-hover:w-10'} */
                />
                <span
                    className={`block absolute transition-all h-0.5 w-3/4 -rotate-45 translate-x-0 right-0 bg-lights-0 transform duration-500 ease-in-out `}
                    aria-hidden="true" /* ${isOpen ? '-rotate-45 ' : 'translate-y-1.5 group-hover:w-5'} */
                />
            </button>
            <Suspense fallback={<Photo image={fallbackImage} className="size-full" />}>
                <video controls={false} className="w-full object-cover h-full" autoPlay loop>
                    <source src={videoURl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Custom Controls */}
                <div className=" absolute bottom-0 left-0 w-full flex gap-4 mt-4">
                    <button onClick={() => skipTime(-10)}>⏪ Rewind 10s</button>
                    <button onClick={togglePlayPause}>{isPlaying ? "⏸ Pause" : "▶️ Play"}</button>
                    <button onClick={skipTime}>⏩ Forward 10s</button>
                    <CreditsList credits={credits} showCredits />
                </div>
            </Suspense>
        </motion.div>
    )
}