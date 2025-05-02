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
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
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
    const imageRef = React.useRef(null);

    React.useEffect(() => {
        if (!cardRef.current || !cardHeadingRef.current) return;

        const ctx = gsap.context(() => {
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


    return (
        <li className="relative grid grid-cols-subgrid col-span-full h-screen/1.6">
            <Link href={resolveHrefLang(data.locale, data._type, data.slug.current)}
                className="grid h-full group grid-cols-subgrid col-span-full w-fit cursor-pointer"
            >
                <div className="relative col-end-4 -col-start-1">
                    <div ref={cardRef} className="h-full">
                        <motion.div
                        >
                            <div ref={imageRef}>
                                {/* <Photo image={data?.image} className="h-full" /> */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        layoutId={data._id}
                                    >

                                        <video
                                            loop autoPlay muted playsInline src={data?.video?.asset?.url}>
                                            <source src={data?.video?.asset?.url} />
                                        </video>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
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
                                        dangerouslySetInnerHTML={{ __html: data?.musicalObject?.artist }}
                                        className="relative block transition-all duration-500 group-hover:-translate-y-full ease-power3-inOut"
                                    />
                                    <Heading
                                        spacing="none"
                                        tag="h4"
                                        type="h3"
                                        fontFamily="serif"
                                        dangerouslySetInnerHTML={{ __html: data?.musicalObject?.artist }}
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
            </Link>
        </li>
    );
}
