import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { CreditsList } from "./CreditsList";

export const VimeoPlayer = ({ videoId, credits }: { videoId: string, credits?: { name: string; role: string; }[] }) => {
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showCredits, setShowCredits] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            const player = new Player(videoRef.current, {
                id: videoId,
                width: 640,
                title: false,
                byline: false,
                portrait: true,
                autoplay: false,
                autopause: false,
                controls: false,
            });

            player.on("play", () => setIsPlaying(true));
            player.on("pause", () => setIsPlaying(false));
            player.on("timeupdate", ({ seconds }: { seconds: number }) =>
                setCurrentTime(seconds)
            );
            player.getDuration().then((dur: number) => setDuration(dur));

            playerRef.current = player;
        }

        return () => playerRef.current?.destroy();
    }, [videoId]);

    const handlePlayPause = () => {
        if (isPlaying) {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        playerRef.current.setCurrentTime(newTime);
        setCurrentTime(newTime);
    };

    const showCreditList = () => {
        setShowCredits(true);
    }


    return (
        <div className="flex flex-col items-center p-4 text-white bg-gray-900 rounded-lg col-span-full">
            {/* Vimeo Player */}
            <div ref={videoRef} className="w-full bg-black rounded-lg *:aspect-video aspect-video h-full " />

            {/* Controls */}
            <div className="flex flex-row items-center justify-between w-full gap-6 mt-4">
                <button
                    onClick={handlePlayPause}
                    className=""
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
                {/* Dragable Input (Seekbar) */}
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    step="0.1"
                    onChange={handleSeek}
                    className="w-full h-0.5 rounded-lg appearance-none cursor-pointer bg-lights-0  accent-lights-0"
                />

                <button onClick={showCreditList} className="">
                    credits
                </button>
                {showCredits && (
                    <CreditsList showCredits={showCredits} credits={credits} />
                )}
            </div>
        </div>
    );
};