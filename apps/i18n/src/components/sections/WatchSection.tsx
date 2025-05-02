"use client"
import Section from "./Section";
import React from 'react';
import { VimeoPlayer } from "../molecules/VimeoPlayer";

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
            <pre>
                <code className="text-sm text-gray-500">
                    {data.text}
                </code>
            </pre>
            <VimeoPlayer videoId={data.url} credits={data.credits} />
        </Section>
    )
};

export default WatchSection;









