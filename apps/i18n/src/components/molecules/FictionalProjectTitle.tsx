"use client";
import React from 'react'
import { useGSAP } from "@gsap/react";
import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";
import Photo from "../atoms/Photo";
import Section from "../sections/Section";
import gsap from "gsap";
import { FadeUp } from '../interactions/AnimateFadeIn';
import ElementEffect from '../interactions/ElementEffect';

/**
 *
 * @returns: En FictionalProjectTitle-komponent ...
 * @example: <FictionalProjectTitle />
 * @alias: FictionalProjectTitle
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/


const FictionalProjectTitle = ({ data }) => {


    return (
        <Section paddingX="none" paddingTop="none" paddingBottom="none" className="h-screen " gap="secondary">
            <div className="relative col-span-full" >
                <div className="">
                    {data.video?.asset?.url ? (
                        <video autoPlay playsInline muted loop poster={data.image} >
                            <source src={data.video.asset.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        data.image && <Photo className="h-full h-screen/1.2" image={data.image} />
                    )}
                </div>
                <div className="absolute bottom-0 left-0 grid mt-auto size-full place-content-[bottom_left] pb-12 pl-4 xs:pl-4 sm:pl-13 md:pl-24 lg:pl-19 xl:pl-36 2xl:pl-52">
                    <div className="mt-auto">
                        <Heading tag="h1" fontFamily="serif" type="h1">
                            <ElementEffect duration={0.5} delay={0.2}>
                                {data.title}
                            </ElementEffect>
                        </Heading>
                    </div>
                </div>
            </div>
            <div className="col-span-full flex gap-12 items-center -mt-20 z-10">
                <div className="col-span-full pl-4 xs:pl-4 sm:pl-13 md:pl-24 lg:pl-19 xl:pl-36 2xl:pl-52 grow-0">
                    <Paragraph className="text-medium max-w-prose">
                        {data.description}
                    </Paragraph>
                </div>
                <div className="max-w-screen-md pr-4 xs:pr-4 sm:pr-13 md:pr-24 lg:pr-19 xl:pr-36 2xl:pr-52 shrink-0">
                    <Photo className="h-fit w-full" image={data.poster} />
                </div>
            </div>
        </Section >
    )
};

export default FictionalProjectTitle;