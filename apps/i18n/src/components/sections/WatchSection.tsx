"use client"
import Section from "./Section";
import React from 'react';
import { VimeoPlayer } from "../molecules/VimeoPlayer";
import Heading from "../atoms/Heading";

/**
 *
 * @returns: En WatchSection -komponent ...
 * @example: <WatchSection  />
 * @alias: WatchSection 
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/

const WatchSection = ({ data }) => {
    return (
        <Section className="relative pb-24">
            <VimeoPlayer videoId={data?.url} credits={data?.credits} fallbackImage={data?.fallback} />
            <div className="col-span-full -mt-14 z-10">
                <Heading>
                    {data?.title}
                </Heading>
            </div>
        </Section>
    )
};

export default WatchSection;









