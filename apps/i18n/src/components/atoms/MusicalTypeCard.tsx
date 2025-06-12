"use client";
import { resolveHrefLang } from "@repo/i18n/src/resolveHrefLang";
import { useRouter } from "next/navigation";
import React from "react";
import gsap from "gsap";
import Photo from "./Photo";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

export function MusicalTypeCard({ data }) {
    const cardRef = React.useRef(null);
    const cardHeadingRef = React.useRef(null);
    const imageRef = React.useRef(null);
    const [animating, setAnimating] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        if (!cardRef.current || !cardHeadingRef.current) return;

        const ctx = gsap?.context(() => {
            gsap.set(cardRef.current, {
                clipPath: "inset(100% 0% 0% 0%)",
                ease: "expo.in",
            });
            gsap.set(cardHeadingRef.current, {
                y: 50,
                opacity: 0,
            });

            gsap.to(cardRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 100%",
                    end: "bottom 20%",
                    scrub: true,
                    toggleActions: "play none none reverse",
                },
            });

            gsap.to(cardHeadingRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 80%",
                    end: "bottom 0%",
                    scrub: true,
                    markers: true,
                    toggleActions: "play none none reverse",
                },
            });
        }, cardRef);

        return () => ctx.revert();
    }, []);
    const [showPortal, setShowPortal] = React.useState(false);


    const handleClick = (e) => {
        e.preventDefault();
        setAnimating(true);

        gsap.to(imageRef.current, {
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
                router.push(resolveHrefLang(data.locale, data._type, data.slug.current));
            },
        });
        setShowPortal(true);

    };

    return (
        <li className="relative grid grid-cols-subgrid col-span-full h-screen/1.6">
            <a
                className="grid h-full group grid-cols-subgrid col-span-full w-fit cursor-pointer"
                onClick={handleClick}
            >
                <div className="relative col-end-4 -col-start-1">
                    <div ref={cardRef} className="h-full">
                        <div ref={imageRef}>
                            <Photo image={data?.image} className="h-full" />
                        </div>
                    </div>
                    <div className="absolute left-0 z-10 -translate-x-1/2 w-fit bottom-8">
                        <div className="overflow-hidden">
                            <div ref={cardHeadingRef}>
                                <div className="relative overflow-hidden">
                                    <Heading
                                        spacing="none"
                                        tag="h4"
                                        type="h3"
                                        fontFamily="serif"
                                        dangerouslySetInnerHTML={{ __html: data?.artist }}
                                        className="relative block transition-all duration-500 group-hover:-translate-y-full ease-power3-inOut"
                                    />
                                    <Heading
                                        spacing="none"
                                        tag="h4"
                                        type="h3"
                                        fontFamily="serif"
                                        dangerouslySetInnerHTML={{ __html: data?.artist }}
                                        className="absolute block w-full transition-all duration-500 translate-x-1/2 top-full group-hover:top-0 right-1/2 ease-power3-inOut"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full overflow-hidden">
                            <Paragraph
                                spacing="none"
                                tag="h4"
                                type="h3"
                                fontFamily="serif"
                                className="relative block w-full transition-all duration-500 delay-75 text-nowrap group-hover:-translate-y-full ease-power3-inOut"
                            >
                                {data?.title}
                            </Paragraph>
                            <Paragraph
                                spacing="none"
                                tag="h4"
                                type="h3"
                                fontFamily="serif"
                                className="absolute block w-full transition-all duration-500 delay-75 translate-x-1/2 text-nowrap top-full group-hover:top-0 right-1/2 ease-power3-inOut"
                            >
                                {data?.title}
                            </Paragraph>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
}