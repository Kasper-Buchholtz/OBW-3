import Section from "../sections/Section";
import { ProjectTypeTitle } from "./ProjectTypeTitle";
import { MusicalTypeCard } from "../atoms/MusicalTypeCard"
export function MusicalType({ data, title }) {
    return (
        <Section variant="mørk">
            <ProjectTypeTitle title={title} />
            <div className="grid col-span-full grid-cols-subgrid">
                <ul className="grid gap-6 grid-cols-subgrid col-span-full">
                    {data?.map((item) => (
                        <MusicalTypeCard data={item} key={item._id} />
                    ))}
                </ul>
            </div>
        </Section>
    );
}


