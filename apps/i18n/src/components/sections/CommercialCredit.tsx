"use client"
import { useGSAP } from "@gsap/react";
import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";
import Section from "./Section"
import gsap from "gsap";
import React from "react";
import { useRef } from "react";
import { FadeUp } from "../interactions/AnimateFadeIn";
/**
 *
 * @returns: En CommercialCredit-komponent ...
 * @example: <CommercialCredit />
 * @alias: CommercialCredit
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/



const CommercialCredit = ({ data }) => {
    return (
        <Section className="h-screen">
            <div className="col-span-full md:col-span-6 my-auto xl:col-span-12 md:h-full">
                <ul className=" ">
                    {data?.releaseYear ? (<CommercialCreditItem index={1} label="YEAR" value={data.releaseYear} />) : null}
                    {data?.releaseYear ? (<li className="w-full xs:w-2/3 h-px bg-lights-0" />) : null}
                    {data?.production ? (<CommercialCreditItem index={2} label="Production" value={data.production} />) : null}
                    {data?.production ? (<li className="w-full xs:w-2/3 h-px bg-lights-0" />) : null}
                    {data?.director ? (<CommercialCreditItem index={3} label="directed by" value={data.director} />) : null}
                </ul>
            </div>
            {data?.cast?.length > 0 && (
                <div className="col-span-full md:col-span-6 my-auto xl:col-span-12 md:pl-6 mb-auto md:h-full">
                    <ul className="space-y-3">
                        <li>
                            <FadeUp delay={0}>
                                <Paragraph className="uppercase">Starring</Paragraph>
                            </FadeUp>
                        </li>
                        {data?.cast?.map((castMember, index) => (
                            <CastMemberItem key={index} name={castMember} index={index} />
                        ))}
                    </ul>
                </div>
            )}
        </Section>
    )
};

export default CommercialCredit;




const CommercialCreditItem = ({ label, value, index }) => {
    return (
        <li className="py-6">
            <FadeUp delay={index * 0.1}>
                <Paragraph className="uppercase">{label}</Paragraph>
                <Heading tag="h2" type="h2" >
                    {value}
                </Heading>
            </FadeUp>
        </li>
    );
}

const CastMemberItem = ({ name, index }) => {

    return (
        <li>
            <FadeUp delay={index * 0.1}>
                <Heading tag="span" type="h2">
                    {name}
                </Heading>
            </FadeUp>
        </li>
    )
}