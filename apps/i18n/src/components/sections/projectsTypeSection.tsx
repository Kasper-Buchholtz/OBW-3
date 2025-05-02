"use client"
import { clean } from "@/utils/sanitize";
import React from "react";
import Section from "./Section";
import Photo from "../atoms/Photo";
import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { resolveHref } from "@/sanity/lib/sanity.links";
import Link from "next/link";
import { resolveHrefLang } from "@repo/i18n/src/resolveHrefLang";

gsap.registerPlugin(ScrollTrigger);

/**
 *
 * @returns: En projectsTypeQuery-komponent ...
 * @example: <projectsTypeQuery />
 * @alias: projectsTypeQuery
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/


const ProjectsTypeSection = ({ data }) => {
    return (
        <Section variant="mørk">
            {clean(data.select) === 'musical' && <MusicalType data={data.cases} />}
        </Section>
    )
};

export default ProjectsTypeSection;





function MusicalType({ data }) {
    return (
        <div className="grid col-span-full grid-cols-subgrid">
            <ul className="grid gap-6 grid-cols-subgrid col-span-full">
                {data?.map((item) => (
                    <MusicalTypeCard data={item} key={item._id} />
                ))}
            </ul>
        </div>
    );
}







function MusicalTypeCard({ data }) {
    const cardRef = React.useRef(null);
    const cardHeadingRef = React.useRef(null);

    React.useEffect(() => {
        if (!cardRef.current || !cardHeadingRef.current) return;

        // Use GSAP’s context to keep things tidy (auto-revert on unmount)
        let ctx = gsap.context(() => {
            // 1) Initial states:
            // Card is clipped from the top (inset 100%) -> fully hidden
            gsap.set(cardRef.current, {
                clipPath: "inset(100% 0% 0% 0%)",
                ease: "expo.inOut",
            });
            // Heading is down 50px and invisible
            gsap.set(cardHeadingRef.current, {
                y: 50,
                opacity: 0,
            });

            // 2) Animate the card’s clipPath to reveal it
            gsap.to(cardRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1,
                ease: "expo.inOut",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 100%",   // adjust as needed
                    end: "bottom 20%", // adjust as needed
                    scrub: true,
                    toggleActions: "play none none reverse",
                },
            });

            // 3) Animate the heading upward (y: 50 -> y: 0) and fade in (opacity: 1)
            gsap.to(cardHeadingRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "expo.inOut",
                scrollTrigger: {
                    // You can share the same trigger as the card or use the heading itself
                    trigger: cardRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: false,
                    toggleActions: "play none none reverse",
                },
            });
        }, cardRef);

        return () => ctx.revert();
    }, []);

    return (
        <li className="relative grid grid-cols-subgrid col-span-full h-screen/1.6">
            <Link className="grid h-full group grid-cols-subgrid col-span-full w-fit" href={resolveHrefLang(data.locale, data._type, data.slug.current)}>
                <div className="relative col-end-4 -col-start-1">
                    <div ref={cardRef} className="h-full">
                        <Photo image={data?.image} className="h-full" />
                    </div>
                    <div className="absolute left-0 z-10 -translate-x-1/2 w-fit bottom-8">
                        <div className="overflow-hidden">

                            <div ref={cardHeadingRef}>
                                <div className='relative overflow-hidden'>
                                    <Heading spacing="none"
                                        tag="h4"
                                        type="h3"
                                        fontFamily="serif"
                                        dangerouslySetInnerHTML={{ __html: data?.musicalObject?.artist }}
                                        className='relative block transition-all duration-500 group-hover:-translate-y-full ease-power3-inOut' />
                                    <Heading spacing="none"
                                        tag="h4"
                                        type="h3"
                                        fontFamily="serif"
                                        dangerouslySetInnerHTML={{ __html: data?.musicalObject?.artist }}
                                        className='absolute block w-full transition-all duration-500 translate-x-1/2 top-full group-hover:top-0 right-1/2 ease-power3-inOut' />
                                </div>
                            </div>
                        </div>
                        <div className='relative w-full overflow-hidden'>
                            <Paragraph spacing="none"
                                tag="h4"
                                type="h3"
                                fontFamily="serif"
                                className='relative block w-full transition-all duration-500 delay-75 text-nowrap group-hover:-translate-y-full ease-power3-inOut' >{data?.title}</Paragraph>
                            <Paragraph spacing="none"
                                tag="h4"
                                type="h3"
                                fontFamily="serif"
                                className='absolute block w-full transition-all duration-500 delay-75 translate-x-1/2 text-nowrap top-full group-hover:top-0 right-1/2 ease-power3-inOut'>{data?.title}</Paragraph>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}
