/**
 *
 * @returns: En MusicalProjectTitle-komponent ...
 * @example: <MusicalProjectTitle />
 * @alias: MusicalProjectTitle
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/

import Card from "../atoms/Card";
import Heading from "../atoms/Heading";
import Photo from "../atoms/Photo";
import Section from "../sections/Section";

const MusicalProjectTitle = ({ data }) => {
    return (
        <Section paddingX="none" paddingTop="none" paddingBottom="none" className="h-screen" gap="secondary">
            <div className="relative col-span-full">
                <div className="">
                    <Photo className="h-full h-screen/1.2" image={data.image} />
                </div>
                <div className="absolute bottom-0 left-0 grid mt-auto size-full place-content-[bottom_left] pb-12 pl-4 xs:pl-4 sm:pl-13 md:pl-24 lg:pl-19 xl:pl-36 2xl:pl-52">
                    <div className="mt-auto">
                        <Heading tag="h1" fontFamily="serif" type="h1">
                            {data.title}
                        </Heading>
                    </div>
                </div>
            </div>
            {data?.musicalObject?.production && data?.musicalObject?.artist ? (
                <ul className="grid grid-cols-4 gap-4 px-4 pt-8 divide-x divide-lights-0 col-span-full xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52 xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6">
                    {data?.musicalObject?.production ? (
                        <Card column="half" borderBottom="none" className="my-auto">
                            <span className="uppercase">
                                Production
                            </span>
                            <Heading type="h3" fontFamily="serif" spacing="none">
                                {data?.musicalObject?.production}
                            </Heading>
                        </Card>
                    ) : null}
                    {data?.musicalObject?.artist ? (
                        <Card column="half" borderBottom="none" className="pl-12 my-auto">
                            <span className="uppercase">
                                Artist
                            </span>
                            <Heading type="h3" fontFamily="serif" spacing="none">
                                {data?.musicalObject?.artist}
                            </Heading>
                        </Card>
                    ) : null}
                </ul>
            ) : null}
        </Section>
    )
};

export default MusicalProjectTitle;