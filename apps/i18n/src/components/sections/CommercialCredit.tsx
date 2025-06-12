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

import Heading from "../atoms/Heading";
import Paragraph from "../atoms/Paragraph";
import Section from "./Section"

const CommercialCredit = ({ data }) => {
    return (
        <Section className="h-screen">
            <div className="col-span-full md:col-span-6 my-auto xl:col-span-12 md:h-full">
                <ul className=" ">
                    {data?.releaseYear ? (<CommercialCreditItem label="YEAR" value={data.releaseYear} />) : null}
                    {data?.releaseYear ? (<div className="w-2/3 h-px bg-lights-0" />) : null}
                    {data?.production ? (<CommercialCreditItem label="Production" value={data.production} />) : null}
                    {data?.production ? (<div className="w-2/3 h-px bg-lights-0" />) : null}
                    {data?.director ? (<CommercialCreditItem label="directed by" value={data.director} />) : null}
                </ul>
            </div>

            <div className="col-span-full md:col-span-6 my-auto xl:col-span-12 md:pl-6 mb-auto md:h-full">
                <ul className="space-y-3">
                    <li>
                        <Paragraph className="uppercase">Starring</Paragraph>
                    </li>
                    {data?.cast?.map((castMember, index) => (
                        <li key={index}>
                            <Heading tag="span" type="h2">
                                {castMember}
                            </Heading>
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    )
};

export default CommercialCredit;




const CommercialCreditItem = ({ label, value }) => {
    return (
        <li className="py-6">
            <Paragraph className="uppercase">{label}</Paragraph>
            <Heading tag="h2" type="h2" >
                {value}
            </Heading>
        </li>
    );
}