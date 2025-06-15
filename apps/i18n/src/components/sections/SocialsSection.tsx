import Link from "next/link";
import Icon from "../atoms/Icons";
import Section from "./Section";
import Card from "../atoms/Card";

/**
 *
 * @returns: En SocialsSection-komponent ...
 * @example: <SocialsSection />
 * @alias: SocialsSection
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/


const SocialsSection = ({ data }) => {
    return (
        <Section data={data} className="min-h-screen">
            <ul className="col-span-full grid grid-cols-subgrid gap-6">
                {data?.socials?.map((social, index) => (
                    <Card key={index} borderBottom="none">
                        <Link
                            href={social.url}
                            target="_blank"
                            className="mx-auto"
                        >
                            <Icon type={social.platform} className="mx-auto size-24 fill-lights-0 group-hover:fill-lights-400 ease-expo-in-out transition-all duration-500" />
                        </Link>
                    </Card>
                ))}
            </ul>
        </Section>
    )
};

export default SocialsSection;