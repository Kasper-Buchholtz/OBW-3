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
import { FictionalTypeCard } from "../atoms/FictionalTypeCard";
import { CommercialTypeCard } from "../atoms/CommercialTypeCard";
import { ProjectTypeTitle } from "../molecules/ProjectTypeTitle";
import { CommercialType } from "../molecules/CommercialType";
import { FictionalType } from "../molecules/FictionalType";
import { MusicalType } from "../molecules/MusicalType";

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
        <>
            {clean(data.select) === 'musical' && <MusicalType title={data.title} data={data.cases} />}
            {clean(data.select) === 'commercial' && <CommercialType title={data.title} data={data.cases} />}
            {clean(data.select) === 'fictional' && <FictionalType title={data.title} data={data.cases} />}
        </>
    )
};

export default ProjectsTypeSection;