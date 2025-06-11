import { CommercialTypeCard } from "../atoms/CommercialTypeCard";
import Section from "../sections/Section";
import { ProjectTypeTitle } from "./ProjectTypeTitle";

export function CommercialType({ data, title }) {
    return (
        <Section variant="mørk" paddingX="none" className="min-h-screen" paddingBottom="none" >
            <ProjectTypeTitle title={title} />
            <div className="grid col-span-full grid-cols-subgrid">
                <ul className="grid gap-0 grid-cols-subgrid col-span-full">
                    {data?.map((item, index) => (
                        <CommercialTypeCard
                            data={item}
                            key={item._id}
                            index={index}
                        />
                    ))}
                </ul>
            </div>
        </Section>
    );
}
